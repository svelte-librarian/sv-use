<script lang="ts">
	import { getPrevious } from '$sv-use/core';
	import Button from '$ui/Button.svelte';

	let counter = $state(0);
	let previousCounter = getPrevious(() => counter);
</script>

<div class="relative flex w-full flex-col gap-2">
	<span>Counter : {counter}</span>
	<span>Previous counter : {previousCounter.current ?? 'undefined'}</span>
	<Button onclick={() => counter++}>Increment counter</Button>
</div>
