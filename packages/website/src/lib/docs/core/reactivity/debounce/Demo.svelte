<script lang="ts">
	import { debounce } from '$sv-use/core';

	let search = $state('');
	const debouncedSearch = debounce(() => search);
</script>

<div class="relative flex w-full flex-col gap-5">
	<span>Search : {debouncedSearch.current}</span>
	<input
		type="text"
		bind:value={search}
		class="rounded-md border border-zinc-300 px-3 py-2 text-sm"
	/>
</div>
