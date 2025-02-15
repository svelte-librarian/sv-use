<script lang="ts">
	import { getNetwork } from '@sv-use/core';

	const network = getNetwork();
</script>

<pre class="dark:text-zinc-200">{JSON.stringify(network, null, 2)}</pre>
