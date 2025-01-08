<script lang="ts">
	import { getPrevious } from '$sv-use/core';

	let counter = $state(0);
	let previousCounter = getPrevious(() => counter);
</script>

<div class="relative flex w-full flex-col gap-2">
	<span>Counter : {counter}</span>
	<span>Previous counter : {previousCounter.current ?? 'undefined'}</span>
	<button onclick={() => counter++} class="bg-svelte rounded-md px-3 py-1 text-white">
		Increment counter
	</button>
</div>
