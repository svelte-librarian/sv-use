<script lang="ts">
	import { handleWakeLock } from '$sv-use/core';

	const wakeLock = handleWakeLock();

	function onclick() {
		return wakeLock.isActive ? wakeLock.release() : wakeLock.request('screen');
	}
</script>

<div class="relative flex w-full flex-col gap-2">
	{#if wakeLock.isSupported}
		<p class="dark:text-zinc-200">Is Active: {wakeLock.isActive}</p>
		<button {onclick} class="bg-svelte dark:bg-darksvelte rounded-md px-3 py-1 text-white">
			{wakeLock.isActive ? 'Deactivate' : 'Activate'}
		</button>
	{:else}
		<p class="dark:text-zinc-200">Your browser doesn't support the Screen Wake Lock API :(</p>
	{/if}
</div>
