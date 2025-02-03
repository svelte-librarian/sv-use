type ThrottleOptions = {
	/**
	 * Whether to watch for trailing changes or not.
	 * @default true
	 */
	trailing?: boolean;
};

/**
 * Debounces the update of the value after a delay.
 * @param value The initial value of the state.
 * @param delay The delay in milliseconds.
 * @param options Additional options to customize the behavior.
 * @see https://svelte-librarian.github.io/sv-use/docs/core/reactivity/throttle
 */
export function throttle<T>(value: () => T, delay: number = 500, options: ThrottleOptions = {}) {
	const { delay: f = 1000 } = options;

	let timeout: ReturnType<typeof setTimeout>;
	let lastExecuted = 0;

	const _state = $state<{ current: T | undefined }>({ current: undefined });

	$effect(() => {
		value();

		const now = Date.now();
		const elapsed = now - lastExecuted;

		if (elapsed >= delay) {
			_state.current = value();
			lastExecuted = now;
		} else if (trailing) {
			clearTimeout(timeout);

			timeout = setTimeout(() => {
				_state.current = value();
				lastExecuted = Date.now();
			}, delay - elapsed);
		}
	});

	return _state;
}
