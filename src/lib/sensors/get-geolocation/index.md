---
slug: 'get-geolocation'
title: 'getGeolocation'
description: 'It allows the user to provide their location to web applications if they so desire.\nFor privacy reasons, the user is asked for permission to report location information.'
category: 'sensors'
---

## Usage

```svelte
<script lang="ts">
	import { getGeolocation } from '@sv-use/core';

	const {
        coords,
        timestamp,
        error,
        resume,
        pause
    } = getGeolocation();
</script>
```
