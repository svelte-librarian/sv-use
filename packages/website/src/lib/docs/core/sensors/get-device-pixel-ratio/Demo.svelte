<script lang="ts">
	import { getDevicePixelRatio } from '$sv-use/core';

	const devicePixelRatio = getDevicePixelRatio();
</script>

<pre class="dark:text-zinc-200">{JSON.stringify(devicePixelRatio, null, 2)}</pre>
