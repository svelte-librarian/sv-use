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
		<div class="relative mx-auto w-full max-w-[760px] p-5 lg:py-10 xl:w-[760px]">
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
	:global {
		.markdown-alert {
			--border-color-caution: rgb(248, 81, 73);
			--background-color-caution: rgb(218, 54, 51, 0.1);

			--border-color-warning: rgb(210, 153, 34);
			--background-color-warning: rgb(158, 106, 3, 0.1);

			--border-color-important: rgb(163, 113, 247);
			--background-color-important: rgb(137, 87, 229, 0.1);

			--border-color-note: rgb(88, 166, 255);
			--background-color-note: rgb(31, 111, 235, 0.1);

			--border-color-tip: rgb(63, 185, 80);
			--background-color-tip: rgb(35, 134, 54, 0.1);
		}

		html.dark .markdown-alert {
			--border-color-caution: rgb(209, 36, 47);
			--background-color-caution: rgb(207, 34, 46, 0.1);

			--border-color-warning: rgb(210, 153, 34);
			--background-color-warning: rgb(210, 153, 34, 0.1);

			--border-color-important: rgb(130, 80, 223);
			--background-color-important: rgba(130, 80, 223, 0.1);

			--border-color-note: rgb(10, 107, 217);
			--background-color-note: rgb(9, 105, 218, 0.1);

			--border-color-tip: rgb(26, 127, 55);
			--background-color-tip: rgb(31, 136, 61, 0.1);
		}

		.markdown-alert {
			border-width: 2px;
			border-style: solid;
			border-radius: 8px;
			color: inherit;
			margin-bottom: 1rem;
			padding: 1rem;

			& > :last-child {
				margin-bottom: 0 !important;
			}

			.markdown-alert-title {
				align-items: center;
				display: flex;
				font-size: 14px;
				font-weight: 500;
				line-height: 1;

				svg.octicon {
					margin-right: 8px !important;
					fill: currentColor;
				}
			}
		}

		.markdown-alert.markdown-alert-note {
			border-color: var(--border-color-note);
			background-color: var(--background-color-note);

			.markdown-alert-title {
				color: var(--border-color-note);
			}
		}

		.markdown-alert.markdown-alert-tip {
			border-color: var(--border-color-tip);
			background-color: var(--background-color-tip);

			.markdown-alert-title {
				color: var(--border-color-tip);
			}
		}

		.markdown-alert.markdown-alert-important {
			border-color: var(--border-color-important);
			background-color: var(--background-color-important);

			.markdown-alert-title {
				color: var(--border-color-important);
			}
		}

		.markdown-alert.markdown-alert-warning {
			border-color: var(--border-color-warning);
			background-color: var(--background-color-warning);

			.markdown-alert-title {
				color: var(--border-color-warning);
			}
		}

		.markdown-alert.markdown-alert-caution {
			border-color: var(--border-color-caution);
			background-color: var(--background-color-caution);

			.markdown-alert-title {
				color: var(--border-color-caution);
			}
		}
	}
</style>
