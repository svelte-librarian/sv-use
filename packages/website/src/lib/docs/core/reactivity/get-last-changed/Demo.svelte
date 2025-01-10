<script lang="ts">
	import { getLastChanged } from '$sv-use/core';
	import Button from '$ui/Button.svelte';

	let value = $state(0);
	const lastChanged = getLastChanged(() => value);
</script>

<div class="relative flex w-full flex-col gap-2">
	<span>Value : {value}</span>
	<span>Value last changed : {new Date(lastChanged.current).toLocaleString('fr-CH')}</span>
	<Button onclick={() => value++}>Increment</Button>
</div>
