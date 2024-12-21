---
slug: 'get-device-motion'
title: 'getDeviceMotion'
description: "Provides information about the device's motion, including acceleration and rotation rate."
category: 'sensors'
---

## Usage

```svelte
<script lang="ts">
	import { getDeviceMotion } from '@svelte-use/core';

	const { acceleration, accelerationIncludingGravity, rotationRate, interval } = getDeviceMotion();
</script>
```
