import fs from 'node:fs/promises';
import frontmatter, { type FrontMatterResult } from 'front-matter';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import htmlify from 'rehype-stringify';
import rehypePrettyCode from 'rehype-pretty-code';
import rehypeStringify from 'rehype-stringify';

type Attributes = Record<string, unknown>;

type ExtractDataFromMarkdownReturn<T extends Attributes> = {
	attributes: T;
	body: string;
};

function extractDataFromMarkdown<T extends Attributes>(
	content: string
): ExtractDataFromMarkdownReturn<T> {
	// @ts-expect-error Types are not resolved properly but it works.
	const { attributes, body } = frontmatter<T>(content) as FrontMatterResult<T>;

	return { attributes, body };
}

async function convertMarkdownContentToHTML(content: string): Promise<string> {
	const html = (
		await unified()
			.use(remarkParse)
			.use(remarkRehype)
			.use(htmlify)
			.use(rehypePrettyCode, {
				theme: {
					light: 'catppuccin-latte',
					dark: 'one-dark-pro'
				}
			})
			.use(rehypeStringify)
			.process(content)
	).value.toString();

	return html;
}

export async function convertMarkdownFileToHTML<T extends Attributes>(filePath: string) {
	const content = await fs.readFile(filePath, 'utf-8');

	const { attributes, body } = extractDataFromMarkdown<T>(content);
	const html = await convertMarkdownContentToHTML(body);

	return { attributes, html };
}
