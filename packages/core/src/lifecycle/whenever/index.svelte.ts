import type { Arrayable, Getter } from '../../__internal__/types.js';
import { normalizeValue, toArray } from '../../__internal__/utils.js';

type WheneverOptions = {
	/**
	 * Whether to run the effect on mount or not.
	 * @default true
	 */
	runOnMount?: boolean;
};

/**
 * Triggers a callback when the dependency is `true`.
 * @param dep The dependency to watch.
 * @param fn The callback to trigger when the dependency is `true`.
 * @param options Additional options to customize the behavior.
 * @see https://svelte-librarian.github.io/sv-use/docs/core/lifecycle/whenever
 */
export function whenever(dep: Getter<boolean>, fn: () => void, options?: WheneverOptions): void;

/**
 * Triggers a callback when the dependencies are `true`.
 * @param deps The dependencies to watch.
 * @param fn The callback to trigger when the dependencies are `true`.
 * @param options Additional options to customize the behavior.
 * @see https://svelte-librarian.github.io/sv-use/docs/core/lifecycle/whenever
 */
export function whenever(
	deps: Array<Getter<boolean>>,
	fn: () => void,
	options?: WheneverOptions
): void;

export function whenever(
	deps: Arrayable<Getter<boolean>>,
	fn: () => void,
	options: WheneverOptions = {}
): void {
	const { runOnMount = true } = options;

	let active = runOnMount;

	$effect(() => {
		// Allows to run even with deeply nested object changes
		const values = $state.snapshot(toArray(deps).map(normalizeValue));

		if (!active) {
			active = true;
			return;
		}

		if (values.every((v) => v)) {
			fn();
		}
	});
}
