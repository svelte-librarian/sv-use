<script lang="ts">
	import { getDeviceOrientation } from './index.svelte.js';

	const deviceOrientation = getDeviceOrientation();
</script>

<div class="relative flex w-full flex-col gap-2">
	<pre>{JSON.stringify(deviceOrientation, null, 2)}</pre>
</div>
