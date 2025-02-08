---
category: State
---

# sessionState

A state that is synced with session storage.

## Usage

```svelte
<script>
	import { sessionState } from '@sv-use/core';

	const counter = sessionState('counter', 0);
</script>

<span>counter : {counter.current}</span>
```
