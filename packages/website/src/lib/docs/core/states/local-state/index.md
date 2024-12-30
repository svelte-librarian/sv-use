---
slug: 'local-state'
title: 'localState'
description: 'A state that is synced with local storage.'
category: 'states'
---

## Usage

```svelte
<script>
	import { localState } from '@svelte-librarian/sv-use';

	const counter = localState('counter', 0);
</script>

<span>counter : {counter}</span>
```
