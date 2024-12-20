type DebouncedStateOptions = {
	debounce?: number;
};

/** @internal Exported for testing. */
export const DEFAULT_DEBOUNCE = 1000;

export function debouncedState<T>(initial: T, options?: DebouncedStateOptions) {
	const debounce = options?.debounce ?? DEFAULT_DEBOUNCE;

	let timeout: NodeJS.Timeout;
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
			}, debounce);
		}
	};
}
