<script lang="ts">
	import { observeMutation } from '$sv-use/core';
	import { cn } from '$utils/cn.js';

	const messages = $state<string[]>([]);
	let el = $state<HTMLElement>();
	let className = $state<Record<string, boolean>>({});
	let style = $state<string>('');

	observeMutation(
		() => el,
		(mutations) => {
			const mutation = mutations[0];

			if (!mutation) return;

			messages.push(mutation.attributeName!);
		},
		{ attributes: true }
	);

	setTimeout(() => {
		className = {
			test: true,
			test2: true
		};
	}, 1000);

	setTimeout(() => {
		style = 'color: red;';
	}, 1550);
</script>

<div bind:this={el} class={cn('relative flex w-full flex-col gap-2', className)} {style}>
	{#each messages as text, i (i)}
		<span>Mutation Attribute: {text}</span>
	{/each}
</div>
