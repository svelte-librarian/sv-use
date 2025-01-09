<script lang="ts">
	import { getClipboardText } from '$sv-use/core';
	import Button from '$ui/Button.svelte';
	import Input from '$ui/Input.svelte';

	let inputValue = $state('');
	const clipboard = getClipboardText({ allowRead: true, legacyCopy: true });
</script>

<div class="relative flex w-full flex-col gap-2">
	{#if clipboard.isSupported}
		<span>Currently copied : {clipboard.text}</span>
		<Input type="text" bind:value={inputValue} />
		<Button onclick={() => clipboard.copyText(inputValue)}>Copy</Button>
	{:else}
		<span>Your browser doesn't support the Clipboard API...</span>
	{/if}
</div>
