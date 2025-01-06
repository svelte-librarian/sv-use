import fs from 'node:fs/promises';
import path from 'node:path';
import { toCamelCase, toTitleCase } from '$utils/text-transform.js';
import type { LayoutServerLoad } from './$types.js';
import type { Category } from '$types/markdown.js';

const CORE_DIRECTORY = './src/lib/docs/core';

export const load: LayoutServerLoad = async () => {
	return {
		docs: await getPackageDocs(CORE_DIRECTORY),
		gettingStartedDocs: await getGettingStartedDocs()
	};
};

async function getGettingStartedDocs() {
	const files = await fs.readdir('./src/lib/docs/getting-started', { withFileTypes: true });

	return Promise.all(
		files.map(async (entry) => {
			const name = entry.name.split('.')[0];

			return {
				slug: name,
				label: toTitleCase(name)
			};
		})
	);
}

async function getPackageDocs(dirPath: string): Promise<Category[]> {
	const categories: Category[] = [];

	const categoryDirs = (await fs.readdir(dirPath, { withFileTypes: true }))
		.filter((dirent) => dirent.isDirectory())
		.map((dirent) => dirent.name);

	for (const category of categoryDirs) {
		const categoryPath = path.join(dirPath, category);
		const utilityDirs = (await fs.readdir(categoryPath, { withFileTypes: true }))
			.filter((dirent) => dirent.isDirectory())
			.map((dirent) => dirent.name);

		const utilities: { slug: string; label: string }[] = utilityDirs.map((slug) => {
			return {
				slug,
				label: toCamelCase(slug)
			};
		});

		categories.push({ category, utilities });
	}

	return categories;
}
