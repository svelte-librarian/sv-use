<script lang="ts">
	import { Button } from '$lib/components/atoms/index.js';
	import { trackHistory } from '$sv-use/core';

	let counter = $state(0);
	const history = trackHistory(
		() => counter,
		(v) => (counter = v)
	);

	type Snapshot = typeof history.history;
</script>

<div class="relative flex w-full flex-col gap-5">
	<p class="dark:text-zinc-200">Counter : {counter}</p>
	<Button onclick={() => counter++}>Increment</Button>
	<Button onclick={() => history.undo()} disabled={!history.canUndo}>Undo</Button>
	<Button onclick={() => history.redo()} disabled={!history.canRedo}>Redo</Button>
	<div class="relative flex w-full items-start justify-between gap-5">
		{@render renderHistory('Undo History', history.history)}
		{@render renderHistory('Redo History', history.redoHistory)}
	</div>
</div>

{#snippet renderHistory(title: string, history: Snapshot)}
	<div class="relative flex flex-1 flex-col items-start gap-2">
		<p class="dark:text-zinc-200">{title}</p>
		{#if history.length > 0}
			<ul class="list-decimal pl-5">
				{#each history as item}
					<li class="text-sm dark:text-zinc-200">
						Value : {item.snapshot} ({new Date(item.timestamp).toLocaleTimeString()})
					</li>
				{/each}
			</ul>
		{:else}
			<p class="italic dark:text-zinc-400">Empty...</p>
		{/if}
	</div>
{/snippet}
