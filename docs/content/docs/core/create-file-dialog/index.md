---
category: browser
---

# createFileDialog

Creates a file dialog to interact with programatically.

## Usage

```svelte
<script>
	import { createFileDialog } from '@sv-use/core';

	const dialog = createFileDialog();
</script>
```

### Examples

```svelte
<script>
	import { createFileDialog } from '@sv-use/core';

	const dialog = createFileDialog({
		accept: 'image/*',
		multiple: true,
		onChange(files) {
			console.log($state.snapshot(files));
		},
		onCancel() {
			console.log('cancelled');
		}
	});
</script>

<button onclick={dialog.open}>
    Open file dialog
</button>
<button
    onclick={dialog.reset}
    disabled={dialog.files.length === 0}
>
    Reset
</button>
<div class="flex flex-col gap-5">
    <span>Selected Files ({dialog.files.length})</span>
    {#if dialog.files}
        <ul>
            {#each dialog.files as file (file.name)}
                <li>{file.name}</li>
            {/each}
        </ul>
    {:else}
        <p>No files detected</p>
    {/if}
</div>
```
