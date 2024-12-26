<script lang="ts">
	import { onMount } from 'svelte';
	import { handleEventListener } from './index.svelte.js';

	onMount(() => {
		const cleanup = handleEventListener('click', () => console.log('clicked'));

		return () => {
			cleanup();
			console.log('cleanup');
		};
	});
</script>

<div class="relative flex w-full flex-col gap-2">
	<span>Click me !</span>
	<span class="text-sm italic text-zinc-500">
		Open the console and change the page to see the logs
	</span>
</div>
