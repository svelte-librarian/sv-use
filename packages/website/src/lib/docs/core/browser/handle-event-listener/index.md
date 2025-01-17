# handleEventListener

Convenience wrapper for event listeners.

Handles mounting and unmounting automatically, unless `options.autoCleanup` is
set to `false`, in which case the cleanup will have to be done manually.

## Usage

```svelte
<script lang="ts">
	import { handleEventListener } from '@sv-use/core';

	handleEventListener('click', () => console.log('clicked'));
</script>
```

```svelte
<script lang="ts">
	import { onMount } from 'svelte';
	import { handleEventListener } from '@sv-use/core';

	onMount(() => {
		const cleanup = handleEventListener('click', () => console.log('clicked'));

		return () => {
			cleanup();
			console.log('cleanup');
		};
	});
</script>
```
