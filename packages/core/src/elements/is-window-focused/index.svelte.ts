import { handleEventListener } from '../../browser/index.js';
import { defaultWindow, type ConfigurableWindow } from '../../__internal__/configurable.js';
import type { CleanupFunction } from '../../__internal__/types.js';
import { onDestroy } from 'svelte';

interface IsWindowFocusedOptions extends ConfigurableWindow {
	/**
	 * Whether to automatically cleanup the event listeners or not.
	 *
	 * If set to `true`, it must run in the component initialization lifecycle.
	 * @default true
	 */
	autoCleanup?: boolean;
}

type IsWindowFocusedReturn = {
	readonly current: boolean;
	/**
	 * Cleans up the event listeners.
	 * @note Called automatically if `options.autoCleanup` is `true`.
	 */
	cleanup: CleanupFunction;
};

/**
 * Tracks whether the window is focused or not.
 * @param options Additional options to customize the behavior.
 * @see https://svelte-librarian.github.io/sv-use/docs/core/elements/is-window-focused
 */
export function isWindowFocused(options: IsWindowFocusedOptions = {}): IsWindowFocusedReturn {
	const { window = defaultWindow, autoCleanup = true } = options;

	const cleanups: CleanupFunction[] = [];

	let _isFocused = $state(!!window && window.document.hasFocus());

	if (window) {
		cleanups.push(
			handleEventListener('blur', () => (_isFocused = false), { passive: true, autoCleanup }),
			handleEventListener('focus', () => (_isFocused = true), { passive: true, autoCleanup })
		);
	}

	if (autoCleanup) {
		onDestroy(() => {
			cleanup();
		});
	}

	function cleanup() {
		cleanups.map((fn) => fn());
	}

	return {
		get current() {
			return _isFocused;
		},
		cleanup
	};
}
