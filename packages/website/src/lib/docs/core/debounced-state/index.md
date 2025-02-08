---
category: state
---

# debouncedState

A reactive state that updates its value after a delay.

## Usage

> [!TIP]
> If you'd rather have them separate, check out [debounce](/sv-use/docs/core/debounce).

```svelte
<script>
	import { debouncedState } from '@sv-use/core';

	const search = debouncedState('', { delay: 1000 });
</script>
```
