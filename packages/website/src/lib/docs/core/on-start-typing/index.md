---
category: sensors
---

# onStartTyping

Fires when users start typing on non-editable elements.

## Usage

```svelte
<script>
	import { onStartTyping } from '@sv-use/core';

	let input = $state();

	onStartTyping(() => {
		if (input !== document.activeElement) {
			input?.focus();
		}
	});
</script>

<input bind:this={input} type="text" />
```
