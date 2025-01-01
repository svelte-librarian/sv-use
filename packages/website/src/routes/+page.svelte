<script lang="ts">
	import { base } from '$app/paths';
</script>

<svelte:head>
	<title>SvelteUse</title>
</svelte:head>

<main class="relative flex w-full flex-col items-center justify-center gap-20 p-5">
	<section class="relative flex w-full flex-col items-center gap-10 pt-20">
		<h1 class="text-svelte text-4xl font-bold">SvelteUse</h1>
		<p>A collection of Svelte 5 utilities</p>
		<div class="relative flex w-full flex-wrap items-center justify-center gap-5">
			<a
				href="{base}/docs/getting-started/introduction"
				class="bg-svelte rounded-full px-5 py-2 text-sm text-white">Get Started</a
			>
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
		<h2 class="text-svelte text-2xl font-semibold">Features</h2>
		<div class="grid grid-cols-1 gap-5 md:grid-cols-2">
			<div class="relative flex flex-col gap-[10px] rounded-lg bg-zinc-100 p-5">
				<h2 class="font-semibold">SSR Friendly</h2>
				<p>Supports SSR out of the box.</p>
			</div>
			<div class="relative flex flex-col gap-[10px] rounded-lg bg-zinc-100 p-5">
				<h2 class="font-semibold">Strongly typed</h2>
				<p>Written in Typescript for type safety.</p>
			</div>
			<div class="relative flex flex-col gap-[10px] rounded-lg bg-zinc-100 p-5">
				<h2 class="font-semibold">Interactive demos</h2>
				<p>Every function has an interactive demo.</p>
			</div>
		</div>
	</section>
</main>
