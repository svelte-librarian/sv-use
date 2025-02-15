import fs from 'node:fs/promises';
import { toCamelCase, toTitleCase } from '$utils/text-transform.js';
import { convertMarkdownFileToHTML } from '$utils/markdown.server.js';
import type { LayoutServerLoad } from './$types.js';
import { CORE_DIRECTORY, GUIDE_DIRECTORY } from '$utils/paths.js';

type Utility = {
	slug: string;
	label: string;
	category: string;
	package: string;
};

type UtilityWithMeta = {
	slug: string;
	label: string;
	category: string;
	package: string;
	meta: {
		previous: Utility | null;
		next: Utility | null;
	};
};

type CategoryBasedUtility = {
	[x: string]: Utility[];
};

type CategoryBasedUtilityWithMeta = {
	[x: string]: UtilityWithMeta[];
};

export const load: LayoutServerLoad = async () => {
	const gettingStartedDocs = await getGettingStartedDocs();
	const docs = await getPackageDocs(CORE_DIRECTORY);

	const allDocs = Object.keys(docs)
		.sort()
		.reduce(
			(obj, key) => {
				obj[key] = docs[key];
				return obj;
			},
			{
				guide: gettingStartedDocs
			} as CategoryBasedUtility
		);

	return {
		docs: setPreviousAndNextPage(allDocs)
	};
};

async function getGettingStartedDocs() {
	const files = await fs.readdir(GUIDE_DIRECTORY, { withFileTypes: true });

	return Promise.all(
		files.map(async (entry) => {
			const name = entry.name.split('.')[0];

			return {
				slug: name,
				label: toTitleCase(name),
				category: 'guide',
				package: 'guide'
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

	const groupedUtilities = Object.groupBy(
		utilities,
		({ category }) => category
	) as CategoryBasedUtility;

	return Object.keys(groupedUtilities)
		.sort()
		.reduce((obj, key) => {
			obj[key] = groupedUtilities[key].map((v) => ({ ...v, package: 'core' }));
			return obj;
		}, {} as CategoryBasedUtility);
}

function setPreviousAndNextPage(docs: CategoryBasedUtility) {
	const _docs = Object.entries(docs as CategoryBasedUtilityWithMeta);

	for (let i = 0; i < _docs.length; i++) {
		const categoryDocs = _docs[i][1];

		for (let j = 0; j < categoryDocs.length; j++) {
			const page = categoryDocs[j];

			page.meta = {
				previous: null,
				next: null
			};

			if (j > 0) {
				const previousPage = categoryDocs[j - 1];
				page.meta.previous = {
					category: previousPage.category,
					label: previousPage.label,
					package: previousPage.package,
					slug: previousPage.slug
				};
			} else if (i > 0) {
				const lastPageOfPreviousCategory = _docs[i - 1][1].at(-1);
				if (lastPageOfPreviousCategory) {
					page.meta.previous = {
						category: lastPageOfPreviousCategory.category,
						label: lastPageOfPreviousCategory.label,
						package: lastPageOfPreviousCategory.package,
						slug: lastPageOfPreviousCategory.slug
					};
				}
			}

			if (j < categoryDocs.length - 1) {
				const nextPage = categoryDocs[j + 1];
				page.meta.next = {
					category: nextPage.category,
					label: nextPage.label,
					package: nextPage.package,
					slug: nextPage.slug
				};
			} else if (i < _docs.length - 1) {
				const firstPageOfNextCategory = _docs[i + 1][1].at(0);
				if (firstPageOfNextCategory) {
					page.meta.next = {
						category: firstPageOfNextCategory.category,
						label: firstPageOfNextCategory.label,
						package: firstPageOfNextCategory.package,
						slug: firstPageOfNextCategory.slug
					};
				}
			}
		}
	}

	return Object.fromEntries(_docs);
}
