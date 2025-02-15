<script lang="ts">
	import { hasLeftPage } from '@sv-use/core';

	const hasLeft = hasLeftPage();
</script>

<p class="dark:text-zinc-200">Has left page : {hasLeft.current}</p>
