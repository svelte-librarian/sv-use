<script lang="ts">
	import { Button, Input } from '$lib/components/atoms/index.js';
	import { sessionState } from '@sv-use/core';

	let inputValue = $state('');
	const search = sessionState('search', '');

	const onSearch = () => {
		search.current = inputValue;
		inputValue = '';
	};
</script>

<div class="relative flex w-full flex-col gap-5">
	<p class="dark:text-zinc-200">Search : {search.current}</p>
	<Input bind:value={inputValue} />
	<Button onclick={onSearch} class="bg-svelte rounded-md px-3 py-1 text-white">Search</Button>
	<p class="text-sm italic text-zinc-500 dark:text-zinc-400">
		Try opening the page in another tab after searching
	</p>
</div>
