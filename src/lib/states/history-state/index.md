---
slug: 'history-state'
title: 'historyState'
description: 'Tracks the change history of a given value. Provides undo and redo capabilities'
category: 'states'
---

## Usage

```svelte
<script lang="ts">
	import { historyState } from '@svelte-use/core';

	const incrementValue = $state(0);
	const counter = historyState(0);
</script>

<span>counter : {counter.current}</span>
<input bind:this={incrementValue} type="number" />
<button onclick={() => (counter.current += incrementValue)}>Apply counter change</button>
```
