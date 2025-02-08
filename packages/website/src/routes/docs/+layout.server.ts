import fs from 'node:fs/promises';
import { toCamelCase, toTitleCase } from '$utils/text-transform.js';
import { convertMarkdownFileToHTML } from '$utils/markdown.server.js';
import type { LayoutServerLoad } from './$types.js';

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

async function getPackageDocs(dirPath: string) {
	const utilityDirs = (await fs.readdir(dirPath, { withFileTypes: true })).filter((dirent) =>
		dirent.isDirectory()
	);

	const utilities = await Promise.all(
		utilityDirs.map(async (dir) => {
			const { attributes } = await convertMarkdownFileToHTML<{ category: string }>(
				`${dir.parentPath}/${dir.name}/index.md`
			);

			return {
				slug: dir.name,
				label: toCamelCase(dir.name),
				category: attributes.category
			};
		})
	);

	const groupedUtilities = Object.groupBy(utilities, ({ category }) => category) as Record<
		string,
		{
			slug: string;
			label: string;
			category: string;
		}[]
	>;

	return Object.keys(groupedUtilities)
		.sort()
		.reduce(
			(obj, key) => {
				obj[key] = groupedUtilities[key];
				return obj;
			},
			{} as Record<
				string,
				{
					slug: string;
					label: string;
					category: string;
				}[]
			>
		);
}
