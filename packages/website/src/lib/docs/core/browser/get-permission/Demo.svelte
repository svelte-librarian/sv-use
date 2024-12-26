<script lang="ts">
	import { getPermission } from '$sv-use/core';

	const permission = getPermission('camera');
</script>

<div class="relative flex w-full flex-col gap-2">
	<span>Camera status</span>
	<pre>{JSON.stringify(permission, null, 2)}</pre>
</div>
