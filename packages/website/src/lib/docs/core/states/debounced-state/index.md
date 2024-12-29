---
slug: 'debounced-state'
title: 'debouncedState'
description: 'A reactive state that updates its value after a delay.'
category: 'states'
---

## Usage

```svelte
<script lang="ts">
	import { debouncedState } from '@sv-use/core';

	const search = debouncedState('', { delay: 1000 });
</script>
```
