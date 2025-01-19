# getLastChanged

Get the last time the reactive value changed. It is returned as a number in milliseconds.

## Usage

```svelte
<script lang="ts">
	import { getLastChanged } from '@sv-use/core';

	let value = $state(0);
	const lastChanged = getLastChanged(() => value);
</script>
```
