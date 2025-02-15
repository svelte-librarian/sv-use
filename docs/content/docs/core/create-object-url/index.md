---
category: browser
---

# createObjectUrl

Creates a reactive URL representing the given object.

Automatically releases the URL when the object changes or the component is
unmounted.

## Usage

> [!NOTE]
> It uses `$effect`.

```svelte
<script lang="ts">
    import { createObjectUrl } from '@sv-use/core';

    // Get a file in some way
    // e.g. a dropzone, a cdn, etc.
    const file = $state<File | null>(null);
    const url = createObjectUrl(() => file);
</script>

<a href={url.current} download>
    Upload file
</a>
```
