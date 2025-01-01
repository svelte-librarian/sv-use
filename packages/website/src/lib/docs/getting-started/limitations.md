---
slug: "limitations"
title: Limitations
description: 'SvelteUse has some limitations that are listed below.'
---

## Destructuring

As stated in the [docs](https://svelte.dev/docs/svelte/$state#Deep-state), you
cannot destructure a reactive value because it loses its
reactivity.

So, instead of doing this :

```svelte
<script lang="ts">
	import { localState } from '@sv-use/core';

	const { current } = localState('counter', 0);
</script>

<span>counter : {current}</span>
```

Do this :

```svelte
<script lang="ts">
	import { localState } from '@sv-use/core';

	const counter = localState('counter', 0);
</script>

<span>counter : {counter.current}</span>
```
