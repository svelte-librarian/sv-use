---
slug: "debounce"
title: "debounce"
description: "Debounces the update of the value after a delay."
category: "reactivity"
---

## Usage

> [!TIP]
> If you'd rather have them combined in one variable, check out [debouncedState](/docs/states/debounced-state).

```svelte
<script lang="ts">
	import { debounce } from '@sv-use/core';

	let search = $state('');
	const debouncedSearch = debounce(() => search);
</script>
```
