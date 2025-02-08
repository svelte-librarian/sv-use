---
category: State
---

# localState

A state that is synced with local storage.

## Usage

```svelte
<script>
	import { localState } from '@sv-use/core';

	const counter = localState('counter', 0);
</script>

<span>counter : {counter.current}</span>
```
