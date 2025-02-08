<script lang="ts">
	import { debouncedState } from '$sv-use/core';
	import { Input } from '$lib/components/atoms/index.js';
	import type { FormEventHandler } from 'svelte/elements';

	const search = debouncedState('');

	const oninput: FormEventHandler<HTMLInputElement> = (event) => {
		search.current = event.currentTarget.value;
	};
</script>

<div class="relative flex w-full flex-col gap-5">
	<p class="dark:text-zinc-200">Search : {search.current}</p>
	<Input {oninput} />
</div>
