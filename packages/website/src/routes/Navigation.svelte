<script lang="ts">
	import { onMount } from 'svelte';
	import { fade, fly } from 'svelte/transition';
	import { page } from '$app/stores';

	let menuNode = $state<HTMLMenuElement>();
	let menuButtonNode = $state<HTMLButtonElement>();
	let showMenu = $state(false);

	onMount(() => {
		const onClick = (event: MouseEvent) => {
			const target = event.target as HTMLElement;

			console.log(target);

			if (
				target === menuNode ||
				(menuNode?.contains(target) &&
					!(target instanceof HTMLButtonElement || target instanceof HTMLAnchorElement))
			)
				return;

			if (target === menuButtonNode) {
				showMenu = !showMenu;
			} else {
				showMenu = false;
			}
		};

		window.addEventListener('click', onClick);

		return () => {
			window.removeEventListener('click', onClick);
		};
	});

	$effect(() => {
		document.body.style.overflow = showMenu ? 'hidden' : 'auto';
	});
</script>

<div class="contents lg:hidden">
	<nav
		class="relative flex w-full items-center justify-between border-b border-zinc-300 bg-[#fafafa] px-5 py-5"
	>
		<a href="/" class="flex items-center gap-5">
			<span class="text-svelte text-sm font-semibold">SvelteUse</span>
		</a>
		<a href="https://github.com/svelte-librarian/sv-use" target="_blank">
			<img src="/logos/github/dark.svg" alt="SvelteUse's Github Repository" class="h-6" />
		</a>
	</nav>
	{#if showMenu}
		<div class="contents">
			<!-- svelte-ignore a11y_click_events_have_key_events  -->
			<!-- svelte-ignore a11y_no_static_element_interactions -->
			<div
				transition:fade
				onclick={() => (showMenu = false)}
				class="fixed left-0 top-0 z-20 h-full w-full bg-black/50"
			></div>
			<menu
				bind:this={menuNode}
				transition:fly={{ x: 200 }}
				class="fixed right-0 top-0 z-20 flex h-full w-4/5 flex-col gap-5 bg-zinc-50 p-5 shadow-[4px_0_8px_8px_rgba(0,0,0,0.1)]"
			>
				<div class="relative flex w-full flex-col gap-5">
					<h3 class="text-sm font-semibold text-zinc-900">Getting Started</h3>
					<div class="relative flex w-full flex-col">
						<a
							href="/docs"
							onclick={() => (showMenu = false)}
							class="text-sm font-medium {$page.url.pathname === `/docs`
								? 'text-svelte'
								: 'text-zinc-500'}"
						>
							Introduction
						</a>
						<a
							href="/docs/limitations"
							onclick={() => (showMenu = false)}
							class="text-sm font-medium {$page.url.pathname === `/docs/limitations`
								? 'text-svelte'
								: 'text-zinc-500'}"
						>
							Limitations
						</a>
					</div>
				</div>
			</menu>
		</div>
	{/if}
</div>

<!-- DESKTOP -->

<div class="sticky left-0 top-0 z-10 hidden w-full border-b border-zinc-300 bg-[#fafafa] lg:flex">
	<nav
		class="relative mx-auto flex h-full w-full max-w-[900px] items-center justify-between px-5 py-5"
	>
		<a href="/" class="flex items-center gap-5">
			<span class="text-svelte font-semibold">SvelteUse</span>
		</a>
		<a href="https://github.com/svelte-librarian/sv-use" target="_blank">
			<img src="/logos/github/dark.svg" alt="SvelteUse's Github Repository" class="h-6" />
		</a>
	</nav>
</div>
