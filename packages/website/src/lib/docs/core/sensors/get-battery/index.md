---
slug: 'get-battery'
title: 'getBattery'
description: Provides information about the system's battery charge level and lets you be notified by events that are sent when the battery level or charging status change.
category: 'sensors'
---

## Usage

```svelte
<script lang="ts">
	import { getBattery } from '@sv-use/core';

	const battery = getBattery();
</script>
```
