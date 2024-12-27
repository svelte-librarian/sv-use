type DebouncedStateOptions = {
	/** The delay in milliseconds before updating the state. */
	delay?: number;
};

/**
 * Creates a reactive state that updates the state after a delay.
 * @param initial The initial value of the state.
 * @param options Additional options to customize the behavior.
 */
export function debouncedState<T>(initial: T, options: DebouncedStateOptions = {}) {
	const { delay = 1000 } = options;

	let timeout: number;
	let _current = $state<T>(initial);

	return {
		get current() {
			return _current;
		},
		set current(v: T) {
			if (timeout) {
				clearTimeout(timeout);
			}

			timeout = setTimeout(() => {
				_current = v;
			}, delay);
		}
	};
}
