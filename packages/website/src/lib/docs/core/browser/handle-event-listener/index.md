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
