<script lang="ts">
	import { Input } from '$lib/components/atoms/index.js';
	import { onStartTyping } from '@sv-use/core';

	let input = $state<HTMLInputElement>();

	onStartTyping(() => {
		if (input !== document.activeElement) {
			input?.focus();
		}
	});
</script>

<div class="relative flex w-full flex-col gap-5">
	<p class="dark:text-zinc-200">Type anything</p>
	<div class="relative flex w-full flex-col gap-2">
		<Input bind:el={input} placeholder="Start typing to focus" />
		<Input placeholder="Start typing has no effect here" />
	</div>
</div>
