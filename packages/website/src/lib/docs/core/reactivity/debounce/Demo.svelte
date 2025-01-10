<script lang="ts">
	import { debounce } from '$sv-use/core';
	import Input from '$ui/Input.svelte';

	let search = $state('');
	const debouncedSearch = debounce(() => search);
</script>

<div class="relative flex w-full flex-col gap-5">
	<span>Search : {debouncedSearch.current}</span>
	<Input type="text" bind:value={search} />
</div>
