---
slug: introduction
title: Introduction
description: SvelteUse is a collection of Svelte 5 utilities based on runes. It is assumed that you are at least somewhat familiar with the runes system.\nYou can use it with SvelteKit and with Svelte-only apps as it doesn't rely on Sveltekit-specific features.
---

## Installation

```bash
npm install @sv-use/core
```

## Usage

> [!TIP]
> Refer to the documentation of each function to see how to use it and examples.

You can simply import the utility you need from `@sv-use/core` and use it.

An example using a state that is persisted via local storage :

```svelte
<script lang="ts">
	import { localState } from '@sv-use/core';

	const counter = localState('counter', 0);
</script>

<span>counter : {counter.current}</span>
```
