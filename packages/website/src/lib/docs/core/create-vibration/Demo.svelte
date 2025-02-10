<script lang="ts">
	import { Button, Input } from '$lib/components/atoms/index.js';
	import { createVibration } from '$sv-use/core';

	let pattern = $state<VibratePattern>([300, 100, 300]);
	const vibration = createVibration({ pattern: () => pattern });

	function onchange(event: Event & { currentTarget: EventTarget & HTMLInputElement }) {
		pattern = event.currentTarget.value.split(',').map(Number);
	}
</script>

<div class="relative flex w-full flex-col gap-5">
	{#if vibration.isSupported}
		<p class="text-sm italic text-zinc-500 dark:text-zinc-400">
			Try changing the pattern. It must be a list of numbers separated by commas.
		</p>
		<Input value={pattern} {onchange} />
		<div class="relative flex w-full flex-col gap-2">
			<Button onclick={vibration.vibrate}>Vibrate</Button>
			<Button onclick={vibration.stop}>Stop</Button>
		</div>
	{:else}
		<p class="dark:text-zinc-200">Your browser doesn't support the Vibration API :(</p>
	{/if}
</div>
