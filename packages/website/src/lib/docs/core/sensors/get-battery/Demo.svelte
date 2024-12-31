<script lang="ts">
	import { getBattery } from '$sv-use/core';

	const battery = getBattery();
</script>

<div class="relative flex w-full flex-col gap-2">
	<pre>{JSON.stringify(battery, null, 2)}</pre>
</div>
