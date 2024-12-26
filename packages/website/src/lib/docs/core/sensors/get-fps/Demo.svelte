<script lang="ts">
	import { getFps } from '$sv-use/core';

	const fps = getFps();
</script>

<span>fps : {fps.current}</span>
