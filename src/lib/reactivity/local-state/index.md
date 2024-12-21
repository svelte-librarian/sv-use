---
slug: 'local-state'
title: 'localState'
description: 'A state that is synced with local storage.'
category: 'reactivity'
---

## Usage

```svelte
<script>
	import { localState } from '@svelte-use/core';

	const counter = localState('counter', 0);
</script>

<span>counter : {counter}</span>
```
