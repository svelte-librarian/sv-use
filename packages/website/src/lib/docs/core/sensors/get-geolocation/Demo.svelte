<script lang="ts">
	import { getGeolocation } from '$sv-use/core';

	const geolocation = getGeolocation();
</script>

<pre class="dark:text-zinc-200">{JSON.stringify(geolocation, null, 2)}</pre>
