<script lang="ts">
	type Link = {
		href: string;
		label: string;
	};

	const linkGroups: Record<string, Link[]> = {
		Reactivity: [
			{
				label: 'debouncedState',
				href: '/docs/reactivity/debounce'
			},
			{
				label: 'historyState',
				href: '/docs/reactivity/history'
			}
		],
		Storage: [
			{
				label: 'localState',
				href: '/docs/storage/local'
			},
			{
				label: 'sessionState',
				href: '/docs/storage/session'
			}
		],
		Elements: [
			{
				label: 'createDropZone',
				href: '/docs/elements/dropZone'
			},
			{
				label: 'createDraggable',
				href: '/docs/elements/draggable'
			}
		]
	};
</script>

<nav class="relative px-16 py-8 h-full flex justify-start items-center gap-5 flex-col">
	{#each Object.entries(linkGroups) as [title, links]}
		<div class="relative w-full flex flex-col gap-5">
			<h3 class="font-semibold">{title}</h3>
			<div class="relatve w-full flex flex-col">
				{#each links as { label, href }}
					<a {href} class="text-zinc-500">{label}</a>
				{/each}
			</div>
		</div>
	{/each}
</nav>
