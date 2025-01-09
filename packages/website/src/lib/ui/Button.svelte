<script lang="ts">
	import { cn } from '$utils/cn.js';
	import type { HTMLButtonAttributes } from 'svelte/elements';

	let { children, class: className, ...rest }: HTMLButtonAttributes = $props();
</script>

<button
	class={cn(
		'bg-svelte dark:bg-svelte-dark rounded-md px-3 py-1 text-white',
		'disabled:cursor-not-allowed disabled:opacity-50',
		className
	)}
	{...rest}
>
	{@render children?.()}
</button>
