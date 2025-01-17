<script lang="ts">
	import { observePerformance, type PerformanceEntryType } from '$sv-use/core';

	let entries = $state<PerformanceEntry[]>([]);

	observePerformance((list) => entries.push(...list.getEntries()), {
		entryTypes: PerformanceObserver.supportedEntryTypes as unknown as PerformanceEntryType[]
	});
</script>

<div class="relative flex w-full flex-col gap-2">
	<button
		onclick={() => window.location.reload()}
		class="bg-svelte rounded-md px-3 py-1 text-white"
	>
		Refresh page
	</button>
	<pre lang="json">{JSON.stringify(entries, null, 2)}</pre>
</div>
