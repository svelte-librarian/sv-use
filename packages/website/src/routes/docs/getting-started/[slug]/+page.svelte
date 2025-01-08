<script lang="ts">
	import { onThisPageHeadings } from '$lib/contexts/navigation.svelte.js';

	let { data } = $props();

	$effect(() => {
		onThisPageHeadings.current = data.headings;
	});
</script>

<svelte:head>
	<link rel="stylesheet" href="https://fonts.cdnfonts.com/css/cascadia-code" />
	<title>{data.title} - Getting Started | SvelteUse</title>
</svelte:head>

<main class="relative flex w-full flex-col">
	<h1 class="mb-5 text-3xl font-semibold">{data.title}</h1>
	<div class="content contents">
		{@html data.lede}
		{@html data.html}
	</div>
</main>

<style lang="postcss">
	:global(.content h2) {
		font-size: 1.5rem;
		font-weight: 600;
		padding-top: 1.25rem;
		padding-bottom: 1.25rem;
		scroll-margin-top: 3rem;
	}

	:global(.content h3) {
		font-size: 1.25rem;
		font-weight: 600;
		padding-top: 1.25rem;
		padding-bottom: 1.25rem;
		scroll-margin-top: 3rem;
	}

	:global(.content ul) {
		list-style-type: disc;
		margin-left: 2.5rem;
		margin-bottom: 1.25rem;
	}

	:global(.content a) {
		@apply text-svelte;
		text-decoration: underline;
	}

	:global(.content p) {
		margin-bottom: 1.25rem;
	}

	:global(.content h2 > p) {
		margin-bottom: 0;
	}

	:global(.content figure) {
		position: relative;
		width: 100%;
		color: #ffffff;
		margin-bottom: 1.25rem;
	}

	:global(.content figure pre code) {
		overflow: auto;
		border-radius: 0.5rem;
		padding: 20px 0;
		counter-reset: line;
	}

	:global(.content figure pre code *) {
		font-family: 'Cascadia Code', sans-serif;
	}

	:global(.content figure pre code span[data-highlighted-line]) {
		background-color: rgba(200, 200, 255, 0.1);
	}

	:global(.content figure pre code > [data-line]) {
		padding: 2px 20px;
	}

	:global(.content figure pre code[data-line-numbers] > [data-line]::before) {
		counter-increment: line;
		content: counter(line);
		display: inline-block;
		width: 1rem;
		margin-right: 2rem;
		text-align: right;
		color: gray;
	}

	:global(.content figure pre code),
	:global(.content figure pre code span) {
		color: var(--shiki-light);
		background-color: var(--shiki-light-bg);
	}

	:global(html.dark .content figure pre code),
	:global(html.dark .content figure pre code span) {
		color: var(--shiki-dark);
		background-color: var(--shiki-dark-bg);
	}

	:global(.content *:not(figure) code) {
		@apply bg-svelte;
		color: #fafafa;
		padding: 2px 4px;
		border-radius: 4px;
	}
</style>
