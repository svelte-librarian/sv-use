<script lang="ts">
	import { getMousePressed } from '@sv-use/core';

	const mousePressed = getMousePressed();
</script>

<div class="relative flex w-full flex-col gap-2 dark:text-zinc-200">
	<p class="text-sm italic text-zinc-500 dark:text-zinc-400">Click anywhere in the document</p>
	<pre>{JSON.stringify(mousePressed, null, 2)}</pre>
</div>
