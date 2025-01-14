import { watch } from '../watch/index.svelte.js';

type GetPreviousReturn<T> = {
	current: T;
};

/**
 * A reactive state of a given state's previous value.
 * @param getter The state as a getter function.
 * @note The state is `undefined` until the given state is updated for the first time.
 * @see https://svelte-librarian.github.io/sv-use/docs/core/reactivity/get-previous
 */
export function getPrevious<T>(getter: () => T): GetPreviousReturn<T | undefined>;

/**
 * A reactive state of a given state's previous value.
 * @param getter The state as a getter function.
 * @param initial The initial value of the state.
 * @see https://svelte-librarian.github.io/sv-use/docs/core/reactivity/get-previous
 */
export function getPrevious<T>(getter: () => T, initial: T): GetPreviousReturn<T>;

export function getPrevious<T>(
	getter: () => T,
	initial: T | undefined = undefined
): GetPreviousReturn<T> | GetPreviousReturn<T | undefined> {
	const _previous = $state({ current: initial });

	watch(
		() => $state.snapshot(getter()) as T,
		(_, prev) => {
			_previous.current = prev;
		}
	);

	return _previous;
}
