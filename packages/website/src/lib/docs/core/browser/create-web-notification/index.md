# createWebNotification

Configure and display desktop notifications to the user.

## Usage

```svelte
<script>
	import { createWebNotification } from '@sv-use/core';

	const notification = createWebNotification();
</script>

<button onclick={notification.show}>
    Show notification
</button>
```
