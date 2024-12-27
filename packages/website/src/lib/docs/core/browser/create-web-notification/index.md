---
slug: 'create-web-notification'
title: 'createWebNotification'
description: 'Configure and display desktop notifications to the user.'
category: 'browser'
---

## Usage

```svelte
<script lang="ts">
	import { createWebNotification } from '@sv-use/core';

	const notification = createWebNotification();
</script>

<button onclick={() => notification.show()}>Show notification</button>
```
