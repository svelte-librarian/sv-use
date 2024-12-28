<script lang="ts">
	import { autoResetState } from '$sv-use/core';

	const message = autoResetState({ value: 'This is the default message' }, 3000);

	function changeMessage() {
		message.current = { value: 'This is the new message' };
	}
</script>

<div class="relative flex w-full flex-col gap-2">
	<button onclick={changeMessage} class="bg-svelte rounded-md px-3 py-1 text-white">
		Change message
	</button>
	<span>{message.current.value}</span>
</div>
