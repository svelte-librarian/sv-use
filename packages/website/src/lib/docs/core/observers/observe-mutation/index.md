# observeMutation

Watch for changes being made to the DOM tree.

## Usage

```svelte
<script>
	import { observeMutation } from '@sv-use/core';

	let el = $state();

	observeMutation(() => el, (mutations) => {
        console.log(mutations[0]);
    });
</script>

<div bind:this={el}></div>
```
