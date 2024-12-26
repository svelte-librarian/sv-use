<script lang="ts">
	import { getDeviceMotion } from '$sv-use/core';

	const deviceMotion = getDeviceMotion();
</script>

<div class="relative flex w-full flex-col gap-2">
	<pre>{JSON.stringify(deviceMotion, null, 2)}</pre>
</div>
