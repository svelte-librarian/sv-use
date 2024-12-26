<script lang="ts">
	import { getNetwork } from '$sv-use/core';

	const network = getNetwork();
</script>

<div class="relative flex w-full flex-col gap-2">
	<pre>{JSON.stringify(network, null, 2)}</pre>
</div>
