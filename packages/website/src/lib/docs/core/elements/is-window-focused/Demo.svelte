<script lang="ts">
	import { defaultState, isWindowFocused, watch } from '$sv-use/core';

	const message = defaultState('💡 Click somewhere outside the window to lose focus');
	const isFocused = isWindowFocused();

	watch(
		() => isFocused.current,
		(curr, prev) => {
			if (prev === true && curr === false) {
				message.current = 'ℹ️ Tab is currently unfocused';
			} else {
				message.current = null;
			}
		}
	);
</script>

<p class="dark:text-zinc-200">{message.current}</p>
