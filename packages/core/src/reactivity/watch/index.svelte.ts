/**
 * Copied and adapted from Svecosystem Runed, all credit goes to them.
 * https://github.com/svecosystem/runed/blob/main/packages/runed/src/lib/utilities/watch/watch.svelte.ts
 */

import { untrack } from 'svelte';
import type { Getter } from '$lib/__internal__/types.js';

type WatchOptions<RunOnMounted extends boolean> = {
	/** Whether to run the effect on mount or not. */
	runOnMounted?: RunOnMounted;
};

export function watch<T, RunOnMounted extends boolean = true>(
	deps: Getter<T>,
	fn: (values: T, previousValues: RunOnMounted extends true ? T | undefined : T) => void,
	options?: WatchOptions<RunOnMounted>
): void;

export function watch<T, RunOnMounted extends boolean = true>(
	deps: Array<Getter<T>>,
	fn: (values: Array<T>, previousValues: Array<T | undefined>) => void,
	options?: WatchOptions<RunOnMounted>
): void;

/**
 * Triggers a callback when a dependency changes.
 * @param deps The dependencies to watch.
 * @param fn The callback to trigger when a dependency changes.
 * @param options Additional options to customize the behavior.
 * @note `watch` is a `$effect` but supplies the previous value(s) as the second argument.
 */
export function watch<T, RunOnMounted extends boolean = true>(
	deps: Getter<T> | Array<Getter<T>>,
	fn: (
		values: T | Array<T>,
		previousValues:
			| (RunOnMounted extends true ? T | undefined : T)
			| (RunOnMounted extends true ? Array<T | undefined> : Array<T>)
	) => void,
	options: WatchOptions<RunOnMounted> = {}
): void {
	const { runOnMounted = true } = options;

	let active = runOnMounted;
	let previousValues: T | undefined | Array<T | undefined> = Array.isArray(deps) ? [] : undefined;

	$effect(() => {
		const values = Array.isArray(deps) ? deps.map((dep) => dep()) : deps();

		if (!active) {
			active = true;
			previousValues = values;
			return;
		}

		// @ts-expect-error Should fix type error on `previousValues`
		const cleanup = untrack(() => fn(values, previousValues));
		previousValues = values;

		return cleanup;
	});
}
