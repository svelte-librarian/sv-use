import fs from 'node:fs/promises';
import type { LayoutServerLoad } from './$types.js';
import { convertMarkdownFileToHTML } from '$utils/markdown.server.js';
import type { UtilityAttributes } from '$types/markdown.js';

const LIB_DIRECTORY = './src/lib';

export const load: LayoutServerLoad = async () => {
	const categoryEntries = await fs.readdir(LIB_DIRECTORY, { withFileTypes: true });

	const directoryEntries = (
		await Promise.all(
			categoryEntries.map(async (categoryEntry) => {
				const path = `${categoryEntry.parentPath}/${categoryEntry.name}`;

				const category = await fs.stat(path);
				if (!category.isDirectory()) return null;

				return await fs.readdir(path, { withFileTypes: true });
			})
		)
	)
		.filter((e) => e !== null)
		.flat();

	const utilityEntries = (
		await Promise.all(
			directoryEntries.map(async (directoryEntry) => {
				const path = `${directoryEntry.parentPath}/${directoryEntry.name}`;

				const directory = await fs.stat(path);
				if (!directory.isDirectory()) return null;

				const entries = await fs.readdir(path, { withFileTypes: true });

				return entries.filter((entry) => entry.name === 'index.md');
			})
		)
	)
		.filter((e) => e !== null)
		.flat();

	const utilityAttributes = await Promise.all(
		utilityEntries.map(async (utilityEntry) => {
			const { attributes } = await convertMarkdownFileToHTML<UtilityAttributes>(
				`${utilityEntry.parentPath}/${utilityEntry.name}`
			);

			return attributes;
		})
	);

	const utilityGroups = Object.groupBy(utilityAttributes, (attribute) => attribute.category);

	return { utilityGroups };
};
