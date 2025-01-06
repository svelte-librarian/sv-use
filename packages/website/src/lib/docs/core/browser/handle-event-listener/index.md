# handleEventListener

Handles the mounting (and, optionally, unmounting) of an event listener.

## Usage

```svelte
<script lang="ts">
	import { handleEventListener } from '@sv-use/core';

	handleEventListener('click', () => console.log('clicked'), { autoMountAndCleanup: true });
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
