<script lang="ts">
	import { page } from '$app/stores';
	import { onThisPageHeadings } from '$lib/contexts/navigation.svelte.js';
	import { theme } from '$lib/contexts/theme.svelte.js';
	import { toTitleCase } from '$utils/text-transform.js';

	let { data } = $props();

	$effect(() => {
		const headings = data.headings;

		if (data.Component) {
			headings.unshift({ depth: 2, value: 'Demo', data: { id: 'demo' } });
		}

		headings.push({ depth: 2, value: 'Sources', data: { id: 'sources' } });

		onThisPageHeadings.current = headings;
	});
</script>

<svelte:head>
	<title>{data.title} - {toTitleCase(data.attributes.category)} | SvelteUse</title>
</svelte:head>

<main class="relative flex w-full flex-col">
	<h1 class="mb-5 mt-3 break-words text-2xl font-semibold lg:text-3xl dark:text-zinc-200">
		{data.title}
	</h1>
	<div class="relative mb-10 mt-5 grid w-full grid-cols-[100px_auto] gap-5 dark:text-zinc-200">
		<span>Category</span>
		<span>{toTitleCase(data.attributes.category)}</span>
	</div>
	<div class="content contents">
		{@html data.lede}
	</div>
	{#if data.Component}
		{@const DemoComponent = data.Component}
		<h2
			id="demo"
			class="scroll-mt-12 py-5 text-2xl font-semibold lg:scroll-mt-16 dark:text-zinc-200"
		>
			Demo
		</h2>
		<div class="relative overflow-auto rounded-lg bg-[#eff1f5] p-5 dark:bg-[#282c34]">
			<DemoComponent />
		</div>
	{/if}
	<div class="content contents">
		{@html data.html}
	</div>
	<h2
		id="sources"
		class="scroll-mt-12 py-5 text-2xl font-semibold lg:scroll-mt-16 dark:text-zinc-200"
	>
		Sources
	</h2>
	<div>
		<a
			href="https://github.com/svelte-librarian/sv-use/tree/main/packages/core/src/{$page.params
				.utility}/index.svelte.ts"
			target="_blank"
			class="text-svelte dark:text-darksvelte underline"
		>
			View Source Code
		</a>
		<span class="dark:text-zinc-200">•</span>
		{#if data.Component}
			<a
				href="https://github.com/svelte-librarian/sv-use/tree/main/packages/website/src/lib/docs/core/{$page
					.params.utility}/Demo.svelte"
				target="_blank"
				class="text-svelte dark:text-darksvelte underline"
			>
				Demo
			</a>
			<span class="dark:text-zinc-200">•</span>
		{/if}
		<a
			href="https://github.com/svelte-librarian/sv-use/tree/main/packages/website/src/lib/docs/core/{$page
				.params.utility}/index.md"
			target="_blank"
			class="text-svelte dark:text-darksvelte underline"
		>
			Docs
		</a>
	</div>
</main>

<style lang="postcss">
	:global {
		.content h2 {
			@apply scroll-mt-12 lg:scroll-mt-16;
			font-size: 1.5rem;
			font-weight: 600;
			padding-top: 1.25rem;
			padding-bottom: 1.25rem;
		}

		html.dark .content h2 {
			@apply text-zinc-100;
		}

		.content h3 {
			@apply scroll-mt-12 lg:scroll-mt-16;
			font-size: 1.25rem;
			font-weight: 600;
			padding-top: 1.25rem;
			padding-bottom: 1.25rem;
		}

		html.dark .content h3 {
			@apply text-zinc-100;
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
			@apply text-darksvelte;
		}

		#lede p,
		.content p {
			margin-bottom: 1.25rem;
		}

		html.dark #lede p,
		html.dark .content p {
			@apply text-zinc-100;
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
