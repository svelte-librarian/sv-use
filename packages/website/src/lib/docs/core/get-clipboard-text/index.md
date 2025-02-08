---
category: Browser
---

# getClipboardText

Provides write (and optionally read) access to the text clipboard.

## Usage

Set `options.legacyCopy: true` to keep the ability to copy if the [Clipboard API](https://developer.mozilla.org/en-US/docs/Web/API/Clipboard_API) is not available. It will handle copy with [document.execCommand](https://developer.mozilla.org/en-US/docs/Web/API/Document/execCommand) as the fallback.

```svelte
<script>
	import { getClipboardText } from '@sv-use/core';

	const clipboard = getClipboardText({
        allowRead: true,
        legacyCopy: true
    });
</script>
```

## Examples

```svelte
<script>
	import { getClipboardText } from '@sv-use/core';

	let inputValue = $state('');
	const clipboard = getClipboardText({
        allowRead: true,
        legacyCopy: true
    });
</script>

<div>
    <span>Currently copied : {clipboard.text}</span>
    <input type="text" bind:value={inputValue} />
    <button onclick={() => clipboard.copyText(inputValue)}>
        Copy text from input
    </button>
</div>
```
