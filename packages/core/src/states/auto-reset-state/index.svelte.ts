/**
 * A state that automatically resets to the default value after a delay.
 * @param defaultValue The default value of the state (can be an object).
 * @param delay The delay in milliseconds.
 */
export function autoResetState<T>(defaultValue: T, delay: number = 3000) {
	let timeout: number;
	let _current = $state<T>(defaultValue);

	return {
		get current() {
			return _current;
		},
		set current(v: T) {
			if (timeout) {
				clearTimeout(timeout);
			}

			_current = v;
			timeout = setTimeout(() => {
				_current = defaultValue;
			}, delay) as unknown as number;
		}
	};
}
