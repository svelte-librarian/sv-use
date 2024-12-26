import { convertMarkdownFileToHTML } from '$lib/utils/markdown.server.js';
import type { UtilityAttributes } from '$lib/types/markdown.js';
import type { PageServerLoad } from './$types.js';

export const load: PageServerLoad = async ({ params }) => {
	const data = await convertMarkdownFileToHTML<UtilityAttributes>(
		`./src/lib/docs/core/${params.category}/${params.utility}/index.md`
	);

	return {
		...data
	};
};
