<script lang="ts">
	import { Button } from '$lib/components/atoms/index.js';
	import { observePerformance, type PerformanceEntryType } from '@sv-use/core';

	let entries = $state<PerformanceEntry[]>([]);

	observePerformance((list) => entries.push(...list.getEntries()), {
		entryTypes: PerformanceObserver.supportedEntryTypes as unknown as PerformanceEntryType[]
	});
</script>

<div class="relative flex w-full flex-col gap-2">
	<Button onclick={() => window.location.reload()}>Refresh page</Button>
	<pre lang="json" class="dark:text-zinc-200">{JSON.stringify(entries, null, 2)}</pre>
</div>
