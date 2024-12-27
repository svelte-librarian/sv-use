<script lang="ts">
	import { createWebNotification } from '$sv-use/core';

	const notification = createWebNotification({
		title: 'Hello from SvelteUse! 🎉',
		body: "This is a notification created with SvelteUse's `createWebNotification` function."
	});
</script>

<div class="flex flex-col gap-5">
	{#if notification.isSupported}
		<span>Permission granted : {notification.isPermissionGranted}</span>
		<button onclick={() => notification.show()} class="bg-svelte rounded-md px-3 py-1 text-white">
			Show notification
		</button>
	{:else}
		<p>Your browser doesn't support the Web Notifications API...</p>
	{/if}
</div>
