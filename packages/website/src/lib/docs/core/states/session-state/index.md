---
slug: 'session-state'
title: 'sessionState'
description: 'A state that is synced with session storage.'
category: 'states'
---

## Usage

```svelte
<script>
	import { sessionState } from '@svelte-librarian/sv-use';

	const counter = sessionState('counter', 0);
</script>

<span>counter : {counter}</span>
```
