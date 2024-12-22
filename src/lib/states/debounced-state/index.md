---
slug: 'debounced-state'
title: 'debouncedState'
description: "Debounce the execution of a state's value."
category: 'states'
---

## Usage

```svelte
<script lang="ts">
	import { debouncedState } from 'svelte-use/reactivity';

	const search = $state('');
	const debouncedState = debouncedState(search);
</script>
```
