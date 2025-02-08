import { BROWSER } from 'esm-env';

type LocalStateOptions<T> = {
	/** Defaults to `JSON.stringify`. */
	serialize?: (value: T) => string;
	/** Defaults to `JSON.parse`. */
	deserialize?: (value: string) => T;
	/** If the key is present in local storage, override that value or not. */
	overrideDefault?: boolean;
};

/**
 * A state that is synced with local storage.
 * @param key The key to use in local storage.
 * @param value The initial value of the state.
 * @param options Additional options to customize the behavior.
 * @returns A reactive `current` property.
 * @see https://svelte-librarian.github.io/sv-use/docs/core/local-state
 */
export function localState<T>(key: string, value: T, options: LocalStateOptions<T> = {}) {
	const { serialize = JSON.stringify, deserialize = JSON.parse, overrideDefault = false } = options;

	const _state = $state({ current: value });

	if (BROWSER) {
		if (localStorage.getItem(key) && !overrideDefault) {
			_state.current = deserialize(localStorage.getItem(key)!);
		} else {
			localStorage.setItem(key, serialize(value));
		}
	}

	$effect(() => {
		localStorage.setItem(key, serialize(_state.current));
	});

	return _state;
}
