import { convertMarkdownFileToHTML } from '$lib/utils/markdown.server.js';
import type { PageServerLoad } from './$types.js';

export const load: PageServerLoad = async () => {
	const data = await convertMarkdownFileToHTML<{ title: string; description: string }>(
		`./src/lib/docs/introduction.md`
	);

	return {
		...data
	};
};
