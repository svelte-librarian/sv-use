# getDevicePixelRatio

Returns the ratio of the resolution in physical pixels to the resolution in CSS
pixels for the current display device.

## Usage

```svelte
<script lang="ts">
	import { getDevicePixelRatio } from '@sv-use/core';

	const devicePixelRatio = getDevicePixelRatio();
</script>
```
