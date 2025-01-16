# observeResize

Watch for changes to the dimensions of a given element's content or its border-box.

It can also watch multiple elements if given an array of elements.

## Usage

```svelte
<script>
	import { observeResize } from '@sv-use/core';

	let el = $state();

	observeResize(
		() => el,
		(entries) => {
			const { width, height } = entries[0].contentRect;
            console.log(`New width : ${width} | New height : ${height}`);
		}
	);
</script>

<textarea bind:this={el} style="resize: both;"></textarea>
```
