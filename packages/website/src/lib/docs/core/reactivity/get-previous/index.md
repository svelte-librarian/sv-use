# getPrevious

A reactive state of a given state's previous value.

It is set to `undefined` until the first change if `initial` is not set.

## Usage

> [!TIP]
> If you only care about the previous value when the value changes, you can use [watch](/sv-use/docs/core/lifecycle/watch).  
>  
> It supplies the previous value in the callback.

```svelte
<script lang="ts">
	import { getPrevious } from '@sv-use/core';

	let counter = $state(0);
	let previousCounter = getPrevious(() => counter);
</script>
```
