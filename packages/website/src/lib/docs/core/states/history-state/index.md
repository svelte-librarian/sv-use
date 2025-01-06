---
slug: 'history-state'
title: 'historyState'
description: 'A reactive state that tracks its change history. Provides undo and redo capabilities as well as access to the histories.'
category: 'states'
---

# historyState

A reactive state that tracks its change history. Provides undo and redo
capabilities as well as access to the histories.

## Usage

> [!TIP]
> If you prefer to have them separate, check out [trackHistory](/sv-use/docs/core/reactivity/track-history).

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
