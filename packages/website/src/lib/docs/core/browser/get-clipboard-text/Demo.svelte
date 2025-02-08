<script lang="ts">
	import { Button, Input } from '$lib/components/atoms/index.js';
	import { getClipboardText } from '$sv-use/core';

	let inputValue = $state('');
	const clipboard = getClipboardText({ allowRead: true, legacyCopy: true });
</script>

<div class="relative flex w-full flex-col gap-2 dark:text-zinc-200">
	{#if clipboard.isSupported}
		<span>Currently copied : {clipboard.text}</span>
		<Input bind:value={inputValue} />
		<Button onclick={() => clipboard.copyText(inputValue)}>Copy</Button>
	{:else}
		<span>Your browser doesn't support the Clipboard API...</span>
	{/if}
</div>
