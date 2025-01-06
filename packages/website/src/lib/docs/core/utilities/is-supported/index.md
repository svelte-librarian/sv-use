---
slug: 'is-supported'
title: 'isSupported'
description: 'Checks whether a browser feature is supported or not. Is false in non-browser environment.'
category: 'utilities'
---

# isSupported

Checks whether a browser feature is supported or not. Is false in non-browser
environment.

## Usage

```svelte
<script lang="ts">
	import { isSupported } from '@sv-use/core';

	const isSupported = isSupported(() => {
		return navigator && 'geolocation' in navigator;
	});
</script>
```
