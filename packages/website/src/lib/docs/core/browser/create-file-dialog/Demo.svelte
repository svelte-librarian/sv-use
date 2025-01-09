<script lang="ts">
	import { createFileDialog } from '$sv-use/core';
	import Button from '$ui/Button.svelte';

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
	<Button onclick={dialog.open}>Open file dialog</Button>
	<Button onclick={dialog.reset} disabled={dialog.files.length === 0}>Reset</Button>
	<div class="flex flex-col gap-5">
		<span>Selected Files ({dialog.files.length})</span>
		<ul>
			{#each dialog.files as file (file.name)}
				<li>{file.name}</li>
			{:else}
				<p class="italic">Empty...</p>
			{/each}
		</ul>
	</div>
</div>
