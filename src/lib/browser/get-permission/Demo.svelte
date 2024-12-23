<script lang="ts">
	import { getPermission } from './index.svelte.js';

	const permission = getPermission('camera');
</script>

<div class="relative flex w-full flex-col gap-2">
	<span>Camera status</span>
	<pre>{JSON.stringify(permission, null, 2)}</pre>
</div>
