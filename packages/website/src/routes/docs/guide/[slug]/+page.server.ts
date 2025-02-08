import { convertMarkdownFileToHTML } from '$lib/utils/markdown.server.js';
import type { PageServerLoad } from './$types.js';

export const load: PageServerLoad = async ({ params }) => {
	const data = await convertMarkdownFileToHTML(`./src/lib/docs/guide/${params.slug}.md`);

	return {
		...data
	};
};
