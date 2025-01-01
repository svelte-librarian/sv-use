---
slug: 'track-history'
title: 'trackHistory'
description: 'Tracks the change history of a reactive value. Provides undo and redo capabilities as well as access to the histories.'
category: 'reactivity'
---

## Usage

> [!TIP]
> If you prefer to have them combined, check out [historyState](/sv-use/docs/states/history-state).

```svelte
<script lang="ts">
	import { trackHistory } from '$sv-use/core';

	let counter = $state(0);
	const counterHistory = trackHistory(
		() => counter,
		(v) => (counter = v)
	);
</script>
```
