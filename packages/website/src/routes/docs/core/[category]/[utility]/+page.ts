import type { Component } from 'svelte';
import type { PageLoad } from './$types.js';

export const load: PageLoad = async ({ data, params }) => {
	return {
		...data,
		Component: await getDemoComponent(params.category, params.utility)
	};
};

async function getDemoComponent(category: string, utility: string) {
	try {
		const component = await import(`$lib/docs/core/${category}/${utility}/Demo.svelte`);
		return component.default as Component;
	} catch {
		return undefined;
	}
}
