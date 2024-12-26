<script lang="ts">
	import { getMouse } from '$sv-use/core';

	const mouse = getMouse();
</script>

<div class="relative flex w-full flex-col gap-2">
	<span>x : {mouse.x}</span>
	<span>y : {mouse.y}</span>
</div>
