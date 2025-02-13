<script lang="ts">
	import { base } from '$app/paths';
	import { page } from '$app/stores';
	import Navigation from './Navigation.svelte';
	import OnThisPage from './OnThisPage.svelte';

	let { children, data } = $props();

	let meta = $derived.by(() => {
		const slug = $page.url.pathname.split('/').at(-1);

		return Object.values(data.docs)
			.flat()
			.find((u) => u.slug === slug)?.meta;
	});
</script>

<svelte:head>
	<link rel="stylesheet" href="https://fonts.cdnfonts.com/css/cascadia-code" />
</svelte:head>

<div class="relative flex w-full flex-col lg:flex-row lg:justify-center lg:gap-10 2xl:gap-20">
	<Navigation docs={data.docs} />
	<div class="relative w-full lg:w-auto lg:flex-[2_1_0%] xl:flex-none">
		<div class="relative mx-auto w-full max-w-[720px] p-5 lg:py-10 xl:w-[720px]">
			{@render children()}
			<div class="relative mt-10 flex w-full flex-col gap-2 md:flex-row">
				{#if meta?.previous}
					<a
						href="{base}/docs/{meta.previous.package}/{meta.previous.slug}"
						class="relative flex w-full flex-col items-start gap-1 rounded-md border border-zinc-200 p-4 dark:border-zinc-800"
					>
						<span class="text-sm text-zinc-500 dark:text-zinc-400">Previous page</span>
						<span class="text-svelte dark:text-darksvelte">{meta.previous.label}</span>
					</a>
				{:else}
					<div class="relative w-full"></div>
				{/if}
				{#if meta?.next}
					<a
						href="{base}/docs/{meta.next.package}/{meta.next.slug}"
						class="relative flex w-full flex-col items-end gap-1 rounded-md border border-zinc-200 p-4 dark:border-zinc-800"
					>
						<span class="text-sm text-zinc-500 dark:text-zinc-400">Next page</span>
						<span class="text-svelte dark:text-darksvelte">{meta.next.label}</span>
					</a>
				{:else}
					<div class="relative w-full"></div>
				{/if}
			</div>
		</div>
	</div>
	<OnThisPage />
</div>

<style>
	/* :global(pre) {
		font-family: 'Cascadia Code', monospace;
	} */

	/* remark-github-blockquote-alert css */

	:global(.markdown-alert) {
		--color-border-default: #30363d;
		--color-accent-fg: #58a6ff;
		--color-accent-emphasis: #1f6feb;
		--color-danger-fg: #f85149;
		--color-danger-emphasis: #da3633;
		--color-attention-fg: #d29922;
		--color-attention-emphasis: #9e6a03;
		--color-done-fg: #a371f7;
		--color-done-emphasis: #8957e5;
		--color-success-fg: #3fb950;
		--color-success-emphasis: #238636;
	}

	:global(html.dark .markdown-alert) {
		--color-border-default: #d0d7de;
		--color-accent-fg: #0969da;
		--color-accent-emphasis: #0969da;
		--color-danger-fg: #d1242f;
		--color-danger-emphasis: #cf222e;
		--color-attention-fg: #9a6700;
		--color-attention-emphasis: #9a6700;
		--color-done-fg: #8250df;
		--color-done-emphasis: #8250df;
		--color-success-fg: #1a7f37;
		--color-success-emphasis: #1f883d;
	}

	:global(.markdown-alert) {
		border-left: 0.25em solid var(--borderColor-default, var(--color-border-default));
		color: inherit;
		margin-bottom: 16px;
		padding: 0.5rem 1em;
	}
	:global(.markdown-alert > :last-child) {
		margin-bottom: 0 !important;
	}
	:global(.markdown-alert .markdown-alert-title) {
		align-items: center;
		display: flex;
		font-size: 14px;
		font-weight: 500;
		line-height: 1;
	}
	:global(.markdown-alert .markdown-alert-title svg.octicon) {
		margin-right: 8px !important;
		margin-right: var(--base-size-8, 8px) !important;
		fill: currentColor;
	}
	:global(.markdown-alert.markdown-alert-note) {
		border-left-color: var(--borderColor-accent-emphasis, var(--color-accent-emphasis));
	}
	:global(.markdown-alert.markdown-alert-note .markdown-alert-title) {
		color: var(--color-accent-fg);
		color: var(--fgColor-accent, var(--color-accent-fg));
	}
	:global(.markdown-alert.markdown-alert-tip) {
		border-left-color: var(--borderColor-success-emphasis, var(--color-success-emphasis));
	}
	:global(.markdown-alert.markdown-alert-tip .markdown-alert-title) {
		color: var(--color-success-fg);
		color: var(--fgColor-success, var(--color-success-fg));
	}
	:global(.markdown-alert.markdown-alert-important) {
		border-left-color: var(--borderColor-done-emphasis, var(--color-done-emphasis));
	}
	:global(.markdown-alert.markdown-alert-important .markdown-alert-title) {
		color: var(--color-done-fg);
		color: var(--fgColor-done, var(--color-done-fg));
	}
	:global(.markdown-alert.markdown-alert-warning) {
		border-left-color: var(--borderColor-attention-emphasis, var(--color-attention-emphasis));
	}
	:global(.markdown-alert.markdown-alert-warning .markdown-alert-title) {
		color: var(--color-attention-fg);
		color: var(--fgColor-attention, var(--color-attention-fg));
	}
	:global(.markdown-alert.markdown-alert-caution) {
		border-left-color: var(--borderColor-danger-emphasis, var(--color-danger-emphasis));
	}
	:global(.markdown-alert.markdown-alert-caution .markdown-alert-title) {
		color: var(--color-danger-fg);
		color: var(--fgColor-danger, var(--color-danger-fg));
	}
</style>
