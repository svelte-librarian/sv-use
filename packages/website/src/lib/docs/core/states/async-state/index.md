---
slug: 'async-state'
title: 'asyncState'
description: 'A reactive state that handles the loading and error states of a promise.'
category: 'states'
---

# asyncState

A reactive state that handles the loading and error states of a promise.

## Usage

```svelte
<script lang="ts">
	import { asyncState } from '@sv-use/core';

	const recipe = asyncState(
		fetch(`https://dummyjson.com/recipes/1`).then((res) => res.json()),
		null
	);
</script>
```

## Examples

A basic example where you wait for the value to be resolved.

```svelte
<script lang="ts">
	import { asyncState } from '@sv-use/core';

	const recipe = asyncState(
		fetch(`https://dummyjson.com/recipes/1`).then((res) => res.json()),
		null
	);
</script>

{#if recipe.isLoading}
	<p>Loading your recipe...</p>
{:else}
	<pre>{JSON.stringify(recipe.current, null, 4)}</pre>
{/if}
```

A more advanced usage where the recipe is fetched again when the `id` changes and shows the last result before swapping instead of showing the loading tag.

Note that you have to set `immediate` to `false` if you are using a function that depends on arguments for the promise parameter, and then manually call the `execute` function.

```svelte
<script lang="ts">
	import { asyncState } from '@sv-use/core';

	let id = $state(1);
	const recipe = asyncState(
		(id: number) => {
			return fetch(`https://dummyjson.com/recipes/${id}`).then((res) => res.json());
		},
		null,
		{
			immediate: false
		}
	);

	$effect(() => {
		recipe.execute(id);
	});
</script>

{#if !recipe.current}
	<p>Loading your recipe...</p>
{:else}
	<pre>{JSON.stringify(recipe.current, null, 4)}</pre>
	<button onclick={() => id++}>Next recipe</button>
{/if}
```
