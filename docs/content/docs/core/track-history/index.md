---
category: reactivity
---

# trackHistory

Tracks the change history of a reactive value. Provides undo and redo
capabilities as well as access to the histories.

## Usage

> [!TIP]
> If you prefer to have them combined, check out [historyState](/docs/core/history-state).

```svelte
<script>
	import { trackHistory } from '@sv-use/core';

	let counter = $state(0);
	const counterHistory = trackHistory(
		() => counter,
		(v) => (counter = v)
	);
</script>
```
