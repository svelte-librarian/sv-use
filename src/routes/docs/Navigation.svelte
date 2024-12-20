<script lang="ts">
	import { fade, fly } from 'svelte/transition';
	import { toTitleCase } from '$utils/to-title-case.js';
	import type { UtilityAttributes } from '$types/markdown.js';

	interface Props {
		utilityGroups: Record<string, UtilityAttributes[]>;
	}

	let { utilityGroups }: Props = $props();

	let showSidebar = $state(false);
</script>

<div class="contents lg:hidden">
	<nav class="relative flex w-full items-center justify-start px-5 py-[10px]">
		<button onclick={() => (showSidebar = true)} class="relative flex items-center gap-5">
			<div class="relative flex flex-col gap-1">
				<div class="h-[2px] w-4 bg-black"></div>
				<div class="h-[2px] w-4 bg-black"></div>
			</div>
			<span class="text-sm">Menu</span>
		</button>
	</nav>
	{#if showSidebar}
		<div class="contents">
			<!-- svelte-ignore a11y_click_events_have_key_events  -->
			<!-- svelte-ignore a11y_no_static_element_interactions -->
			<div
				transition:fade
				onclick={() => (showSidebar = false)}
				class="fixed left-0 top-0 z-10 h-full w-full bg-black/50"
			></div>
			<menu
				transition:fly={{ x: -200 }}
				class="fixed left-0 top-0 z-20 flex h-full w-4/5 flex-col gap-5 bg-zinc-50 p-5"
			>
				{#each Object.entries(utilityGroups) as [category, utilities]}
					<div class="relative flex w-full flex-col gap-5">
						<h3 class="text-sm font-semibold text-zinc-900">{toTitleCase(category)}</h3>
						<div class="relatve flex w-full flex-col">
							{#each utilities as { slug, title }}
								<a
									href="/docs/{category}/{slug}"
									onclick={() => (showSidebar = false)}
									class="text-sm font-medium text-zinc-500"
								>
									{title}
								</a>
							{/each}
						</div>
					</div>
				{/each}
			</menu>
		</div>
	{/if}
</div>

<!-- DESKTOP -->

<nav class="relative hidden h-full flex-col items-center justify-start gap-5 px-16 py-8 lg:flex">
	{#each Object.entries(utilityGroups) as [category, utilities]}
		<div class="relative flex w-full flex-col gap-5">
			<h3 class="font-semibold">{toTitleCase(category)}</h3>
			<div class="relatve flex w-full flex-col">
				{#each utilities as { slug, title }}
					<a href="/docs/{category}/{slug}" class="text-zinc-500">{title}</a>
				{/each}
			</div>
		</div>
	{/each}
</nav>
