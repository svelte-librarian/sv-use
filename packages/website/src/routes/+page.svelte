<script lang="ts">
	import { base } from '$app/paths';

	let { data } = $props();
</script>

<svelte:head>
	<title>SvelteUse</title>
</svelte:head>

<main class="relative flex w-full flex-col items-center justify-center gap-20 p-5">
	<section class="relative flex w-full flex-col items-center gap-10 pt-20">
		<h1 class="text-svelte dark:text-darksvelte text-4xl font-bold">SvelteUse</h1>
		<p class="dark:text-zinc-200">A collection of Svelte 5 utilities</p>
		<div class="relative flex w-full flex-wrap items-center justify-center gap-5">
			<a
				href="{base}/docs/guide/introduction"
				class="bg-svelte dark:bg-darksvelte rounded-full px-5 py-2 text-sm text-white"
			>
				Get Started
			</a>
			<a
				href="https://github.com/svelte-librarian/sv-use"
				target="_blank"
				class="rounded-full bg-zinc-800 px-5 py-2 text-sm text-white"
			>
				View On GitHub
			</a>
		</div>
	</section>
	<section class="flex flex-col items-center gap-10">
		<h2 class="text-svelte dark:text-darksvelte text-2xl font-semibold">Features</h2>
		<div class="grid grid-cols-1 gap-5 md:grid-cols-2">
			{@render feature(
				'Feature Rich',
				`More than ${data.totalUtilities} utilities to choose from. (Alright, it's not that much yet...)`
			)}
			{@render feature('SSR Friendly', 'Supports SSR out of the box.')}
			{@render feature('Strongly typed', 'Written in Typescript for type safety.')}
			{@render feature('Interactive demos', 'Every function has an interactive demo.')}
		</div>
	</section>
</main>

{#snippet feature(title: string, description: string)}
	<div
		class="relative flex flex-col gap-[10px] rounded-lg bg-zinc-100 p-5 dark:bg-zinc-800 dark:text-zinc-200"
	>
		<h2 class="font-semibold">{title}</h2>
		<p>{description}</p>
	</div>
{/snippet}
