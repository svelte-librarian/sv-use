---
slug: 'history-state'
title: 'historyState'
description: 'A reactive state that allows for undo and redo operations by tracking the change history.'
category: 'states'
---

## Usage

```svelte
<script lang="ts">
	import { historyState } from '@sv-use/core';

	const counter = historyState(0);
</script>
```

## Examples

```svelte
<script lang="ts">
	import { historyState } from '@sv-use/core';

	const counter = historyState(0);
</script>

<span>counter : {counter.current}</span>
<span>change history : {JSON.stringify(counter.history, null, 2)}</span>
<button onclick={() => counter.current++}> Increment </button>
<button onclick={() => counter.current--}> Decrement </button>
```
