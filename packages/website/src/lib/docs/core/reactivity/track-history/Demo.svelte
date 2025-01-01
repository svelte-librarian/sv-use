<script lang="ts">
	import { trackHistory } from '$sv-use/core';

	let counter = $state(0);
	const history = trackHistory(
		() => counter,
		(v) => (counter = v)
	);
</script>

<div class="relative flex w-full flex-col gap-2">
	<span>Counter : {counter}</span>
	<span>History : </span>
	<ul>
		{#each history.history as item}
			<li>{item.snapshot} ({item.timestamp})</li>
		{:else}
			<li class="italic">Empty...</li>
		{/each}
	</ul>
	<span>Redo History : </span>
	<ul>
		{#each history.redoHistory as item}
			<li>{item.snapshot} ({item.timestamp})</li>
		{:else}
			<li class="italic">Empty...</li>
		{/each}
	</ul>
	<button onclick={() => counter++} class="bg-svelte rounded-md px-3 py-1 text-white">
		Increment
	</button>
	<button
		disabled={!history.canUndo}
		onclick={() => history.undo()}
		class="bg-svelte rounded-md px-3 py-1 text-white disabled:cursor-not-allowed disabled:opacity-50"
	>
		Undo
	</button>
	<button
		disabled={!history.canRedo}
		onclick={() => history.redo()}
		class="bg-svelte rounded-md px-3 py-1 text-white disabled:cursor-not-allowed disabled:opacity-50"
	>
		Redo
	</button>
</div>
