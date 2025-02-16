import type { Component } from 'svelte';
import type { PageLoad } from './$types.js';

export const load: PageLoad = async ({ data, params }) => {
	return {
		...data,
		Component: await getDemoComponent(params.utility)
	};
};

async function getDemoComponent(utility: string) {
	try {
		const component = await import(`../../../../../content/docs/core/${utility}/Demo.svelte`);
		return component.default as Component;
	} catch {
		return undefined;
	}
}
