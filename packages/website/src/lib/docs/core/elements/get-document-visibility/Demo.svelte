<script lang="ts">
	import { getDocumentVisibility, watch } from '$sv-use/core';
	import { onDestroy } from 'svelte';

	let timeout: number;
	let initialMessage = '💡 Minimize the page or switch tab then return';

	let message = $state(initialMessage);
	const documentVisibility = getDocumentVisibility();

	watch(
		() => documentVisibility.current,
		(curr, prev) => {
			if (prev === 'hidden' && curr === 'visible') {
				message = '🎉 Welcome back!';

				timeout = setTimeout(() => {
					message = initialMessage;
				}, 3000) as unknown as number;
			}
		}
	);

	onDestroy(() => {
		clearTimeout(timeout);
	});
</script>

<div class="relative w-full">
	<span>{message}</span>
</div>
