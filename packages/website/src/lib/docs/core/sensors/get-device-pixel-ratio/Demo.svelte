<script lang="ts">
	import { getDevicePixelRatio } from '$sv-use/core';

	const devicePixelRatio = getDevicePixelRatio();
</script>

<div class="relative flex w-full flex-col gap-2">
	<pre>{JSON.stringify(devicePixelRatio, null, 2)}</pre>
</div>
