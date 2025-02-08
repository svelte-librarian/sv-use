import { convertMarkdownFileToHTML } from '$lib/utils/markdown.server.js';
import { getTypeDefinitions } from '$utils/type-definitions.server.js';
import type { PageServerLoad } from './$types.js';

export const load: PageServerLoad = async ({ params }) => {
	const data = await convertMarkdownFileToHTML<{ category: string }>(
		`./src/lib/docs/core/${params.utility}/index.md`
	);

	return {
		...data,
		typeDefinitions: await getTypeDefinitions(params.utility)
	};
};
