<script lang="ts">
	import { getDeviceMotion } from '@sv-use/core';

	const deviceMotion = getDeviceMotion();
</script>

<pre class="dark:text-zinc-200">{JSON.stringify(deviceMotion, null, 2)}</pre>
