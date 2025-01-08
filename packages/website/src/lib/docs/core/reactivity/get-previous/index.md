# getPrevious

A reactive state of a given state's previous value. It is set to `undefined` until the first change if `initial` is not set.

## Usage

> [!TIP]
> If you only want the previous value when the value changes, you can use [watch](/sv-use/docs/core/reactivity/watch).  
>  
> It supplies the previous value in the callback.

### Without initial value

```svelte
<script lang="ts">
	import { getPrevious } from '@sv-use/core';

	let counter = $state(0);
	let previousCounter = getPrevious(() => counter);
</script>
```

### With initial value

```svelte
<script lang="ts">
	import { getPrevious } from '@sv-use/core';

	let counter = $state(0);
	let previousCounter = getPrevious(() => counter, -1);
</script>
```
