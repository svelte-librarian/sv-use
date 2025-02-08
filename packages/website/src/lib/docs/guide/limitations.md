# Limitations

SvelteUse has some limitations concerning its usage that are listed below.

These limitations are related to how Svelte handles reactivity.

## Destructuring

As stated in the [docs](https://svelte.dev/docs/svelte/$state#Deep-state), you
cannot destructure a reactive value because it loses its
reactivity.

So, instead of doing this :

```svelte
<script>
	import { localState } from '@sv-use/core';

	const { current } = localState('counter', 0);
</script>

<span>counter : {current}</span>
```

Do this :

```svelte
<script>
	import { localState } from '@sv-use/core';

	const counter = localState('counter', 0);
</script>

<span>counter : {counter.current}</span>
```

## Passing a state as parameter (read)

If you pass a state as parameter of a function when that state is declared in
the same scope as the function call, Svelte will complain with [a warning](https://svelte.dev/docs/svelte/compiler-warnings#state_referenced_locally).

```txt
State referenced in its own scope will never update. Did you mean to reference it inside a closure?
```

To avoid this, you have to pass a getter function :

```svelte
<!-- Incorrect -->
<script>
	import { getLastChanged } from '@sv-use/core';

	let value = $state(0);
	const lastChanged = getLastChanged(value); // Svelte warning here
</script>

<!-- Correct -->
<script>
	import { getLastChanged } from '@sv-use/core';

	let value = $state(0);
	const lastChanged = getLastChanged(() => value); // No warnings :D
</script>
```

## Passing a state as parameter (write)

If you are passing a state as parameter of a function and the function needs
to modify the state, you will need to pass a setter function that receives
the new value as the only parameter in the callback function.

As an example, [trackHistory](/sv-use/docs/core/reactivity/track-history) is a
utility that tracks the history of a given state with undo/redo capabilities.
However, to undo/redo, the value of the state must be modified. This is where
the setter function comes into play.

```svelte
<script>
	import { trackHistory } from '@sv-use/core';

	let counter = $state(0);
	const counterHistory = trackHistory(
        // Getter function to retrieve the value
		() => counter,
        // Setter function to set the value    
		(v) => (counter = v)
	);
</script>
```
