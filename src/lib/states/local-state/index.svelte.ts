import { onMount } from 'svelte';

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
 */
export function localState<T>(key: string, value: T, options: LocalStateOptions<T> = {}) {
	const { serialize = JSON.stringify, deserialize = JSON.parse, overrideDefault = false } = options;

	let _current = $state<T>(value);

	onMount(() => {
		if (!overrideDefault) {
			_current = deserialize(localStorage.getItem(key) ?? serialize(value));
		} else {
			localStorage.setItem(key, serialize(value));
		}
	});

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
