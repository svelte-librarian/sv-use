<script lang="ts">
	import { getTextDirection } from '$sv-use/core';
	import { Button } from '$lib/components/atoms/index.js';

	let el = $state<HTMLDivElement>();
	const dir = getTextDirection({
		element: () => el
	});

	const text = $derived.by(() => {
		return dir.current === 'ltr'
			? 'This paragraph is in English and correctly goes left to right.'
			: 'This paragraph is in English but incorrectly goes right to left.';
	});

	function onclick() {
		dir.current = dir.current === 'rtl' ? 'ltr' : 'rtl';
	}
</script>

<div bind:this={el} class="relative flex w-full flex-col items-start gap-5">
	<p class={dir.current === 'rtl' ? 'text-red-500' : 'dark:text-zinc-200'}>{text}</p>
	<hr class="w-full border-zinc-300 dark:border-zinc-700" />
	<div class="flex items-center justify-start gap-5">
		<Button {onclick}>{dir.current.toUpperCase()}</Button>
		<p class="text-zinc-500 dark:text-zinc-400">Click to change the direction</p>
	</div>
</div>
