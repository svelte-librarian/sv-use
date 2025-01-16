import { watch } from '../../reactivity/watch/index.svelte.js';
import { isSupported } from '../../__internal__/is.svelte.js';
import { defaultWindow, type ConfigurableWindow } from '../../__internal__/configurable.js';
import { normalizeValue, notNullish, toArray } from '../../__internal__/utils.js';
import type { Arrayable, CleanupFunction, MaybeGetter } from '../../__internal__/types.js';

interface ObserveMutationOptions extends MutationObserverInit, ConfigurableWindow {}

type ObserveMutationReturn = {
	/**
	 * Whether the {@link https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver | `Mutation Observer API`} is supported or not.
	 * @see https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver#browser_compatibility
	 */
	readonly isSupported: boolean;
	/** A function to cleanup the observer. */
	cleanup: CleanupFunction;
	/** Empties the record queue and returns what was in there. */
	takeRecords: () => void;
};

/**
 * Watch for changes being made to the DOM tree.
 * @param targets The targets to observe.
 * @param callback The callback for when a change is detected.
 * @param options Additional options to customize the behavior.
 */
export function observeMutation(
	targets: Arrayable<MaybeGetter<HTMLElement | undefined>>,
	callback: MutationCallback,
	options: ObserveMutationOptions = {}
): ObserveMutationReturn {
	const { window = defaultWindow, ...mutationOptions } = options;

	let _observer: MutationObserver | undefined;

	const _isSupported = isSupported(() => window !== undefined && 'MutationObserver' in window);
	const _targets = $derived(
		new Set(toArray(targets).map<HTMLElement | undefined>(normalizeValue).filter(notNullish))
	);

	watch(
		() => _targets,
		(targets) => {
			cleanup();

			if (_isSupported.current && targets.size) {
				_observer = new MutationObserver(callback);
				targets.forEach((el) => _observer!.observe(el, mutationOptions));
			}
		},
		{ runOnMounted: true }
	);

	function takeRecords() {
		return _observer?.takeRecords();
	}

	function cleanup() {
		if (!_observer) return;

		_observer.disconnect();
		_observer = undefined;
	}

	return {
		get isSupported() {
			return _isSupported.current;
		},
		cleanup,
		takeRecords
	};
}
