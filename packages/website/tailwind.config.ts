import { Config } from 'tailwindcss';

export default {
	darkMode: 'selector',
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			colors: {
				svelte: '#ff3e00'
			}
		}
	},
	plugins: []
} satisfies Config;
