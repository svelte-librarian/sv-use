/**
 * A state that automatically resets to the default value after a delay.
 * @param defaultValue The default value of the state (can be an object).
 * @param delay The delay in milliseconds.
 */
export function autoResetState<T>(defaultValue: T, delay: number = 3000) {
	let timeout: number;
	const _state = $state({ current: defaultValue });

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

			target[key] = value;

			timeout = setTimeout(() => {
				_state.current = defaultValue;
			}, delay) as unknown as number;

			return true;
		}
	};

	return new Proxy(_state, handler);
}
