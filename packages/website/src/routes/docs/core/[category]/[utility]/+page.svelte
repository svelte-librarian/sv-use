<script lang="ts">
	import { page } from '$app/stores';
	import { onThisPageHeadings } from '$lib/contexts/navigation.svelte.js';
	import { toTitleCase } from '$utils/text-transform.js';

	let { data } = $props();

	let showTypeDefinitions = $state(false);

	$effect(() => {
		$page.url.pathname;

		showTypeDefinitions = false;
	});

	$effect(() => {
		const headings = data.headings;

		if (data.Component) {
			headings.unshift({ depth: 2, value: 'Demo', data: { id: 'demo' } });
			headings.push({ depth: 2, value: 'Type definitions', data: { id: 'type-definitions' } });
			headings.push({ depth: 2, value: 'Sources', data: { id: 'sources' } });
		}

		onThisPageHeadings.current = headings;
	});
</script>

<svelte:head>
	<title>{data.title} - {toTitleCase($page.params.category)} | SvelteUse</title>
</svelte:head>

<main class="relative flex w-full flex-col">
	<div class="mb-5 flex items-start gap-5">
		<h1 class="text-3xl font-semibold">{data.title}</h1>
	</div>
	<div class="relative mb-10 mt-5 grid w-full grid-cols-[100px_auto] gap-5">
		<span>Category</span>
		<span>{toTitleCase($page.params.category)}</span>
	</div>
	<div id="lede" class="contents">
		{@html data.lede}
	</div>
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
	<details
		bind:open={showTypeDefinitions}
		id="type-definitions-container"
		class="flex flex-col items-start gap-5"
	>
		<summary id="type-definitions" class="scroll-mt-12 py-5 text-2xl font-semibold lg:scroll-mt-16">
			Type definitions
		</summary>
		{@html data.typeDefinitions}
	</details>
	<h2 id="sources" class="scroll-mt-12 py-5 text-2xl font-semibold lg:scroll-mt-16">Sources</h2>
	<div>
		<a
			href="https://github.com/svelte-librarian/sv-use/tree/main/packages/core/src/{$page.params
				.category}/{$page.params.utility}/index.svelte.ts"
			target="_blank"
			class="text-svelte underline"
		>
			View Source Code
		</a>
		•
		{#if data.Component}
			<a
				href="https://github.com/svelte-librarian/sv-use/tree/main/packages/website/src/lib/docs/core/{$page
					.params.category}/{$page.params.utility}/Demo.svelte"
				target="_blank"
				class="text-svelte underline"
			>
				Demo
			</a>
			•
		{/if}
		<a
			href="https://github.com/svelte-librarian/sv-use/tree/main/packages/website/src/lib/docs/core/{$page
				.params.category}/{$page.params.utility}/index.md"
			target="_blank"
			class="text-svelte underline"
		>
			Docs
		</a>
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

	:global(#lede p, #content p) {
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

	:global(#type-definitions-container pre) {
		position: relative;
		width: 100%;
		padding: 20px;
		overflow: auto;
		border-radius: 0.5rem;
		counter-reset: line;
	}

	:global(#type-definitions-container pre code) {
		overflow: auto;
		counter-reset: line;
	}

	:global(#content figure pre code) {
		overflow: auto;
		border-radius: 0.5rem;
		padding: 20px 0;
		counter-reset: line;
	}

	:global(#content figure pre code *, #type-definitions-container pre code *) {
		font-family: 'Cascadia Code', sans-serif;
	}

	:global(
		#content figure pre code span[data-highlighted-line],
		#type-definitions-container pre code span[data-highlighted-line]
	) {
		background-color: rgba(200, 200, 255, 0.1);
	}

	:global(
		#content figure pre code > [data-line],
		#type-definitions-container pre code > [data-line]
	) {
		padding: 2px 20px;
	}

	:global(
		#content figure pre code[data-line-numbers] > [data-line]::before,
		#type-definitions-container pre code[data-line-numbers] > [data-line]::before
	) {
		counter-increment: line;
		content: counter(line);
		display: inline-block;
		width: 1rem;
		margin-right: 2rem;
		text-align: right;
		color: gray;
	}

	:global(#content figure pre code, #type-definitions-container pre code),
	:global(#content figure pre code span, #type-definitions-container pre code span) {
		color: var(--shiki-light);
		background-color: var(--shiki-light-bg);
	}

	:global(html.dark #content figure pre code, html.dark #type-definitions-container pre code),
	:global(
		html.dark #content figure pre code span,
		html.dark #type-definitions-container pre code span
	) {
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
