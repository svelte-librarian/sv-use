type ThrottledStateOptions = {
	/**
	 * Whether to watch for trailing changes or not.
	 * @default true
	 */
	trailing?: boolean;
};

/**
 * Throttles the rate at which the state is updated.
 * @param value The initial value of the state.
 * @param delay The delay in milliseconds.
 * @param options Additional options to customize the behavior.
 * @see https://svelte-librarian.github.io/sv-use/core/states/throttled-state
 */
export function throttledState<T>(
	initial: T,
	delay: number = 1000,
	options: ThrottledStateOptions = {}
) {
	const { trailing = true } = options;

	let timeout: ReturnType<typeof setTimeout>;
	let lastExecuted = 0;

	let current = $state(initial);

	return {
		get current() {
			return current;
		},
		set current(v: T) {
			const now = Date.now();
			const elapsed = now - lastExecuted;

			if (elapsed >= delay) {
				current = v;
				lastExecuted = now;
			} else if (trailing) {
				clearTimeout(timeout);

				timeout = setTimeout(() => {
					current = v;
					lastExecuted = Date.now();
				}, delay - elapsed);
			}
		}
	};
}
