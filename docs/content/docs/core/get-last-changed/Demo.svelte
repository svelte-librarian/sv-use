<script lang="ts">
	import { Button } from '$lib/components/atoms/index.js';
	import { getLastChanged } from '$sv-use/core';

	let value = $state(0);
	const lastChanged = getLastChanged(() => value);
</script>

<div class="relative flex w-full flex-col gap-2">
	<p class="dark:text-zinc-200">Value : {value}</p>
	<p class="dark:text-zinc-200">
		Value last changed : {new Date(lastChanged.current).toLocaleString('fr-CH')}
	</p>
	<Button onclick={() => value++}>Increment</Button>
</div>
