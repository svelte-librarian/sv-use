<script lang="ts">
	import { base } from '$app/paths';
	import { theme } from '$lib/contexts/theme.svelte.js';
	import { cn } from '$utils/cn.js';
	import ThemeHandler from './ThemeHandler.svelte';
</script>

<nav
	class={cn(
		'relative flex w-full items-center justify-between px-5 py-5 lg:hidden',
		'border-b border-zinc-300 bg-[#fafafa] dark:border-zinc-600 dark:bg-zinc-900'
	)}
>
	<a href={base} class="flex items-center gap-5">
		<span class="text-svelte dark:text-darksvelte font-semibold">SvelteUse</span>
	</a>
	<div class="relative flex items-center justify-end gap-5">
		<ThemeHandler />
		<a
			title="Go to the repository"
			href="https://github.com/svelte-librarian/sv-use"
			target="_blank"
		>
			<img
				src="{base}/logos/github/light.svg"
				alt="SvelteUse's Github Repository"
				class="hidden h-6 dark:block"
			/>
			<img
				src="{base}/logos/github/dark.svg"
				alt="SvelteUse's Github Repository"
				class="h-6 dark:hidden"
			/>
		</a>
	</div>
</nav>

<!-- DESKTOP -->

<div
	class={cn(
		'sticky left-0 top-0 z-10 hidden w-full lg:flex',
		'border-b border-zinc-300 bg-[#fafafa] dark:border-zinc-600 dark:bg-zinc-900'
	)}
>
	<nav
		class="relative mx-auto flex h-full w-full max-w-[1200px] items-center justify-between px-5 py-5"
	>
		<a href={base} class="flex items-center gap-5">
			<span class="text-svelte dark:text-darksvelte font-semibold">SvelteUse</span>
		</a>
		<div
			class="relative flex items-center justify-end divide-x divide-zinc-300 dark:divide-zinc-600"
		>
			<div class="flex items-center px-5">
				<a
					href="{base}/docs/getting-started/introduction"
					class="hover:text-svelte dark:hover:text-darksvelte duration-150 ease-in-out dark:text-zinc-200"
				>
					Docs
				</a>
			</div>
			<div class="flex items-center px-5">
				<ThemeHandler />
			</div>
			<div class="px-5">
				<a href="https://github.com/svelte-librarian/sv-use" target="_blank">
					<img
						src="{base}/logos/github/light.svg"
						alt="SvelteUse's Github Repository"
						class="hidden h-6 dark:block"
					/>
					<img
						src="{base}/logos/github/dark.svg"
						alt="SvelteUse's Github Repository"
						class="h-6 dark:hidden"
					/>
				</a>
			</div>
		</div>
	</nav>
</div>
