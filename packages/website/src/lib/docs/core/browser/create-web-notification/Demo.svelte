<script lang="ts">
	import { createWebNotification } from '$sv-use/core';
	import Button from '$ui/Button.svelte';

	const notification = createWebNotification({
		title: 'Hello from SvelteUse! 🎉',
		body: "This is a notification created with SvelteUse's `createWebNotification` function."
	});
</script>

<div class="flex flex-col gap-5">
	{#if notification.isSupported}
		<span>Permission granted : {notification.isPermissionGranted}</span>
		<Button onclick={notification.show}>Show notification</Button>
	{:else}
		<p>Your browser doesn't support the Web Notifications API...</p>
	{/if}
</div>
