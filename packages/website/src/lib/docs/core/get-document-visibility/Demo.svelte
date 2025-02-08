<script lang="ts">
	import { autoResetState, getDocumentVisibility, watch } from '$sv-use/core';

	let message = autoResetState('💡 Minimize the page or switch tab then return', 3000);
	const documentVisibility = getDocumentVisibility();

	watch(
		() => documentVisibility.current,
		(curr, prev) => {
			if (prev === 'hidden' && curr === 'visible') {
				message.current = '🎉 Welcome back!';
			}
		}
	);
</script>

<div class="relative w-full">
	<span class="dark:text-zinc-200">{message.current}</span>
</div>
