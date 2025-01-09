<script lang="ts">
	import { cn } from '$utils/cn.js';
	import type { HTMLInputAttributes } from 'svelte/elements';

	let { class: className, value = $bindable(), ...rest }: HTMLInputAttributes = $props();
</script>

<input
	bind:value
	class={cn(
		'rounded-md border border-zinc-300 bg-zinc-50 px-3 py-2 text-sm',
		'dark:border-zinc-700 dark:bg-zinc-900 dark:text-white',
		className
	)}
	{...rest}
/>
