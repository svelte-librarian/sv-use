import { convertMarkdownFileToHTML } from '$lib/utils/markdown.server.js';
import { getTypeDefinitions } from '$utils/type-definitions.server.js';
import type { PageServerLoad } from './$types.js';
import type { UtilityAttributes } from '$lib/types/markdown.js';

export const load: PageServerLoad = async ({ params }) => {
	const data = await convertMarkdownFileToHTML<UtilityAttributes>(
		`./src/lib/docs/core/${params.category}/${params.utility}/index.md`
	);

	return {
		...data,
		typeDefinitions: await getTypeDefinitions(params.category, params.utility)
	};
};
