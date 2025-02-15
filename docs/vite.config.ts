import { defineConfig } from 'vitest/config';
import { sveltekit } from '@sveltejs/kit/vite';

export default defineConfig({
	plugins: [sveltekit()],
	server: {
		fs: {
			allow: ['../packages/core']
		}
	},
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}']
	}
});
