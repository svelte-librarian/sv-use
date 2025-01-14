type DebouncedStateOptions = {
	/** The delay in milliseconds before updating the state. */
	delay?: number;
};

/**
 * A reactive state that updates its value after a delay.
 * @param initial The initial value of the state.
 * @param options Additional options to customize the behavior.
 * @see https://svelte-librarian.github.io/sv-use/docs/core/states/debounced-state
 */
export function debouncedState<T>(initial: T, options: DebouncedStateOptions = {}): { current: T } {
	const { delay = 1000 } = options;

	let timeout: number;
	const _state = $state({ current: initial });

	const handler: ProxyHandler<{ current: T }> = {
		get(target: Record<string, unknown>, key: string) {
			if (
				target &&
				typeof target === 'object' &&
				typeof target[key] === 'object' &&
				target[key] !== null
			) {
				return new Proxy(target[key], handler);
			} else {
				return target[key];
			}
		},
		set(target: Record<string, unknown>, key: string, value: unknown) {
			if (timeout) {
				clearTimeout(timeout);
			}

			timeout = setTimeout(() => {
				target[key] = value;
			}, delay) as unknown as number;

			return true;
		}
	};

	return new Proxy(_state, handler);
}
