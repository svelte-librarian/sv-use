# onHover

Tracks whether the given element is hovered or not.

You can also pass a callback that is called when the element is being hovered.

## Usage

```svelte
<script>
	import { onHover } from '@sv-use/core';

	let el = $state();

	const isHovering = onHover(() => el, () => {
        console.log("element is hovered");
    });
</script>

<div bind:this={el}>hover me</div>
```
