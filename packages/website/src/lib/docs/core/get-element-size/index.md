---
category: elements
---

# getElementSize

Tracks the size of an element using the [Resize Observer API](https://developer.mozilla.org/en-US/docs/Web/API/ResizeObserver).

## Usage

> [!IMPORTANT]
> You can only use `getElementSize` in the component initialization lifecycle.

```svelte
<script>
	import { getElementSize } from '@sv-use/core';

	let el = $state();
	const size = getElementSize(() => el);
</script>

<textarea bind:this={el}></textarea>
```
