---
category: sensors
---

# getScrollbarWidth

Gets the scrollbar width of an element.

This works in browsers that do not use absolute positioning for scrollbars,
such as Chrome on desktop.

## Usage

```svelte
<script>
    import { getScrollbarWidth } from '@sv-use/core';

    let el = $state();
    const width = getScrollbarWidth(() => el);
</script>

<div bind:this={el} style="overflow-y: scroll"></div>
```
