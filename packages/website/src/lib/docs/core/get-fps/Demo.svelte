<script lang="ts">
	import { getFps } from '$sv-use/core';

	const fps = getFps();
</script>

<p class="dark:text-zinc-200">Current FPS : {fps.current}</p>
