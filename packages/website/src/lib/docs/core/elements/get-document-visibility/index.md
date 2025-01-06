# getDocumentVisibility

Returns the visibility of the document. It can be used to check whether the
document is in the background or in a minimized window, or is otherwise not
visible to the user.

## Usage

```svelte
<script lang="ts">
	import { getDocumentVisibility } from '@sv-use/core';

	const documentVisibility = getDocumentVisibility();
</script>
```
