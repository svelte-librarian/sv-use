import { untrack } from 'svelte';

/**
 * A state that automatically resets to the default value after a delay.
 * @param defaultValue The default value of the state (can be an object).
 * @param delay The delay in milliseconds.
 * @see https://svelte-librarian.github.io/sv-use/docs/core/states/auto-reset-state
 */
export function autoResetState<T>(defaultValue: T, delay: number = 3000) {
	let timeout: number;
	const _state = $state({ current: defaultValue });

	$effect(() => {
		$state.snapshot(_state);

		if (timeout) {
			clearTimeout(timeout);
		}

		untrack(() => {
			timeout = setTimeout(() => {
				_state.current = defaultValue;
			}, delay) as unknown as number;
		});
	});

	return _state;
}
