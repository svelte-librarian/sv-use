---
category: Elements
---

# createDropZone

Creates a zone where files can be dropped.

## Usage

> [!IMPORTANT]
> Since it uses `$effect` internally, you must either call `createDropZone` in
> the component initialization lifecycle or call it inside `$effect.root`.

```svelte
<script>
	import { createDropZone } from '@sv-use/core';

	let container = $state();

	const dropZone = createDropZone(() => container, {
        allowedDataTypes: 'image/*',
        multiple: true,
        onDrop(files: File[] | null) {
            // Called when files are dropped in the drop zone
        }
    });
</script>

<div bind:this={container}>
    Drop images here
</div>
```
