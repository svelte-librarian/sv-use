<script lang="ts">
	import { TextArea } from '$lib/components/atoms/index.js';
	import { observeResize } from '@sv-use/core';

	let el = $state<HTMLTextAreaElement>();
	let text = $state('');

	observeResize(
		() => el,
		([entry]) => {
			const { width, height } = entry.contentRect;

			text = `width: ${width.toFixed(0)}px\nheight: ${height.toFixed(0)}px`;
		}
	);
</script>

<div class="relative flex w-full flex-col gap-2">
	<span class="text-sm italic text-zinc-500 dark:text-zinc-400">Resize the box to see changes</span>
	<TextArea bind:el value={text} class="resize rounded-md p-5" disabled></TextArea>
</div>
