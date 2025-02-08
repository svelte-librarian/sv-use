<script lang="ts">
	import { cn } from '$utils/cn.js';
	import type { HTMLInputAttributes } from 'svelte/elements';

	interface Props extends HTMLInputAttributes {
		el?: HTMLInputElement;
	}

	let {
		class: className = undefined,
		el = $bindable(),
		type = 'text',
		value = $bindable(),
		...rest
	}: Props = $props();
</script>

<input
	{type}
	bind:this={el}
	bind:value
	class={cn(
		'rounded-md border border-zinc-300 px-3 py-2 text-sm dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-200',
		className
	)}
	{...rest}
/>
