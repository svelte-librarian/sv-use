<script lang="ts">
	import { Button } from '$lib/components/atoms/index.js';
	import { getPrevious } from '@sv-use/core';

	let counter = $state(0);
	let previousCounter = getPrevious(() => counter);
</script>

<div class="relative flex w-full flex-col gap-2">
	<p class="dark:text-zinc-200">Counter : {counter}</p>
	<p class="dark:text-zinc-200">Previous counter : {previousCounter.current ?? 'undefined'}</p>
	<Button onclick={() => counter++}>Increment counter</Button>
</div>
