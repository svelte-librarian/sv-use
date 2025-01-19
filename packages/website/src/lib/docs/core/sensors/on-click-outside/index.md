# onClickOutside

Runs a callback when a click occurs outside the target element.

## Usage

```svelte
<script lang="ts">
	import { onClickOutside } from '@sv-use/core';

	let divNode = $state<HTMLDivElement>();

	onClickOutside(() => divNode, (event) => {
        console.log('outside');
    });
</script>

<div bind:this={divNode}>
    i'm the target element
</div>
<p>i'm outside the target element</p>
```
