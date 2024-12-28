---
slug: 'auto-reset-state'
title: 'autoResetState'
description: 'A state that automatically resets to the default value after a delay.'
category: 'states'
---

## Usage

> [!NOTE]
> This utility returns a `current` property.

If you are using a primitive, you can simply assign to the `current` property.

If you are using an object, you can reassign to the `current` property or
assign to a property of the object. It works the same either way.

### Primitive

```svelte
<script lang="ts">
	import { autoResetState } from '$sv-use/core';

	const message = autoResetState('This is the default message', 3000);

	function changeMessage() {
		message.current = 'This is the new message';
	}
</script>
```

### Using an object and reassigning to it

```svelte
<script lang="ts">
	import { autoResetState } from '$sv-use/core';

	const message = autoResetState({ value: 'This is the default message' }, 3000);

	function changeMessage() {
		message.current = { value: 'This is the new message' };
	}
</script>
```

### Using an object and assigning to one of its property

```svelte
<script lang="ts">
	import { autoResetState } from '$sv-use/core';

	const message = autoResetState({ value: 'This is the default message' }, 3000);

	function changeMessage() {
		message.current.value = 'This is the new message';
	}
</script>
```
