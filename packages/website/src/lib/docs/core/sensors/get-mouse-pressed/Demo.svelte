<script lang="ts">
	import { getMousePressed } from '$sv-use/core';

	const mousePressed = getMousePressed();
</script>

<div class="relative flex w-full flex-col gap-2">
	<span>{JSON.stringify(mousePressed, null, 2)}</span>
	<span>Click anywhere in the document</span>
</div>
