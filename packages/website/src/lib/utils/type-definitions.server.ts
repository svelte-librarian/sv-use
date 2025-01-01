import fs from 'node:fs/promises';
import { codeToHtml } from 'shiki';

export async function getTypeDefinitions(category: string, utility: string) {
	let typeDefinitions: string;
	try {
		typeDefinitions = await fs.readFile(
			`../core/dist/${category}/${utility}/index.svelte.d.ts`,
			'utf8'
		);

		const html = await codeToHtml(typeDefinitions, {
			lang: 'typescript',
			themes: {
				light: 'catppuccin-latte',
				dark: 'one-dark-pro'
			}
		});

		return html;
	} catch {
		throw new Error(`Missing type definitions for ${utility} - Build the core package first.`);
	}
}
