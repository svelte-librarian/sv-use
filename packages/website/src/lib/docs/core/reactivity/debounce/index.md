# debounce

Debounces the update of the value after a delay.

## Usage

> [!TIP]
> If you'd rather have them combined in one variable, check out [debouncedState](/sv-use/docs/core/states/debounced-state).

```svelte
<script>
	import { debounce } from '@sv-use/core';

	let search = $state('');
	const debouncedSearch = debounce(() => search);
</script>
```
