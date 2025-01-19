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
