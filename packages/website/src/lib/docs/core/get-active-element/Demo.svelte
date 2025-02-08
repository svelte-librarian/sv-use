<script lang="ts">
	import { Input } from '$lib/components/atoms/index.js';
	import { getActiveElement } from '$sv-use/core';

	const activeElement = getActiveElement({ autoCleanup: true });
	const key = $derived(activeElement.current?.dataset?.id);
</script>

<div class="relative flex w-full flex-col gap-2">
	<div class="grid grid-cols-1 gap-2 md:grid-cols-3">
		{#each { length: 6 } as _, i}
			{@const id = i + 1}
			<Input data-id={id} placeholder={id.toString()} />
		{/each}
	</div>
	<span class="dark:text-zinc-200">
		Current Active Element : {key}
	</span>
</div>
