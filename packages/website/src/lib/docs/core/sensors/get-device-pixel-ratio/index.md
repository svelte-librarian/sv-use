---
slug: 'get-device-pixel-ratio'
title: 'getDevicePixelRatio'
description: 'Returns the ratio of the resolution in physical pixels to the resolution in CSS pixels for the current display device.'
category: 'sensors'
---

## Usage

```svelte
<script lang="ts">
	import { getDevicePixelRatio } from '@sv-use/core';

	const devicePixelRatio = getDevicePixelRatio();
</script>
```
