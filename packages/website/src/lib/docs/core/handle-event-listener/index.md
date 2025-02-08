---
category: Browser
---

# handleEventListener

Convenience wrapper for event listeners.

## Usage

```svelte
<script>
	import { handleEventListener } from '@sv-use/core';

	handleEventListener('click', () => {
        console.log('clicked')
    });
</script>
```
