<script lang="ts">
	import { onClickOutside } from '$sv-use/core';

	let divNode = $state<HTMLDivElement>();

	onClickOutside(
		() => divNode,
		(event) => {
			console.log('outside');
		},
		{ autoCleanup: true }
	);
</script>

<div class="relative flex w-full flex-col items-start gap-3">
	<div bind:this={divNode} class="aspect-square h-40 bg-blue-700 p-5 text-white">
		click outside of me
	</div>
	<p class="text-sm italic text-zinc-500">See the logs for details...</p>
</div>
