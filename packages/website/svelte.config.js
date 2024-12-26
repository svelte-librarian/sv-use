import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
export default {
	preprocess: vitePreprocess(),
	kit: {
		adapter: adapter(),
		alias: {
			$types: './src/lib/types',
			$utils: './src/lib/utils',
			'$sv-use/core': '../core/src/index.ts'
		}
	}
};
