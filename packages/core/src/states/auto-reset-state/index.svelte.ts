/**
 * A state that automatically resets to the default value after a delay.
 * @param defaultValue The default value of the state (can be an object).
 * @param delay The delay in milliseconds.
 */
export function autoResetState<T>(defaultValue: T, delay: number = 3000) {
	let timeout: number;
	let _current = $state<T>(defaultValue);

	$effect(() => {
		// eslint-disable-next-line @typescript-eslint/no-unused-expressions
		_current;

		if (timeout) {
			clearTimeout(timeout);
		}

		timeout = setTimeout(() => {
			_current = defaultValue;
		}, delay);

		return () => {
			if (timeout) {
				clearTimeout(timeout);
			}
		};
	});

	return {
		get current() {
			return _current;
		},
		set current(v: T) {
			_current = v;
		}
	};
}
