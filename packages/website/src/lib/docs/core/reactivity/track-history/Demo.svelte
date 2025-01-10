<script lang="ts">
	import { trackHistory } from '$sv-use/core';
	import Button from '$ui/Button.svelte';

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
	<Button onclick={() => counter++}>Increment</Button>
	<Button disabled={!history.canUndo} onclick={() => history.undo()}>Undo</Button>
	<Button disabled={!history.canRedo} onclick={() => history.redo()}>Redo</Button>
</div>
