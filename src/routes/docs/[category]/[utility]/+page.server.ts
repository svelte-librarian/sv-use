import { convertMarkdownFileToHTML } from '$utils/markdown.server.js';
import type { UtilityAttributes } from '$types/markdown.js';
import type { PageServerLoad } from './$types.js';

export const load: PageServerLoad = async ({ params }) => {
	const data = await convertMarkdownFileToHTML<UtilityAttributes>(
		`./src/lib/${params.category}/${params.utility}/index.md`
	);

	return {
		...data
	};
};
