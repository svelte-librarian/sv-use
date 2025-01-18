<script lang="ts">
	import { createEyeDropper } from '$sv-use/core';

	const eyeDropper = createEyeDropper();
</script>

<div class="relative flex w-full flex-col gap-2">
	{#if eyeDropper.isSupported}
		<p>
			Current value :
			<span style="color: {eyeDropper.current ?? '#000'}">{eyeDropper.current}</span>
		</p>
		<button onclick={() => eyeDropper.open()} class="bg-svelte rounded-md px-3 py-1 text-white">
			Open Eye Dropper
		</button>
	{:else}
		<p>Your browser doesn't support the Eye Dropper API :(</p>
	{/if}
</div>
