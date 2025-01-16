<script lang="ts">
	import { observeResize } from '$sv-use/core';

	let el = $state<HTMLTextAreaElement>();
	let text = $state('');

	observeResize(
		() => el,
		(entries) => {
			const { width, height } = entries[0].contentRect;

			text = `width: ${width.toFixed(0)}px\nheight: ${height.toFixed(0)}px`;
		}
	);
</script>

<div class="relative flex w-full flex-col items-start gap-2">
	<span class="text-sm italic text-zinc-500">Resize the box to see changes</span>
	<textarea bind:this={el} bind:value={text} class="resize rounded-md p-5" disabled></textarea>
</div>
