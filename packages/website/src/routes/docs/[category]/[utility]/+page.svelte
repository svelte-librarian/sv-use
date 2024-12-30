<script lang="ts">
	import { onThisPageHeadings } from '$lib/contexts/navigation.svelte.js';
	import { toTitleCase } from '$utils/to-title-case.js';

	let { data } = $props();

	$effect(() => {
		const headings = data.headings;

		if (data.Component) {
			headings.unshift({ depth: 2, value: 'Demo', data: { id: 'demo' } });
		}

		onThisPageHeadings.current = headings;
	});
</script>

<svelte:head>
	<title>{data.attributes.title} - {toTitleCase(data.attributes.category)} | SvelteUse</title>
	<meta name="description" content={data.attributes.description} />
</svelte:head>

<main class="relative flex w-full flex-col">
	<h1 class="mb-5 text-3xl font-semibold">{data.attributes.title}</h1>
	<div class="relative mb-5 grid w-full grid-cols-[100px_auto] gap-5">
		<span>Category</span>
		<span>{data.attributes.category}</span>
	</div>
	{#each data.attributes.description.split('\\n') as line}
		<p>{line}</p>
	{/each}
	{#if data.Component}
		{@const DemoComponent = data.Component}
		<h2 id="demo" class="scroll-mt-12 py-5 text-2xl font-semibold lg:scroll-mt-16">Demo</h2>
		<div class="relative overflow-auto rounded-lg bg-[#eff1f5] p-5 dark:bg-[#282c34]">
			<DemoComponent />
		</div>
	{/if}
	<div id="content" class="contents">
		{@html data.html}
	</div>
</main>

<style lang="postcss">
	:global(#content h2) {
		@apply scroll-mt-12 lg:scroll-mt-16;
		font-size: 1.5rem;
		font-weight: 600;
		padding-top: 1.25rem;
		padding-bottom: 1.25rem;
	}

	:global(#content h3) {
		@apply scroll-mt-12 lg:scroll-mt-16;
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

	:global(#content a) {
		@apply text-svelte;
		text-decoration: underline;
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
		padding: 20px 0;
		counter-reset: line;
	}

	:global(#content figure pre code *) {
		font-family: 'Cascadia Code', sans-serif;
	}

	:global(#content figure pre code span[data-highlighted-line]) {
		background-color: rgba(200, 200, 255, 0.1);
	}

	:global(#content figure pre code > [data-line]) {
		padding: 2px 20px;
	}

	:global(#content figure pre code[data-line-numbers] > [data-line]::before) {
		counter-increment: line;
		content: counter(line);
		display: inline-block;
		width: 1rem;
		margin-right: 2rem;
		text-align: right;
		color: gray;
	}

	:global(#content figure pre code),
	:global(#content figure pre code span) {
		color: var(--shiki-light);
		background-color: var(--shiki-light-bg);
	}

	:global(html.dark #content figure pre code),
	:global(html.dark #content figure pre code span) {
		color: var(--shiki-dark);
		background-color: var(--shiki-dark-bg);
	}

	:global(#content *:not(figure) code) {
		@apply bg-svelte;
		color: #fafafa;
		padding: 2px 4px;
		border-radius: 4px;
	}
</style>
