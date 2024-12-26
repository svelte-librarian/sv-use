---
slug: "get-clipboard-text"
title: "getClipboardText"
description: "Provides write (and optionally read) access to the text clipboard."
category: "browser"
---

## Usage

Set `options.legacyCopy: true` to keep the ability to copy if the [Clipboard API](https://developer.mozilla.org/en-US/docs/Web/API/Clipboard_API) is not available. It will handle copy with [document.execCommand](https://developer.mozilla.org/en-US/docs/Web/API/Document/execCommand) as the fallback.

```svelte
<script lang="ts">
	import { getClipboardText } from '@sv-use/core';

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
```
