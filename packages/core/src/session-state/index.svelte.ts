import { BROWSER } from 'esm-env';

type SessionStateOptions<T> = {
	/** Defaults to `JSON.stringify`. */
	serialize?: (value: T) => string;
	/** Defaults to `JSON.parse`. */
	deserialize?: (value: string) => T;
	/** If the key is present in session storage, override that value or not. */
	overrideDefault?: boolean;
};

/**
 * A state that is synced with session storage.
 * @param key The key to use in session storage.
 * @param value The initial value of the state.
 * @param options Additional options to customize the behavior.
 * @returns A reactive `current` property.
 * @see https://svelte-librarian.github.io/sv-use/docs/core/session-state
 */
export function sessionState<T>(key: string, value: T, options: SessionStateOptions<T> = {}) {
	const { serialize = JSON.stringify, deserialize = JSON.parse, overrideDefault = false } = options;

	const _state = $state({ current: value });

	if (BROWSER) {
		if (sessionStorage.getItem(key) && !overrideDefault) {
			_state.current = deserialize(sessionStorage.getItem(key)!);
		} else {
			sessionStorage.setItem(key, serialize(value));
		}
	}

	$effect(() => {
		sessionStorage.setItem(key, serialize(_state.current));
	});

	return _state;
}
