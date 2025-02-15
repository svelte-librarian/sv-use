<script lang="ts">
	import { Input } from '$lib/components/atoms/index.js';
	import { debounce } from '$sv-use/core';

	let search = $state('');
	const debouncedSearch = debounce(() => search);
</script>

<div class="relative flex w-full flex-col gap-5">
	<p class="dark:text-zinc-200">Search : {debouncedSearch.current}</p>
	<Input bind:value={search} />
</div>
