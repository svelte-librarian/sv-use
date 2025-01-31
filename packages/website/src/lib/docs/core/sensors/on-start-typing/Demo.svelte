<script lang="ts">
	import { onStartTyping } from '$sv-use/core';

	let input = $state<HTMLInputElement>();

	onStartTyping(() => {
		if (input !== document.activeElement) {
			input?.focus();
		}
	});
</script>

<div class="relative flex w-full flex-col gap-2">
	<note class="text-sm">Type anything</note>
	<input
		bind:this={input}
		type="text"
		placeholder="Start typing to focus"
		class="rounded-md border border-zinc-300 px-3 py-2 text-sm"
	/>
	<input
		type="text"
		placeholder="Start typing has no effect here"
		class="rounded-md border border-zinc-300 px-3 py-2 text-sm"
	/>
</div>
