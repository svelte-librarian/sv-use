import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
export default {
	preprocess: vitePreprocess(),
	kit: {
		adapter: adapter(),
		alias: {
			$types: './src/lib/types',
			$utils: './src/lib/utils',
			'$sv-use/core': '../packages/core/dist/index.js'
		}
	}
};
