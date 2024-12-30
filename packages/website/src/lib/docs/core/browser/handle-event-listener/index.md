---
slug: 'handle-event-listener'
title: 'handleEventListener'
description: 'Handles the mounting and unmounting of an event listener.'
category: 'browser'
---

## Usage

```svelte
<script lang="ts">
	import { handleEventListener } from '@svelte-librarian/sv-use';

	handleEventListener('click', () => console.log('clicked'), { autoMountAndCleanup: true });
</script>
```

```svelte
<script lang="ts">
	import { onMount } from 'svelte';
	import { handleEventListener } from '@svelte-librarian/sv-use';

	onMount(() => {
		const cleanup = handleEventListener('click', () => console.log('clicked'));

		return () => {
			cleanup();
			console.log('cleanup');
		};
	});
</script>
```
