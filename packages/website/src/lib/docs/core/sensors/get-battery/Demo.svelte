<script lang="ts">
	import { getBattery } from '$sv-use/core';
	import Pre from '$ui/Pre.svelte';

	const battery = getBattery();
</script>

<div class="relative flex w-full flex-col gap-2">
	<Pre code={battery} />
</div>
