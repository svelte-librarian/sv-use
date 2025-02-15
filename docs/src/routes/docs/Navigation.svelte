<script lang="ts">
	import { fade, fly } from 'svelte/transition';
	import { page } from '$app/stores';
	import { base } from '$app/paths';
	import { handleEventListener } from '@sv-use/core';
	import { onThisPageHeadings } from '$lib/contexts/navigation.svelte.js';
	import { toTitleCase } from '$utils/text-transform.js';
	import { cn } from '$utils/cn.js';

	interface Props {
		docs: Record<string, { slug: string; label: string; category: string; package: string }[]>;
	}

	let { docs }: Props = $props();

	let navNode = $state<HTMLElement>();
	let onThisPageMenuNode = $state<HTMLMenuElement>();
	let onThisPageButtonNode = $state<HTMLButtonElement>();
	let showSidebar = $state(false);
	let showOnThisPage = $state(false);

	handleEventListener('click', (event: MouseEvent) => {
		const target = event.target as HTMLElement;

		if (
			target === onThisPageMenuNode ||
			(onThisPageMenuNode?.contains(target) &&
				!(target instanceof HTMLButtonElement || target instanceof HTMLAnchorElement))
		)
			return;

		if (target === onThisPageButtonNode) {
			showOnThisPage = !showOnThisPage;
		} else {
			showOnThisPage = false;
		}
	});

	$effect(() => {
		document.body.style.overflow = showSidebar ? 'hidden' : 'auto';
	});
</script>

<div class="sticky left-0 top-0 z-10 flex w-full items-center justify-between lg:hidden">
	<nav
		bind:this={navNode}
		class={cn(
			'relative flex w-full items-center justify-between px-5 py-[15px]',
			'border-b border-zinc-300 bg-[#fafafa] dark:border-zinc-600 dark:bg-zinc-900'
		)}
	>
		<button onclick={() => (showSidebar = true)} class="relative flex items-center gap-5">
			<div class="relative flex flex-col gap-1">
				<div class="h-[2px] w-4 bg-black dark:bg-zinc-50"></div>
				<div class="h-[2px] w-4 bg-black dark:bg-zinc-50"></div>
			</div>
			<span class="text-sm dark:text-zinc-200">Menu</span>
		</button>
		<button
			bind:this={onThisPageButtonNode}
			class="flex items-center gap-3 [&>*]:pointer-events-none"
		>
			<span class="text-sm dark:text-zinc-200">On this page</span>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="16"
				height="16"
				viewBox="0 0 24 24"
				fill="none"
				stroke-width="2"
				stroke-linecap="round"
				stroke-linejoin="round"
				vector-effect="non-scaling-stroke"
				class={cn(
					'icon icon-tabler icons-tabler-outline icon-tabler-chevron-right duration-150',
					'stroke-black dark:stroke-zinc-50',
					showOnThisPage && 'rotate-90'
				)}
			>
				<path d="M0 0h24v24H0z" stroke="none" fill="none" />
				<path d="M9 6l6 6l-6 6" />
			</svg>
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
				class={cn(
					'fixed left-0 top-0 z-20 flex h-full w-4/5 flex-col gap-5 overflow-auto p-5 shadow-[4px_0_8px_8px_rgba(0,0,0,0.1)]',
					'bg-zinc-50 dark:bg-zinc-800'
				)}
			>
				{#each Object.entries(docs) as [category, utilities]}
					<div class="relative flex w-full flex-col gap-5">
						<h3 class="text-sm font-semibold text-zinc-900 dark:text-zinc-200">
							{toTitleCase(category)}
						</h3>
						<div class="relative flex w-full flex-col gap-1">
							{#each utilities as { slug, label, package: _package }}
								{@const href = `${base}/docs/${_package}/${slug}`}
								<a
									{href}
									onclick={() => (showSidebar = false)}
									class={cn(
										'text-sm font-medium',
										$page.url.pathname === href
											? 'text-svelte dark:text-darksvelte'
											: 'text-zinc-500 dark:text-zinc-400'
									)}
								>
									{label}
								</a>
							{/each}
						</div>
					</div>
				{/each}
			</menu>
		</div>
	{/if}
	{#if showOnThisPage}
		<menu
			bind:this={onThisPageMenuNode}
			transition:fade={{ duration: 150 }}
			style="top: {navNode.getBoundingClientRect().height}px"
			class="absolute z-20 flex w-full flex-col items-start gap-3 bg-[#fafafa] p-5 shadow-md dark:bg-zinc-900 dark:shadow-xl"
		>
			<button
				onclick={() => window.scrollTo(0, 0)}
				class="text-svelte dark:text-darksvelte font-medium"
			>
				Return to top
			</button>
			{#if onThisPageHeadings.current.length > 0}
				<hr class="w-full border-zinc-300 dark:border-zinc-600" />
				{#each onThisPageHeadings.current as heading}
					{@const hash = `#${heading.data.id}`}
					<a
						href="#{heading.data.id}"
						style="padding-left: {(heading.depth - 2) * 20}px"
						class={cn(
							'relative font-medium',
							$page.url.hash === hash
								? 'text-svelte dark:text-darksvelte'
								: 'text-zinc-500 dark:text-zinc-400'
						)}
					>
						{heading.value}
					</a>
				{/each}
			{/if}
		</menu>
	{/if}
</div>

<!-- DESKTOP -->

<nav
	class={cn(
		'sticky left-0 top-[65px] hidden h-[calc(100dvh-65px)] flex-1 flex-col items-center justify-start gap-5 overflow-scroll p-8 lg:flex',
		'bg-zinc-100 dark:bg-zinc-800'
	)}
>
	<div class="relative flex flex-col items-start gap-5">
		{#each Object.entries(docs) as [category, utilities]}
			<div class="relative flex flex-col gap-5">
				<h3 class="font-semibold dark:text-zinc-200">{toTitleCase(category)}</h3>
				<div class="relatve flex w-full flex-col gap-1">
					{#each utilities as { slug, label, package: _package }}
						{@const href = `${base}/docs/${_package}/${slug}`}
						<a
							{href}
							class={cn(
								'font-medium',
								$page.url.pathname === href
									? 'text-svelte dark:text-darksvelte'
									: 'text-zinc-500 dark:text-zinc-400'
							)}
						>
							{label}
						</a>
					{/each}
				</div>
			</div>
		{/each}
	</div>
</nav>
