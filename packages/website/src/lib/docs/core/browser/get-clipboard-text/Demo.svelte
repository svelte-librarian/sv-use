<script lang="ts">
	import { getClipboardText } from '$sv-use/core';

	let inputValue = $state('');
	const clipboard = getClipboardText({ allowRead: true, legacyCopy: true });
</script>

<div class="relative flex w-full flex-col gap-2">
	{#if clipboard.isSupported}
		<span>Currently copied : {clipboard.text}</span>
		<input
			type="text"
			bind:value={inputValue}
			class="rounded-md border border-zinc-300 px-3 py-2 text-sm"
		/>
		<button
			onclick={() => clipboard.copyText(inputValue)}
			class="rounded-md bg-svelte px-3 py-1 text-white"
		>
			Copy
		</button>
	{:else}
		<span>Your browser doesn't support the Clipboard API...</span>
	{/if}
</div>
