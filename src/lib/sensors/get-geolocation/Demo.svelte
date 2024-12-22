<script lang="ts">
	import { getGeolocation } from './index.svelte.js';

	const geolocation = getGeolocation();
</script>

<div class="relative flex w-full flex-col gap-2">
	<pre>{JSON.stringify(
			{ ...geolocation, error: geolocation.error?.message ?? null },
			null,
			2
		)}</pre>
</div>
