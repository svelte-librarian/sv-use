# watch

Triggers a callback when a dependency changes.

Provides the previous value(s) as well as the current one(s) as parameters in the callback.

## Usage

You can watch changes on a single value :

```svelte
<script>
	import { watch } from '@sv-use/core';

	let counter = $state(0);

	watch(() => counter, (curr, prev) => {
        console.log(`Went from ${prev} to ${curr}`);
    });
</script>
```

Or on multiple values by supplying an array :

```svelte
<script>
	import { watch } from '@sv-use/core';

	let counter = $state(0);
    let search = $state("");

	watch(
        [() => counter, () => search],
        ([currCounter, currSearch], [prevCounter, prevSearch]) => {
            // ...
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
<script>
	import { watch } from '@sv-use/core';

	let counter = $state(0);

	watch(() => counter, (curr, prev) => {
        console.log(`Went from ${prev} to ${curr}`);
    }, { runOnMounted: false });
</script>
```
