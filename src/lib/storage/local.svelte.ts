import { BROWSER } from 'esm-env';

type LocalStateOptions<T> = {
	/** Defaults to `JSON.stringify`. */
	serialize?: (value: T) => string;
	/** Defaults to `JSON.parse`. */
	deserialize?: (value: string) => T;
	/** If the key is present in local storage, override that value or not. */
	overrideDefault?: boolean;
};

const DEFAULT_SERIALIZE = JSON.stringify;
const DEFAULT_DESERIALIZE = JSON.parse;
const DEFAULT_OVERRIDE_DEFAULT = false;

/**
 * A state that is synced with local storage.
 * @param key The key to use in local storage.
 * @param value The initial value of the state.
 * @param options Additional options to customize the behavior.
 * @returns A reactive `current` property.
 */
export function localState<T>(key: string, value: T, options?: LocalStateOptions<T>) {
	const serialize = options?.serialize ?? DEFAULT_SERIALIZE;
	const deserialize = options?.deserialize ?? DEFAULT_DESERIALIZE;
	const overrideDefault = options?.overrideDefault ?? DEFAULT_OVERRIDE_DEFAULT;

	let _current = $state<T>(value);

	if (BROWSER) {
		if (!overrideDefault) {
			_current = deserialize(localStorage.getItem(key) ?? serialize(value));
		} else {
			localStorage.setItem(key, serialize(value));
		}
	}

	return {
		get current() {
			return _current;
		},
		set current(v: T) {
			_current = v;
			localStorage.setItem(key, serialize(v));
		}
	};
}
