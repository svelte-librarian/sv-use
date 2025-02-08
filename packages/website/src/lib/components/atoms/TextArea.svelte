<script lang="ts">
	import { cn } from '$utils/cn.js';
	import type { HTMLTextareaAttributes } from 'svelte/elements';

	interface Props extends HTMLTextareaAttributes {
		el?: HTMLTextAreaElement;
	}

	let {
		class: className = undefined,
		value = $bindable(),
		el = $bindable(undefined),
		...rest
	}: Props = $props();
</script>

<textarea
	bind:this={el}
	bind:value
	class={cn(
		'rounded-md border border-zinc-300 p-5 text-sm dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-200',
		className
	)}
	{...rest}
></textarea>
