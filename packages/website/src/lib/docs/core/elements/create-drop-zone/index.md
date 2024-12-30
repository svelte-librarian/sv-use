---
slug: 'create-drop-zone'
title: 'createDropZone'
description: 'Creates a new drop zone for files.'
category: 'elements'
---

## Usage

```svelte
<script lang="ts">
	import { createDropZone } from '@svelte-librarian/sv-use';

	const dropZone = createDropZone();
</script>

<div bind:this={dropZone.current}>
	<span>drop files on me</span>
	<span>something is over me : {dropZone.isOver}</span>
	<span>i'm holding some files : {dropZone.files.map((file) => file.name).join(', ')}</span>
</div>

<style>
	.container {
		width: 100px;
		height: 100px;
		background-color: green;
	}
</style>
```
