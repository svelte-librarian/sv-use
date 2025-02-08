type DefaultStateReturn<T> = {
	// ? Is there a way to have the getter be defined but the setter be nullable
	/**
	 * @note Although it is typed as nullable, reading the value will never return a nullable value.
	 *
	 * This is to ensure that you can set a nullable value when changing the state without TS complaining.
	 */
	current: T | null | undefined;
};

/**
 * A reactive state that falls back to `defaultValue` if set to `null` or `undefined`.
 * @param defaultValue The fallback value when the value is set to `null` or `undefined`.
 * @param initialValue The initial value of the state. Defaults to `defaultValue` if omitted.
 * @see https://svelte-librarian.github.io/sv-use/docs/core/default-state
 */
export function defaultState<T>(defaultValue: T, initialValue?: T): DefaultStateReturn<T> {
	const _default = $state({ current: initialValue ?? defaultValue });

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
			if (value || JSON.stringify(target) !== JSON.stringify($state.snapshot(_default))) {
				target[key] = value;
			} else {
				target[key] = defaultValue;
			}

			return true;
		}
	};

	return new Proxy(_default, handler);
}
