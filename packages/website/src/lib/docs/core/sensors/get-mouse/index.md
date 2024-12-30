---
slug: 'get-mouse'
title: 'getMouse'
description: 'Retrieves information about the mouse.'
category: 'sensors'
---

## Usage

```svelte
<script lang="ts">
	import { getMouse } from '@svelte-librarian/sv-use';

	const mouse = getMouse();
</script>

<span>x : {mouse.x}</span>
<span>y : {mouse.y}</span>
```
