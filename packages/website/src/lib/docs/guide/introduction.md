# Introduction

SvelteUse is a collection of Svelte 5 utilities based on [runes](https://svelte.dev/docs/svelte/what-are-runes).
It is assumed that you are at least somewhat familiar with the runes system.

You can use it with SvelteKit and with Svelte-only apps as it doesn't rely on
Sveltekit-specific features.

## Installation

```bash
npm install @sv-use/core
```

## Usage

> [!TIP]
> Refer to the documentation of each function to see how to use it and examples.

You can simply import the utility you need from `@sv-use/core` and use it.

An example using a state that is persisted via local storage :

```svelte
<script>
	import { localState } from '@sv-use/core';

	const counter = localState('counter', 0);
</script>

<span>counter : {counter.current}</span>
```

## Best Practices

### Cleanup

Some utilities produce side-effects, such as invoking an event listener. By
default, they are automatically cleaned up in an `onDestroy` hook.

However, this requires the function to be called in the component
initialization lifecycle.

To opt out of this, every utility that produces a side-effect returns a cleanup
function that can be used to clean it manually.

Here is an example using [handleEventListener](/sv-use/docs/core/browser/handle-event-listener) :

```svelte
<script>
	import { handleEventListener } from '@sv-use/core';

    // Automatic cleanup
	handleEventListener('click', () => console.log('clicked'));
</script>
```

And how to cleanup manually :

```svelte
<script>
	import { handleEventListener } from '@sv-use/core';

	const cleanup = handleEventListener('click', () => {
        console.log('clicked');
    }, { autoCleanup: false });

    // ...

    // Manual cleanp
    cleanup();
</script>
```
