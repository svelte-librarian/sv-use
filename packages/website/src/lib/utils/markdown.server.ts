import fs from 'node:fs/promises';
import matter from 'gray-matter';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkHeadingId from 'remark-heading-id';
import remarkHeadings from '@vcarl/remark-headings';
import { remarkAlert } from 'remark-github-blockquote-alert';
import remarkRehype from 'remark-rehype';
import rehypeExternalLinks from 'rehype-external-links';
import rehypePrettyCode from 'rehype-pretty-code';
import rehypeStringify from 'rehype-stringify';
import type { MarkdownHeading, MarkdownReturn } from '$types/markdown.js';

type Attributes = Record<string, unknown>;

type ExtractDataFromMarkdownReturn<T extends Attributes> = {
	attributes: T;
	body: string;
};

function extractDataFromMarkdown<T extends Attributes>(
	content: string
): ExtractDataFromMarkdownReturn<T> {
	const { data, content: body } = matter(content);

	return { attributes: data as T, body };
}

async function convertMarkdownContentToHTML(
	content: string
): Promise<Omit<MarkdownReturn<MarkdownHeading>, 'attributes'>> {
	const { value, data } = await unified()
		.use(remarkParse)
		.use(remarkHeadingId, {
			defaults: true,
			uniqueDefaults: true
		})
		.use(remarkHeadings)
		.use(remarkAlert)
		.use(remarkRehype)
		.use(rehypeExternalLinks, {
			target: '_blank'
		})
		.use(rehypePrettyCode, {
			theme: {
				light: 'catppuccin-latte',
				dark: 'one-dark-pro'
			}
		})
		.use(rehypeStringify)
		.process(content);

	const html = value.toString().replaceAll('\n', '');

	const title = html.match(/<h1(.*?)>(.*?)<\/h1>/)?.at(2);

	const paragraphs = [];
	let remainingHtml = html.replace(/<h1(.*?)>(.*?)<\/h1>/, '');

	let match;
	const paragraphRegex = /<p>([\s\S]*?)<\/p>/g;
	const headingRegex = /<h2(.*?)>/;

	while (remainingHtml.startsWith('<p>') && (match = paragraphRegex.exec(remainingHtml)) !== null) {
		if (headingRegex.test(remainingHtml.substring(0, match.index))) {
			break;
		}

		paragraphs.push(match[0]);

		remainingHtml = remainingHtml.substring(paragraphRegex.lastIndex);
	}

	const lede = paragraphs.join('');

	if (!title) {
		throw new Error('Title not found in the markdown file. A title must be present.');
	}

	if (!lede) {
		throw new Error(
			'Lede not found in the markdown file. A lede must be present and below the title.'
		);
	}

	return {
		title,
		lede,
		html: remainingHtml,
		// Remove h1 from headings
		headings: (data.headings as MarkdownHeading[]).slice(1)
	};
}

export async function convertMarkdownFileToHTML<T extends Attributes>(
	filePath: string
): Promise<MarkdownReturn<T>> {
	const content = await fs.readFile(filePath, 'utf-8');

	try {
		const { attributes, body } = extractDataFromMarkdown<T>(content);
		const markdownContent = await convertMarkdownContentToHTML(body);

		return { attributes, ...markdownContent };
	} catch (error) {
		throw new Error(`Error converting ${filePath} to HTML: ${(error as Error).message}`);
	}
}
