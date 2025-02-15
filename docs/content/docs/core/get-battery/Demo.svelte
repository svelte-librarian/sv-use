<script lang="ts">
	import { getBattery } from '@sv-use/core';

	const battery = getBattery();
</script>

<pre class="dark:text-zinc-200">{JSON.stringify(battery, null, 2)}</pre>
