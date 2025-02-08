import { onDestroy } from 'svelte';
import { BROWSER } from 'esm-env';
import { handleEventListener } from '../handle-event-listener/index.svelte.js';
import type { CleanupFunction } from '../__internal__/types.js';

type GetActiveElementOptions = {
	/**
	 * Whether to automatically cleanup the event listener or not.
	 *
	 * If set to `true`, it must run in the component initialization lifecycle.
	 * @default true
	 */
	autoCleanup?: boolean;
	/**
	 * Whether to search for the active element inside shadow DOM or not.
	 * @default true
	 */
	searchInShadow?: boolean;
};

type GetActiveElementReturn = {
	/** The current active element or `null`. */
	readonly current: HTMLElement | null;
	/**
	 * The function to cleanup the event listener.
	 * @note Is called automatically if `options.autoCleanup` is set to `true`.
	 */
	cleanup: () => void;
};

/**
 * Returns the element within the DOM that currently has focus.
 * @see https://svelte-librarian.github.io/sv-use/docs/core/get-active-element
 */
export function getActiveElement(options: GetActiveElementOptions = {}): GetActiveElementReturn {
	const { autoCleanup = true, searchInShadow = true } = options;

	const cleanups: CleanupFunction[] = [];
	let _current = $state<HTMLElement | null>(null);

	if (BROWSER) {
		cleanups.push(
			handleEventListener('blur', onBlur, { autoCleanup, capture: true }),
			handleEventListener('focus', onFocus, { autoCleanup, capture: true })
		);
	}

	if (autoCleanup) {
		onDestroy(() => {
			cleanup();
		});
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

	function cleanup() {
		cleanups.forEach((fn) => fn());
	}

	return {
		get current() {
			return _current;
		},
		cleanup
	};
}
