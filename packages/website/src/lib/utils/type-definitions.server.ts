import fs from 'node:fs/promises';

export async function getTypeDefinitions(category: string, utility: string) {
	let typeDefinitions: string;
	try {
		typeDefinitions = await fs.readFile(
			`../core/dist/${category}/${utility}/index.svelte.d.ts`,
			'utf8'
		);

		return typeDefinitions;
	} catch {
		throw new Error(`Missing type definitions for ${utility} - Build the core package first.`);
	}
}
