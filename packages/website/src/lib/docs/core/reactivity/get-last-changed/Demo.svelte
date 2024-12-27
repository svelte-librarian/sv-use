<script lang="ts">
	import { getLastChanged } from '$sv-use/core';

	let value = $state(0);
	const lastChanged = getLastChanged(() => value);
</script>

<div class="relative flex w-full flex-col gap-2">
	<span>Value : {value}</span>
	<span>Value last changed : {new Date(lastChanged.current).toLocaleString('fr-CH')}</span>
	<button onclick={() => value++} class="bg-svelte rounded-md px-3 py-1 text-white">
		Increment
	</button>
</div>
