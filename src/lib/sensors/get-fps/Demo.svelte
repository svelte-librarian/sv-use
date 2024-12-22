<script lang="ts">
	import { getFps } from './index.svelte.js';

	const fps = getFps();
</script>

<span>fps : {fps.current}</span>
