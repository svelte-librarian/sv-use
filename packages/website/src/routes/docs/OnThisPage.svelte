<script lang="ts">
	import { page } from '$app/stores';
	import { onThisPageHeadings } from '$lib/contexts/navigation.svelte.js';
	import { cn } from '$utils/cn.js';
</script>

<aside
	class="sticky right-0 top-[65px] hidden h-full flex-1 flex-col items-center p-8 pt-40 xl:flex"
>
	{#if onThisPageHeadings.current.length > 0}
		<div class="relative flex max-w-60 flex-col gap-5">
			<span>On this page</span>
			<div class="relative flex flex-col gap-[10px]">
				{#each onThisPageHeadings.current as heading}
					{@const hash = `#${heading.data.id}`}
					<a
						href={hash}
						style="padding-left: {(heading.depth - 2) * 20}px"
						class={cn(
							'relative font-medium',
							$page.url.hash === hash ? 'text-svelte' : 'text-zinc-500'
						)}
					>
						{heading.value}
					</a>
				{/each}
			</div>
		</div>
	{/if}
</aside>
