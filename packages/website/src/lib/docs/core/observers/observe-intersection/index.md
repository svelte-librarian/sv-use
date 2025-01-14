# observeIntersection

Runs a callback when the targets are visible on the screen.

## Usage

```svelte
<script>
    import { observeIntersection } from "@sv-use/core";

    let divNode = $state();
    let isVisible = $state(false);

    observeIntersection(
        () => divNode,
        ([entry], _mutationObserver) => {
            isVisible = entry?.isIntersecting || false;
        }
    );
</script>

<div class="relative w-full h-[200%]">
    <div bind:this={divNode}>
        i'm the target element
    </div>
</div>
```

### Pausing

You can pause the observer by using `observer.pause` and resume it by using
`observer.resume`.

### Cleanup

`observer.pause`, which is used for [pausing](#pausing), can also be used for
cleanup.

```svelte
<script>
    import { observeIntersection } from "@sv-use/core";

    const observer = observeIntersection(() => divNode, ...);

    onDestroy(() => {
        observer.pause();
    });
</script>
```
