<script lang="ts">
	import { sessionState } from '$sv-use/core';

	let inputValue = $state('');
	const search = sessionState('search', '');

	const onSearch = () => {
		search.current = inputValue;
		inputValue = '';
	};
</script>

<div class="relative flex w-full flex-col gap-5">
	<span>Search : {search.current}</span>
	<input
		type="text"
		bind:value={inputValue}
		class="rounded-md border border-zinc-300 px-3 py-2 text-sm"
	/>
	<button onclick={onSearch} class="rounded-md bg-svelte px-3 py-1 text-white">Search</button>
	<p class="text-sm italic">Try reloading the page after searching</p>
</div>
