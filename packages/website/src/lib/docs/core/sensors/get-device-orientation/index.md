# getDeviceOrientation

Provides web developers with information from the physical orientation of the
device running the web page.

## Usage

```svelte
<script lang="ts">
	import { getDeviceOrientation } from '@sv-use/core';

	const deviceOrientation = getDeviceOrientation();
</script>

{#if deviceOrientation.isSupported}
	<span>isAbsolute : {deviceOrientation.isAbsolute}</span>
	<span>alpha : {deviceOrientation.alpha}</span>
	<span>beta : {deviceOrientation.beta}</span>
	<span>gamma : {deviceOrientation.gamma}</span>
{:else}
	<p>Your browser doesn't support the `DeviceOrientationEvent` event :(</p>
{/if}
```
