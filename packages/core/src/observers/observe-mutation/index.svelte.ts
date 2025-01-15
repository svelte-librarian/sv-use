import { watch } from '../../reactivity/watch/index.svelte.js';
import { isSupported } from '../../__internal__/is.svelte.js';
import { defaultWindow, type ConfigurableWindow } from '../../__internal__/configurable.js';
import { normalizeValue, notNullish, toArray } from '../../__internal__/utils.js';
import type { Arrayable, MaybeGetter } from '../../__internal__/types.js';

interface ObserveMutationOptions extends MutationObserverInit, ConfigurableWindow {}

type ObserveMutationReturn = {
	readonly isSupported: boolean;
	cleanup: () => void;
	takeRecords: () => void;
};

/**
 * Watch for changes being made to the DOM tree.
 * @param targets
 * @param callback
 * @param options
 */
export function observeMutation(
	targets: Arrayable<MaybeGetter<HTMLElement | undefined>>,
	callback: MutationCallback,
	options: ObserveMutationOptions = {}
): ObserveMutationReturn {
	const { window = defaultWindow, ...mutationOptions } = options;

	let observer: MutationObserver | undefined;
	const _isSupported = isSupported(() => window !== undefined && 'MutationObserver' in window);

	const _targets = $derived(
		new Set(toArray(targets).map<HTMLElement | undefined>(normalizeValue).filter(notNullish))
	);

	watch(
		() => _targets,
		(targets) => {
			cleanup();

			if (_isSupported.current && targets.size) {
				observer = new MutationObserver(callback);
				targets.forEach((el) => observer!.observe(el, mutationOptions));
			}
		},
		{ runOnMounted: true }
	);

	function takeRecords() {
		return observer?.takeRecords();
	}

	function cleanup() {
		if (observer) {
			observer.disconnect();
			observer = undefined;
		}
	}

	return {
		get isSupported() {
			return _isSupported.current;
		},
		cleanup,
		takeRecords
	};
}
