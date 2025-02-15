import { convertMarkdownFileToHTML } from '$lib/utils/markdown.server.js';
import { GUIDE_DIRECTORY } from '$utils/paths.js';
import type { PageServerLoad } from './$types.js';

export const load: PageServerLoad = async ({ params }) => {
	const data = await convertMarkdownFileToHTML(`${GUIDE_DIRECTORY}/${params.slug}.md`);

	return {
		...data
	};
};
