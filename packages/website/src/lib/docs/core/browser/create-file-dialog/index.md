# createFileDialog

Creates a file dialog to interact with programatically. Provides access to the
files that are currently held.

## Usage

```svelte
<script lang="ts">
	import { createFileDialog } from '@sv-use/core';

	const dialog = createFileDialog();
</script>
```

### Examples

```svelte
<script lang="ts">
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

<div class="relative flex w-full flex-col gap-2">
	<button onclick={dialog.open} class="rounded-md bg-svelte px-3 py-1 text-white">
		Open file dialog
	</button>
	<button
		onclick={dialog.reset}
		disabled={dialog.files.length === 0}
		class="rounded-md bg-svelte px-3 py-1 text-white disabled:cursor-not-allowed disabled:opacity-50"
	>
		Reset
	</button>
	<div class="flex flex-col gap-5">
		Selected Files ({dialog.files.length})
		<ul>
			{#each dialog.files as file (file.name)}
				<li>{file.name}</li>
			{:else}
				<p class="italic">Empty...</p>
			{/each}
		</ul>
	</div>
</div>
```
