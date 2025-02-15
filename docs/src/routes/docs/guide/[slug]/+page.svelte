<script lang="ts">
	import { onThisPageHeadings } from '$lib/contexts/navigation.svelte.js';

	let { data } = $props();

	$effect(() => {
		onThisPageHeadings.current = data.headings;
	});
</script>

<svelte:head>
	<link rel="stylesheet" href="https://fonts.cdnfonts.com/css/cascadia-code" />
	<title>{data.title} - Guide | SvelteUse</title>
</svelte:head>

<main class="relative flex w-full flex-col">
	<h1 class="mb-5 text-3xl font-semibold dark:text-zinc-200">{data.title}</h1>
	<div class="content contents">
		{@html data.lede}
		{@html data.html}
	</div>
</main>

<style lang="postcss">
	:global {
		.content h2 {
			font-size: 1.5rem;
			font-weight: 600;
			padding-top: 1.25rem;
			padding-bottom: 1.25rem;
			scroll-margin-top: 3rem;
		}

		html.dark .content h2 {
			@apply dark:text-zinc-200;
		}

		.content h3 {
			font-size: 1.25rem;
			font-weight: 600;
			padding-top: 1.25rem;
			padding-bottom: 1.25rem;
			scroll-margin-top: 3rem;
		}

		html.dark .content h3 {
			@apply dark:text-zinc-200;
		}

		.content ul {
			list-style-type: disc;
			margin-left: 2.5rem;
			margin-bottom: 1.25rem;
		}

		.content a {
			@apply text-svelte;
			text-decoration: underline;
		}

		html.dark .content a {
			@apply dark:text-darksvelte;
		}

		.content p {
			margin-bottom: 1.25rem;
		}

		html.dark .content p {
			@apply text-zinc-100;
			margin-bottom: 1.25rem;
		}

		.content h2 > p {
			margin-bottom: 0;
		}

		.content figure {
			position: relative;
			width: 100%;
			color: #ffffff;
			margin-bottom: 1.25rem;
		}

		.content figure pre code {
			overflow: auto;
			border-radius: 0.5rem;
			padding: 20px 0;
			counter-reset: line;
		}

		.content figure pre code * {
			font-family: 'Cascadia Code', sans-serif;
		}

		.content figure pre code span[data-highlighted-line] {
			background-color: rgba(200, 200, 255, 0.1);
		}

		.content figure pre code > [data-line] {
			padding: 2px 20px;
		}

		.content figure pre code[data-line-numbers] > [data-line]::before {
			counter-increment: line;
			content: counter(line);
			display: inline-block;
			width: 1rem;
			margin-right: 2rem;
			text-align: right;
			color: gray;
		}

		.content figure pre code,
		.content figure pre code span {
			color: var(--shiki-light);
			background-color: var(--shiki-light-bg);
		}

		html.dark .content figure pre code,
		html.dark .content figure pre code span {
			color: var(--shiki-dark);
			background-color: var(--shiki-dark-bg);
		}

		.content *:not(figure) code {
			@apply bg-svelte;
			color: #fafafa;
			padding: 2px 4px;
			border-radius: 4px;
		}

		html.dark .content *:not(figure) code {
			@apply bg-darksvelte;
		}
	}
</style>
