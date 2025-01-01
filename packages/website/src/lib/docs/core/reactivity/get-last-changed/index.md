---
slug: 'get-last-changed'
title: 'getLastChanged'
description: 'Get the last time the reactive value changed. It is returned as a number in milliseconds.'
category: 'reactivity'
---

## Usage

```svelte
<script lang="ts">
	import { getLastChanged } from '@sv-use/core';

	let value = $state(0);
	const lastChanged = getLastChanged(() => value);
</script>

<div>
	<span>Value : {value}</span>
	<span>Last changed : {lastChanged.current}</span>
</div>
```
