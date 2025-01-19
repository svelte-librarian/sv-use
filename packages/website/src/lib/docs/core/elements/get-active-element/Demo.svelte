<script lang="ts">
	import { getActiveElement } from '$sv-use/core';

	const activeElement = getActiveElement({ autoCleanup: true });
	const key = $derived(activeElement.current?.dataset?.id);
</script>

<div class="relative flex w-full flex-col gap-2">
	<div class="grid grid-cols-1 gap-2 md:grid-cols-3">
		{#each { length: 6 } as _, i}
			{@const id = i + 1}
			<input data-id={id} placeholder={id.toString()} class="my-0 min-w-0 rounded-md px-3 py-1" />
		{/each}
	</div>
	<span>
		Current Active Element : {key}
	</span>
</div>
