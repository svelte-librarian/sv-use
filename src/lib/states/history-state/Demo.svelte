<script lang="ts">
	import { historyState } from './index.svelte.js';

	let inputValue = $state('');
	const search = historyState('');

	const onSearch = () => {
		search.current = inputValue;
		inputValue = '';
	};
</script>

<div class="relative flex w-full flex-col gap-5">
	<input
		type="text"
		bind:value={inputValue}
		class="rounded-md border border-zinc-300 px-3 py-2 text-sm"
	/>
	<button onclick={onSearch} class="bg-svelte rounded-md px-3 py-1 text-white">Search</button>
	<hr class="border-zinc-300" />
	<span>Search history</span>
	{#if search.history.length === 0}
		<p class="italic">Empty...</p>
	{:else}
		<ul>
			{#each search.history as item}
				<li>{item.snapshot} ({item.timestamp})</li>
			{/each}
		</ul>
	{/if}
</div>
