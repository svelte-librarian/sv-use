<script lang="ts">
	import { Button } from '$lib/components/atoms/index.js';
	import { autoResetState } from '$sv-use/core';

	const message = autoResetState('This is the default message', 3000);

	function changeMessage() {
		message.current = 'This is the new message';
	}
</script>

<div class="relative flex w-full flex-col gap-2">
	<p class="dark:text-zinc-200">Message : {message.current}</p>
	<Button onclick={changeMessage}>Change message</Button>
</div>
