<script lang="ts">
	import { onMount } from 'svelte';
	import { handleEventListener } from '$sv-use/core';

	let divNode = $state<HTMLDivElement>();

	onMount(() => {
		if (!divNode) return;

		const cleanup = handleEventListener(divNode, 'click', () => console.log('clicked'));

		return () => {
			cleanup();
			console.log('cleanup');
		};
	});
</script>

<div bind:this={divNode} class="relative flex w-full flex-col gap-2">
	<span>Click me !</span>
	<span class="text-sm italic text-zinc-500">
		Open the console and change the page to see the logs
	</span>
</div>
