import { localState } from '$sv-use/core';

export const theme = localState('theme', 'light');

$effect.root(() => {
	$effect(() => {
		document.documentElement.classList.toggle('dark', theme.current === 'dark');
	});
});
