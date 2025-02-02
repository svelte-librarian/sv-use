# autoResetState

A state that automatically resets to the default value after a delay.

## Usage

```svelte
<script>
	import { autoResetState } from '@sv-use/core';

	const message = autoResetState('This is the default message', 3000);

	function changeMessage() {
        // Changes to the default value after 3 seconds
		message.current = 'This is the new message';
	}
</script>
```
