<script lang="ts">
	import { throttledState, watch } from '$sv-use/core';
	import type { FormEventHandler } from 'svelte/elements';

	let updated = $state(0);
	const search = throttledState('', 1000, { trailing: false });

	watch(
		() => search,
		() => {
			updated += 1;
		},
		{ runOnMounted: false }
	);

	const oninput: FormEventHandler<HTMLInputElement> = (event) => {
		search.current = event.currentTarget.value;
	};
</script>

<div class="relative flex w-full flex-col gap-2">
	<input
		{oninput}
		placeholder="Try to type anything..."
		class="rounded-md border border-zinc-300 px-3 py-2 text-sm"
	/>
	<span class="text-sm italic text-zinc-500">Delay is set to 1000ms for this demo.</span>
	<p>Search value : {search.current}</p>
	<p>Times Updated : {updated}</p>
</div>
