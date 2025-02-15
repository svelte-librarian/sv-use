<script lang="ts">
	import { getMouse } from '$sv-use/core';

	const mouse = getMouse();
</script>

<div class="relative flex w-full flex-col gap-2 dark:text-zinc-200">
	<p>x : {mouse.x}</p>
	<p>y : {mouse.y}</p>
</div>
