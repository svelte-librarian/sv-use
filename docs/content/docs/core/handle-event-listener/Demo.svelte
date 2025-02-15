<script lang="ts">
	import { onMount } from 'svelte';
	import { handleEventListener } from '@sv-use/core';

	let divNode = $state<HTMLDivElement>();

	onMount(() => {
		if (!divNode) return;

		const cleanup = handleEventListener(divNode, 'click', () => console.log('clicked'), {
			autoCleanup: false
		});

		return () => {
			cleanup();
			console.log('cleanup');
		};
	});
</script>

<div bind:this={divNode} class="relative flex w-full flex-col gap-2">
	<span class="dark:text-zinc-200">Click me !</span>
	<span class="text-sm italic text-zinc-500 dark:text-zinc-400">
		Open the console and change the page to see the logs
	</span>
</div>
