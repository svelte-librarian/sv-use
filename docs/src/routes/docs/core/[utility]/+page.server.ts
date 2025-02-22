import { convertMarkdownFileToHTML } from '$lib/utils/markdown.server.js';
import { CORE_DIRECTORY, DIST_CORE_DIRECTORY } from '$utils/paths.js';
import type { PageServerLoad } from './$types.js';

export const load: PageServerLoad = async ({ params }) => {
	const data = await convertMarkdownFileToHTML<{ category: string }>(
		`${CORE_DIRECTORY}/${params.utility}/index.md`,
		{
			typeDefinitionsPath: `${DIST_CORE_DIRECTORY}/${params.utility}/index.svelte.d.ts`
		}
	);

	return {
		...data
	};
};
