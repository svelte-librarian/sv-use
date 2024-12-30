---
title: Introduction
description: "SvelteUse is a collection of Svelte 5 utilities based on runes. It is assumed that you are at least somewhat familiar with the runes system.\\nYou can use it with SvelteKit and with Svelte-only apps as it doesn't rely on Sveltekit-specific features."
---

## Installation

```bash
npm install @svelte-librarian/sv-use
```

## Usage

> [!TIP]
> Refer to the documentation of each function to see how to use it and examples.

You can simply import the utility you need from `@svelte-librarian/sv-use` and use it.

An example using a state that is persisted via local storage :

```svelte
<script lang="ts">
	import { localState } from '@svelte-librarian/sv-use';

	const counter = localState('counter', 0);
</script>

<span>counter : {counter.current}</span>
```
