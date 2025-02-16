import { Config } from 'tailwindcss';
import defaultTheme from 'tailwindcss/defaultTheme';

export default {
	darkMode: 'selector',
	content: ['./src/**/*.{html,js,svelte,ts}', './content/**/*.{html,js,svelte,ts}'],
	theme: {
		screens: {
			xsm: '480px',
			...defaultTheme.screens
		},
		extend: {
			colors: {
				svelte: '#ff3e00',
				darksvelte: '#f96743'
			}
		}
	},
	plugins: []
} satisfies Config;
