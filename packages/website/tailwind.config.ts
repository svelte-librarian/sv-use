import { Config } from 'tailwindcss';

export default {
	darkMode: 'selector',
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			colors: {
				svelte: '#ff3e00',
				darksvelte: '#f96743'
			}
		}
	},
	plugins: []
} satisfies Config;
