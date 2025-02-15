<script lang="ts">
	import { theme } from '$lib/contexts/theme.svelte.js';
	import { observeMutation } from '@sv-use/core';
	import { cn } from '$utils/cn.js';

	const messages = $state<string[]>([]);
	let el = $state<HTMLElement>();
	let className = $state<string>('');
	let style = $state<string>('');

	observeMutation(
		() => el,
		([mutation]) => {
			messages.push(mutation.attributeName!);
		},
		{ attributes: true }
	);

	setTimeout(() => {
		className = 'underline';
	}, 1000);

	setTimeout(() => {
		style = theme.current === 'light' ? 'color: #ff3e00;' : 'color: #f96743';
	}, 1500);
</script>

<div bind:this={el} class={cn('relative flex w-full flex-col gap-2', className)} {style}>
	{#each messages as text, i (i)}
		<span>Mutation Attribute: {text}</span>
	{/each}
</div>
