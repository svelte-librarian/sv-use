<script lang="ts">
	import { getDeviceOrientation } from '$sv-use/core';

	const deviceOrientation = getDeviceOrientation();
</script>

<pre class="dark:text-zinc-200">{JSON.stringify(deviceOrientation, null, 2)}</pre>
