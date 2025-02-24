import { handleEventListener } from '../handle-event-listener/index.svelte.js';
import { defaultWindow, type ConfigurableWindow } from '../__internal__/configurable.js';

type IsWindowFocusedOptions = ConfigurableWindow;

type IsWindowFocusedReturn = {
	readonly current: boolean;
};

/**
 * Tracks whether the window is focused or not.
 * @param options Additional options to customize the behavior.
 * @see https://svelte-librarian.github.io/sv-use/docs/core/is-window-focused
 */
export function isWindowFocused(options: IsWindowFocusedOptions = {}): IsWindowFocusedReturn {
	const { window = defaultWindow } = options;

	let _isFocused = $state(!!window && window.document.hasFocus());

	handleEventListener(window, 'blur', () => (_isFocused = false), { passive: true });
	handleEventListener(window, 'focus', () => (_isFocused = true), { passive: true });

	return {
		get current() {
			return _isFocused;
		}
	};
}
