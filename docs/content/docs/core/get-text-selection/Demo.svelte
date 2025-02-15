<script lang="ts">
	import { getTextSelection } from '@sv-use/core';
	import { cn } from '$utils/cn.js';

	let el = $state<HTMLDivElement>();

	const selection = getTextSelection();
</script>

<div bind:this={el} class="relative flex w-full flex-col gap-5 dark:text-zinc-200">
	<p class="text-svelte dark:text-darksvelte font-semibold">You can select any text on the page.</p>
	<div class="relative flex w-full flex-col gap-2">
		<strong>Selected Text</strong>
		<p
			class={cn(
				'overflow-y-auto whitespace-pre',
				selection.text ? 'text-svelte dark:text-darksvelte' : 'italic text-gray-400'
			)}
		>
			{selection.text || 'No text selected'}
		</p>
	</div>
	<div class="relative flex w-full flex-col gap-2">
		<strong>Selected rects</strong>
		<pre>{JSON.stringify(selection.rects, null, 2)}</pre>
	</div>
</div>
