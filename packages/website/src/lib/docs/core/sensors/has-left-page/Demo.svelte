<script lang="ts">
	import { hasLeftPage } from '$sv-use/core';

	const hasLeft = hasLeftPage();
</script>

<span>Has left page : {hasLeft.current}</span>
