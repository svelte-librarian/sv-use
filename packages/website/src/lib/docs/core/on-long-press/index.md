---
category: Sensors
---

# onLongPress

Runs a callback when a long press occurs on a given element.

## Usage

```svelte
<script>
	import { onLongPress } from '@sv-use/core';

	let el = $state();

	onLongPress(() => el, (event) => {
        console.log('Long Press detected');
    });
</script>

<button bind:this={el}>Long press</button>
```
