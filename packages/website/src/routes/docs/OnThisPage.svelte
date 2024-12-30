<script lang="ts">
	import { page } from '$app/stores';
	import { onThisPageHeadings } from '$lib/contexts/navigation.svelte.js';

	let hash = $derived($page.url.hash);
</script>

<aside
	class="sticky right-0 top-[65px] hidden h-full flex-1 flex-col items-center p-8 pt-40 xl:flex"
>
	{#if onThisPageHeadings.current.length > 0}
		<div class="relative flex max-w-60 flex-col gap-5">
			<span>On this page</span>
			<div class="relative flex flex-col gap-[10px]">
				{#each onThisPageHeadings.current as heading}
					<a
						href="#{heading.data.id}"
						style="padding-left: {(heading.depth - 2) * 20}px"
						class="relative font-medium {hash === `#${heading.data.id}`
							? 'text-svelte'
							: 'text-zinc-500'}"
					>
						{heading.value}
					</a>
				{/each}
			</div>
		</div>
	{/if}
</aside>
