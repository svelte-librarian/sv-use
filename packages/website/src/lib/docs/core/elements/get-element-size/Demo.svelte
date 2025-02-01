<script lang="ts">
	import { getElementSize } from '$sv-use/core';

	let el = $state<HTMLElement>();

	const size = getElementSize(() => el, { box: 'border-box' });

	let text = $derived.by(() => {
		return `width: ${size.width.toFixed(0)}px\nheight: ${size.height.toFixed(0)}px`;
	});
</script>

<div class="relative flex w-full flex-col gap-2">
	<span class="text-sm italic text-zinc-500">Resize the box to see changes</span>
	<textarea bind:this={el} value={text} class="resize rounded-md p-5" disabled></textarea>
</div>
