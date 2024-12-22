<script lang="ts">
	import { debouncedState } from './index.svelte.js';
	import type { FormEventHandler } from 'svelte/elements';

	const search = debouncedState('');

	const oninput: FormEventHandler<HTMLInputElement> = (event) => {
		search.current = event.currentTarget.value;
	};
</script>

<div class="relative flex w-full flex-col gap-5">
	<span>Search : {search.current}</span>
	<input type="text" {oninput} class="rounded-md border border-zinc-300 px-3 py-2 text-sm" />
</div>
