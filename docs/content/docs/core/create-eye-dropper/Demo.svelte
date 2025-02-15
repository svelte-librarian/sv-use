<script lang="ts">
	import { Button } from '$lib/components/atoms/index.js';
	import { createEyeDropper } from '@sv-use/core';

	const eyeDropper = createEyeDropper();
</script>

<div class="relative flex w-full flex-col gap-2">
	{#if eyeDropper.isSupported}
		<p>
			Current value :
			<span style="color: {eyeDropper.current ?? '#000'}">{eyeDropper.current}</span>
		</p>
		<Button onclick={() => eyeDropper.open()}>Open Eye Dropper</Button>
	{:else}
		<p class="dark:text-zinc-200">Your browser doesn't support the Eye Dropper API :(</p>
	{/if}
</div>
