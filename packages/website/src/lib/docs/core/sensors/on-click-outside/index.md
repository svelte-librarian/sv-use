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

### Cleanup

Since `onClickOutside` uses event handlers to handle clicks, it must cleanup
afterwards. You can either clean it automatically (it runs in `onDestroy`
lifecycle) :

```svelte
<script lang="ts">
	import { onClickOutside } from '@sv-use/core';

	let divNode = $state<HTMLDivElement>();

	onClickOutside(() => divNode, (event) => {
        console.log('outside');
    }, { autoCleanup: true });
</script>
```

Or manually (for example, in `onMount`) :

```svelte
<script lang="ts">
	import { onClickOutside } from '@sv-use/core';

	let divNode = $state<HTMLDivElement>();

    onMount(() => {
        const cleanup = onClickOutside(() => divNode, (event) => {
            console.log('outside');
        });

        return () => {
            cleanup();
        }
    });
</script>
```
