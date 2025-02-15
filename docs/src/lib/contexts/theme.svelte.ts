import { browser } from '$app/environment';

type Theme = 'light' | 'dark';

export const theme = $state({
	current: 'light' as Theme
});

if (browser) {
	if (localStorage.getItem('theme')!) {
		theme.current = localStorage.getItem('theme')! as Theme;
	} else if (
		!('theme' in localStorage) &&
		window.matchMedia('(prefers-color-scheme: dark)').matches
	) {
		theme.current = 'dark';
	}
}

export function toggleTheme() {
	theme.current = theme.current === 'light' ? 'dark' : 'light';
	localStorage.setItem('theme', theme.current);
	document.documentElement.classList.toggle('dark', theme.current === 'dark');
}
