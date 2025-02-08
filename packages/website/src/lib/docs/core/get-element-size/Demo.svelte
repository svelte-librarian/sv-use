<script lang="ts">
	import { TextArea } from '$lib/components/atoms/index.js';
	import { getElementSize } from '$sv-use/core';

	let el = $state<HTMLTextAreaElement>();

	const size = getElementSize(() => el, { box: 'border-box' });

	let text = $derived.by(() => {
		return `width: ${size.width.toFixed(0)}px\nheight: ${size.height.toFixed(0)}px`;
	});
</script>

<div class="relative flex w-full flex-col gap-2">
	<span class="text-sm italic text-zinc-500 dark:text-zinc-400">Resize the box to see changes</span>
	<TextArea bind:el value={text} class="resize rounded-md p-5" disabled></TextArea>
</div>
