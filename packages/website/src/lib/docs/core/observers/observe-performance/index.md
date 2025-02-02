# observePerformance

Observes performance metrics.

The observer callback is invoked when performance entry events are recorded for
the entry types that have been registered.

## Usage

```svelte
<script>
	import { observePerformance } from '@sv-use/core';

	observePerformance((list) => {
        console.log(list.getEntries());
    }, { entryTypes: ['paint'] });
</script>
```
