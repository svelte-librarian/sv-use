<script lang="ts">
	import { onMount } from 'svelte';
	import { fade, fly } from 'svelte/transition';
	import { page } from '$app/stores';
	import { base } from '$app/paths';
	import { onThisPageHeadings } from '$lib/contexts/navigation.svelte.js';
	import { toTitleCase } from '$utils/text-transform.js';
	import type { Category } from '$types/markdown.js';
	import { cn } from '$utils/cn.js';

	interface Props {
		gettingStartedDocs: { slug: string; label: string }[];
		docs: Category[];
	}

	let { gettingStartedDocs, docs }: Props = $props();

	let navNode = $state<HTMLElement>();
	let onThisPageMenuNode = $state<HTMLMenuElement>();
	let onThisPageButtonNode = $state<HTMLButtonElement>();
	let showSidebar = $state(false);
	let showOnThisPage = $state(false);

	onMount(() => {
		const onClick = (event: MouseEvent) => {
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
		};

		window.addEventListener('click', onClick);

		return () => {
			window.removeEventListener('click', onClick);
		};
	});

	$effect(() => {
		document.body.style.overflow = showSidebar ? 'hidden' : 'auto';
	});
</script>

<div class="sticky left-0 top-0 z-10 flex w-full items-center justify-between lg:hidden">
	<nav
		bind:this={navNode}
		class="relative flex w-full items-center justify-between border-b border-zinc-300 bg-[#fafafa] px-5 py-[15px]"
	>
		<button onclick={() => (showSidebar = true)} class="relative flex items-center gap-5">
			<div class="relative flex flex-col gap-1">
				<div class="h-[2px] w-4 bg-black"></div>
				<div class="h-[2px] w-4 bg-black"></div>
			</div>
			<span class="text-sm">Menu</span>
		</button>
		<button
			bind:this={onThisPageButtonNode}
			class="flex items-center gap-3 [&>*]:pointer-events-none"
		>
			<span class="text-sm">On this page</span>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="16"
				height="16"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				stroke-width="2"
				stroke-linecap="round"
				stroke-linejoin="round"
				vector-effect="non-scaling-stroke"
				class="icon icon-tabler icons-tabler-outline icon-tabler-chevron-right duration-150 {showOnThisPage
					? 'rotate-90'
					: ''}"
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
				class="fixed left-0 top-0 z-20 flex h-full w-4/5 flex-col gap-5 overflow-auto bg-zinc-50 p-5 shadow-[4px_0_8px_8px_rgba(0,0,0,0.1)]"
			>
				<div class="relative flex w-full flex-col gap-5">
					<h3 class="text-sm font-semibold text-zinc-900">Getting Started</h3>
					<div class="relative flex w-full flex-col gap-1">
						{#each gettingStartedDocs as doc}
							<a
								href="{base}/docs/getting-started/{doc.slug}"
								onclick={() => (showSidebar = false)}
								class="text-sm font-medium {$page.url.pathname ===
								`${base}/docs/getting-started/${doc.slug}`
									? 'text-svelte'
									: 'text-zinc-500'}"
							>
								{doc.label}
							</a>
						{/each}
					</div>
				</div>
				{#each Object.entries(docs) as [category, utilities]}
					<div class="relative flex w-full flex-col gap-5">
						<h3 class="text-sm font-semibold text-zinc-900">{toTitleCase(category)}</h3>
						<div class="relative flex w-full flex-col gap-1">
							{#each Object.entries(utilities) as [slug, title]}
								{@const href = `${base}/docs/core/${category}/${slug}`}
								<a
									{href}
									onclick={() => (showSidebar = false)}
									class={cn(
										'text-sm font-medium',
										$page.url.pathname === href ? 'text-svelte' : 'text-zinc-500'
									)}
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
	{#if showOnThisPage}
		<menu
			bind:this={onThisPageMenuNode}
			transition:fade={{ duration: 150 }}
			style="top: {navNode.getBoundingClientRect().height}px"
			class="absolute z-20 flex w-full flex-col items-start gap-3 bg-[#fafafa] p-5 shadow-md"
		>
			<button onclick={() => window.scrollTo(0, 0)} class="text-svelte font-medium">
				Return to top
			</button>
			{#if onThisPageHeadings.current.length > 0}
				<hr class="w-full text-zinc-400" />
				{#each onThisPageHeadings.current as heading}
					<a
						href="#{heading.data.id}"
						style="padding-left: {(heading.depth - 2) * 20}px"
						class="relative font-medium text-zinc-500"
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
	class="sticky left-0 top-[65px] hidden h-[calc(100dvh-65px)] flex-1 flex-col items-center justify-start gap-5 overflow-scroll bg-zinc-100 p-8 lg:flex"
>
	<div class="relative flex flex-col items-start gap-5">
		<div class="relative flex flex-col gap-5">
			<h3 class="font-semibold text-zinc-900">Getting Started</h3>
			<div class="relative flex w-full flex-col gap-1">
				{#each gettingStartedDocs as doc}
					<a
						href="{base}/docs/getting-started/{doc.slug}"
						onclick={() => (showSidebar = false)}
						class="font-medium {$page.url.pathname === `${base}/docs/getting-started/${doc.slug}`
							? 'text-svelte'
							: 'text-zinc-500'}"
					>
						{doc.label}
					</a>
				{/each}
			</div>
		</div>
		{#each docs as { category, utilities }}
			<div class="relative flex flex-col gap-5">
				<h3 class="font-semibold">{toTitleCase(category)}</h3>
				<div class="relatve flex w-full flex-col gap-1">
					{#each utilities as { slug, label }}
						{@const href = `${base}/docs/core/${category}/${slug}`}
						<a
							{href}
							class={cn(
								'font-medium',
								$page.url.pathname === href ? 'text-svelte' : 'text-zinc-500'
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
