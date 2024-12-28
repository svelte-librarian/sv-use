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
): Promise<{ html: string; headings: MarkdownHeading[] }> {
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
	return {
		html: value.toString(),
		headings: data.headings as MarkdownHeading[]
	};
}

export async function convertMarkdownFileToHTML<T extends Attributes>(
	filePath: string
): Promise<MarkdownReturn<T>> {
	const content = await fs.readFile(filePath, 'utf-8');

	const { attributes, body } = extractDataFromMarkdown<T>(content);
	const { html, headings } = await convertMarkdownContentToHTML(body);

	return { attributes, html, headings };
}
