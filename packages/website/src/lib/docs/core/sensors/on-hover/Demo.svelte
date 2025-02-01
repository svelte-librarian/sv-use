<script lang="ts">
	import { onHover } from '$sv-use/core';
	import { cn } from '$utils/cn.js';
	import { scale } from 'svelte/transition';

	let el = $state<HTMLElement>();

	const isHovering = onHover(() => el, { delay: 350 });
</script>

<div class="relative flex h-[200px] w-full items-center justify-center">
	<div class="relative">
		<button bind:this={el} class="bg-svelte rounded-md px-3 py-1 text-white hover:bg-opacity-85">
			Hover me
		</button>
		{#if isHovering.current}
			<div
				transition:scale={{ duration: 200 }}
				class={cn(
					'absolute -top-[calc(100%+5px)] left-1/2 -translate-x-1/2 whitespace-nowrap',
					'rounded bg-black px-2 py-1 text-sm text-white'
				)}
			>
				<span>SvelteUse is awesome</span>
				<div
					class="absolute left-1/2 top-full aspect-square h-2 -translate-x-1/2 -translate-y-1/2 rotate-45 bg-black"
				></div>
			</div>
		{/if}
	</div>
</div>
