---
slug: 'get-last-changed'
title: 'getLastChanged'
description: ''
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
