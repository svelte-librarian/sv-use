<script lang="ts">
	import { cn } from '$utils/cn.js';
	import type { HTMLButtonAttributes } from 'svelte/elements';

	interface Props extends HTMLButtonAttributes {
		el?: HTMLButtonElement;
	}

	let { children, class: className = undefined, el = $bindable(), ...rest }: Props = $props();
</script>

<button
	bind:this={el}
	class={cn(
		'bg-svelte dark:bg-darksvelte rounded-md px-3 py-1 text-white disabled:cursor-not-allowed disabled:opacity-50',
		className
	)}
	{...rest}
>
	{@render children?.()}
</button>
