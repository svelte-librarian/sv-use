---
slug: 'debounced-state'
title: 'debouncedState'
description: 'A reactive state that updates its value after a delay.'
category: 'states'
---

## Usage

> [!TIP]
> If you'd rather have them separate, check out [debounce](/docs/reactivity/debounce).

```svelte
<script lang="ts">
	import { debouncedState } from '@sv-use/core';

	const search = debouncedState('', { delay: 1000 });
</script>
```
