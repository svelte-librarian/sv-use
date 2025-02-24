import { handleEventListener } from '../handle-event-listener/index.svelte.js';
import { defaultWindow, type ConfigurableWindow } from '../__internal__/configurable.js';

interface GetActiveElementOptions extends ConfigurableWindow {
	/**
	 * Whether to search for the active element inside shadow DOM or not.
	 * @default true
	 */
	searchInShadow?: boolean;
}

type GetActiveElementReturn = {
	readonly current: HTMLElement | null;
};

/**
 * Returns the element within the DOM that currently has focus.
 * @see https://svelte-librarian.github.io/sv-use/docs/core/get-active-element
 */
export function getActiveElement(options: GetActiveElementOptions = {}): GetActiveElementReturn {
	const { searchInShadow = true, window = defaultWindow } = options;

	let _current = $state<HTMLElement | null>(null);

	if (window) {
		handleEventListener(window, 'blur', onBlur, { capture: true });
		handleEventListener(window, 'focus', onFocus, { capture: true });
	}

	function getDeepActiveElement() {
		let element = document?.activeElement;

		if (searchInShadow) {
			while (element?.shadowRoot) {
				element = element?.shadowRoot?.activeElement;
			}
		}

		return element;
	}

	function onFocus() {
		_current = getDeepActiveElement() as HTMLElement | null;
	}

	function onBlur(event: FocusEvent) {
		if (event.relatedTarget !== null) return;

		onFocus();
	}

	return {
		get current() {
			return _current;
		}
	};
}
