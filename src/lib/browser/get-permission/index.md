---
slug: "get-permission"
title: "getPermission"
description: "Retrieves the status of a given permission."
category: "browser"
---

## Usage

```svelte
<script lang="ts">
	import { getPermission } from '@sv-use/core';

	const { isSupported, current } = getPermission('camera');
</script>
```
