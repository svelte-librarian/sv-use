<script lang="ts">
	import { toTitleCase } from '$utils/to-title-case.js';

	let { data } = $props();
</script>

<svelte:head>
	<link rel="stylesheet" href="https://fonts.cdnfonts.com/css/cascadia-code" />
	<title>{data.attributes.title} - {toTitleCase(data.attributes.category)} | SvelteUse</title>
	<meta name="description" content={data.attributes.description} />
</svelte:head>

<main id="content" class="relative flex w-full flex-col">
	<h1 class="mb-5 text-2xl font-semibold">{data.attributes.title}</h1>
	<div class="relative mb-5 grid w-full grid-cols-[100px_auto] gap-5">
		<span>Category</span>
		<span>{data.attributes.category}</span>
	</div>
	{#each data.attributes.description.split('\\n') as line}
		<p>{line}</p>
	{/each}
	<div id="#content" class="contents">
		{@html data.html}
	</div>
</main>

<style>
	:global(#content code) {
		padding: 20px 0;
		counter-reset: line;
	}

	:global(#content code *) {
		font-family: 'Cascadia Code', sans-serif;
	}

	:global(#content span[data-highlighted-line]) {
		background-color: rgba(200, 200, 255, 0.1);
	}

	:global(#content code > [data-line]) {
		padding: 2px 20px;
	}

	:global(#content code[data-line-numbers] > [data-line]::before) {
		counter-increment: line;
		content: counter(line);
		display: inline-block;
		width: 1rem;
		margin-right: 2rem;
		text-align: right;
		color: gray;
	}

	:global(#content h2) {
		font-size: 1.5rem;
		font-weight: 600;
		padding-top: 1.25rem;
		padding-bottom: 1.25rem;
	}

	:global(#content h3) {
		font-size: 1.25rem;
		font-weight: 600;
		padding-top: 1.25rem;
		padding-bottom: 1.25rem;
	}

	:global(#content ul) {
		list-style-type: disc;
		margin-left: 2.5rem;
		margin-bottom: 1.25rem;
	}

	:global(#content a span, #content a svg) {
		color: #4f46e5;
		font-weight: 600;
	}

	:global(html.dark #content a span, html.dark #content a svg) {
		color: #38bdf8;
		font-weight: 600;
	}

	:global(#content p) {
		margin-bottom: 1.25rem;
	}

	:global(#content h2 > p) {
		margin-bottom: 0;
	}

	:global(#content figure) {
		position: relative;
		width: 100%;
		color: #ffffff;
		margin-bottom: 1.25rem;
	}

	:global(#content figure pre code) {
		overflow: auto;
		border-radius: 0.5rem;
	}

	:global(#content code),
	:global(#content code span) {
		color: var(--shiki-light);
		background-color: var(--shiki-light-bg);
	}

	:global(html.dark #content code),
	:global(html.dark #content code span) {
		color: var(--shiki-dark);
		background-color: var(--shiki-dark-bg);
	}
</style>
