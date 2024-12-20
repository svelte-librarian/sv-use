---
slug: 'create-draggable'
title: 'createDraggable'
description: 'Creates a draggable element.'
category: 'elements'
---

## Usage

```svelte
<script lang="ts">
	import { createDraggable } from '@svelte-use/core';

	const draggable = createDraggable();
</script>

<div bind:this={draggable.current} style={draggable.style} class="container">
	<span>drag me !</span>
	<span>x : {draggable.x} | y : {draggable.y}</span>
</div>

<style>
	.container {
		width: 100px;
		height: 100px;
		background-color: green;
	}
</style>
```
