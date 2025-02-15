<script lang="ts">
	import { Button, Input } from '$lib/components/atoms/index.js';
	import { historyState } from '@sv-use/core';

	let inputValue = $state('');
	const search = historyState('');

	const onSearch = () => {
		search.current = inputValue;
		inputValue = '';
	};
</script>

<div class="relative flex w-full flex-col gap-5">
	<Input bind:value={inputValue} placeholder="Search anything..." />
	<Button onclick={onSearch}>Search</Button>
	<hr class="border-zinc-300" />
	<p class="dark:text-zinc-200">Search history</p>
	{#if search.history.length > 0}
		<ul class="list-decimal pl-5">
			{#each search.history as item}
				<li class="dark:text-zinc-200">
					Value : {item.snapshot} ({new Date(item.timestamp).toLocaleTimeString()})
				</li>
			{/each}
		</ul>
	{:else}
		<p class="text-sm italic text-zinc-500 dark:text-zinc-400">Empty...</p>
	{/if}
</div>
