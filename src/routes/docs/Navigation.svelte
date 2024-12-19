<script lang="ts">
	import { fade, fly } from 'svelte/transition';

	type Link = {
		href: string;
		label: string;
	};

	const linkGroups: Record<string, Link[]> = {
		Reactivity: [
			{
				label: 'debouncedState',
				href: '/docs/reactivity/debounce'
			},
			{
				label: 'historyState',
				href: '/docs/reactivity/history'
			}
		],
		Storage: [
			{
				label: 'localState',
				href: '/docs/storage/local'
			},
			{
				label: 'sessionState',
				href: '/docs/storage/session'
			}
		],
		Elements: [
			{
				label: 'createDropZone',
				href: '/docs/elements/dropZone'
			},
			{
				label: 'createDraggable',
				href: '/docs/elements/draggable'
			}
		],
		Sensors: [
			{
				label: 'getMouse',
				href: '/docs/sensors/mouse'
			},
			{
				label: 'getBattery',
				href: '/docs/sensors/battery'
			}
		]
	};

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
				{#each Object.entries(linkGroups) as [title, links]}
					<div class="relative flex w-full flex-col gap-5">
						<h3 class="text-sm font-semibold text-zinc-900">{title}</h3>
						<div class="relatve flex w-full flex-col">
							{#each links as { label, href }}
								<a
									{href}
									onclick={() => (showSidebar = false)}
									class="text-sm font-medium text-zinc-500">{label}</a
								>
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
	{#each Object.entries(linkGroups) as [title, links]}
		<div class="relative flex w-full flex-col gap-5">
			<h3 class="font-semibold">{title}</h3>
			<div class="relatve flex w-full flex-col">
				{#each links as { label, href }}
					<a {href} class="text-zinc-500">{label}</a>
				{/each}
			</div>
		</div>
	{/each}
</nav>
