# getGeolocation

It allows the user to provide their location to web applications if they so
desire.

For privacy reasons, the user is asked for permission to report location
information.

## Usage

```svelte
<script lang="ts">
	import { getGeolocation } from '@sv-use/core';

	const geolocation = getGeolocation();
</script>
```
