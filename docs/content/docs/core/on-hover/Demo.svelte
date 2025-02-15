<script lang="ts">
	import { scale } from 'svelte/transition';
	import { onHover } from '@sv-use/core';
	import { cn } from '$utils/cn.js';
	import { Button } from '$lib/components/atoms/index.js';

	let el = $state<HTMLButtonElement>();

	const isHovering = onHover(() => el, { delay: 350 });
</script>

<div class="relative flex h-[200px] w-full items-center justify-center">
	<div class="relative">
		<Button bind:el class="bg-svelte rounded-md px-3 py-1 text-white hover:bg-opacity-85">
			Hover me
		</Button>
		{#if isHovering.current}
			<div
				transition:scale={{ duration: 200 }}
				class={cn(
					'absolute -top-[calc(100%+5px)] left-1/2 -translate-x-1/2 whitespace-nowrap',
					'rounded bg-black px-2 py-1 text-sm text-white dark:bg-zinc-900 dark:text-zinc-200'
				)}
			>
				<span>SvelteUse is awesome</span>
				<div
					class="absolute left-1/2 top-full aspect-square h-2 -translate-x-1/2 -translate-y-1/2 rotate-45 bg-black dark:bg-zinc-900"
				></div>
			</div>
		{/if}
	</div>
</div>
