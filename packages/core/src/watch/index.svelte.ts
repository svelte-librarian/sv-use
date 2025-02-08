/**
 * Copied and adapted from Svecosystem Runed, all credit goes to them.
 * https://github.com/svecosystem/runed/blob/main/packages/runed/src/lib/utilities/watch/watch.svelte.ts
 */

import { untrack } from 'svelte';
import { normalizeValue } from '../__internal__/utils.svelte.js';
import type { Arrayable, Getter } from '../__internal__/types.js';

type WatchOptions<RunOnMounted extends boolean> = {
	/** Whether to run the effect on mount or not. */
	runOnMounted?: RunOnMounted;
};

export function watch<T, RunOnMounted extends boolean = true>(
	deps: Getter<T>,
	fn: (values: T, previousValues: RunOnMounted extends true ? T | undefined : T) => void,
	options?: WatchOptions<RunOnMounted>
): void;

export function watch<T extends unknown[], RunOnMounted extends boolean = true>(
	deps: { [K in keyof T]: () => T[K] },
	fn: (
		values: T,
		previousValues: RunOnMounted extends true ? Array<T> | undefined : Array<T>
	) => void,
	options?: WatchOptions<RunOnMounted>
): void;

/**
 * Triggers a callback when a dependency changes.
 * @param deps The dependencies to watch.
 * @param fn The callback to trigger when a dependency changes.
 * @param options Additional options to customize the behavior.
 * @note `watch` is a `$effect` but supplies the previous value(s) as the second argument.
 * @see https://svelte-librarian.github.io/sv-use/docs/core/reactivity/watch
 */
export function watch<T, RunOnMounted extends boolean = true>(
	deps: Arrayable<Getter<T>>,
	fn: (
		values: Arrayable<T>,
		previousValues:
			| (RunOnMounted extends true ? T | undefined : T)
			| (RunOnMounted extends true ? Array<T> | undefined : Array<T>)
	) => void,
	options: WatchOptions<RunOnMounted> = {}
): void {
	const { runOnMounted = true } = options;

	let active = runOnMounted;
	let previousValues: Arrayable<T> | undefined = undefined;

	$effect(() => {
		const values = $state.snapshot(Array.isArray(deps) ? deps.map(normalizeValue) : deps());

		if (!active) {
			active = true;
			previousValues = values as Arrayable<T>;
			return;
		}

		// @ts-expect-error Should fix type error on `previousValues`
		const cleanup = untrack(() => fn(values, previousValues));
		previousValues = values as Arrayable<T>;

		return cleanup;
	});
}
