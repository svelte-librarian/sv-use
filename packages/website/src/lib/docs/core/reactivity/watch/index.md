---
slug: 'watch'
title: 'watch'
description: Triggers a callback when a dependency changes. Provides the previous value(s) as well as the current one(s) as parameters in the callback.
category: 'reactivity'
---

## Usage

You can watch changes on a single value :

```svelte
<script lang="ts">
	import { watch } from '@sv-use/core';

	let counter = $state(0);

	watch(
		() => counter,
		(curr, prev) => {
			console.log(`Went from ${prev} to ${curr}`);
		}
	);
</script>
```

Or on multiple values by supplying an array :

```svelte
<script lang="ts">
	import { watch } from '@sv-use/core';

	let counter = $state(0);
    let search = $state("");

	watch(
		[() => counter, () => search],
		([currCounter, currSearch], [prevCounter, prevSearch]) => {
			console.log(`Went from ${prev} to ${curr}`);
		}
	);
</script>
```

### onMount

By default, the callback runs when the component is first mounted in the DOM,
as well as when a dependency changes.

You might not want that and only run when a dependency changes. You can set
this in the options.

```svelte
<script lang="ts">
	import { watch } from '@sv-use/core';

	let counter = $state(0);

	watch(
		() => counter,
		(curr, prev) => {
			console.log(`Went from ${prev} to ${curr}`);
		},
        { runOnMounted: false } // Default is `true`
	);
</script>
```

## Caveats

There are some caveats to watch out for (no pun intended...) when using the
`watch` utility that are listed down below.

### Objects And Arrays

If you want to watch changes in objects or arrays, you must wrap the state
in `$state.snapshot`. This allows for tracking deep changes.

```svelte
<script lang="ts">
	import { watch } from '@sv-use/core';

	let counter = $state({ value: 0 });

	watch(
		() => $state.snapshot(counter),
		(curr, prev) => {
			console.log(`Went from ${prev} to ${curr}`);
		}
	);
</script>
```
