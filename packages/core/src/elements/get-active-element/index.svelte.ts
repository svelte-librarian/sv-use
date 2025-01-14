import { BROWSER } from 'esm-env';
import { handleEventListener } from '../../browser/index.js';

type GetActiveElementOptions<AutoMountAndCleanup extends boolean> = {
	/**
	 * Whether to automatically cleanup the event listener or not.
	 *
	 * Don't use this if you are calling `getActiveElement` outside the component initialization lifecycle. Instead, use the `cleanup` function that is returned.
	 * @default false
	 */
	autoMountAndCleanup?: AutoMountAndCleanup;
	/**
	 * Whether to search for the active element inside shadow DOM or not.
	 * @default true
	 */
	searchInShadow?: boolean;
};

type GetActiveElementReturn = {
	/** The current active element or `null`. */
	readonly current: HTMLElement | null;
};

type GetActiveElementReturnWithCleanup = GetActiveElementReturn & {
	/** The function to cleanup the event listener. */
	cleanup: () => void;
};

export function getActiveElement(): GetActiveElementReturnWithCleanup;
export function getActiveElement<AutoMountAndCleanup extends boolean = false>(
	options: GetActiveElementOptions<AutoMountAndCleanup>
): AutoMountAndCleanup extends true ? GetActiveElementReturn : GetActiveElementReturnWithCleanup;

/**
 * @see https://svelte-librarian.github.io/sv-use/docs/core/elements/get-active-element
 */
export function getActiveElement<AutoMountAndCleanup extends boolean = false>(
	options: GetActiveElementOptions<AutoMountAndCleanup> = {}
): GetActiveElementReturn | GetActiveElementReturnWithCleanup {
	const { autoMountAndCleanup = false, searchInShadow = true } = options;

	let activeElement = $state<HTMLElement | null>(null);
	const cleanups: Array<() => void> = [];

	if (BROWSER) {
		cleanups.push(
			handleEventListener(window, 'blur', onBlur, { autoMountAndCleanup, capture: true })
		);
		cleanups.push(
			handleEventListener(window, 'focus', onFocus, { autoMountAndCleanup, capture: true })
		);
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
		activeElement = getDeepActiveElement() as HTMLElement | null;
	}

	function onBlur(event: FocusEvent) {
		if (event.relatedTarget !== null) return;

		onFocus();
	}

	if (autoMountAndCleanup) {
		return {
			get current() {
				return activeElement;
			},
			cleanup() {}
		};
	} else {
		return {
			get current() {
				return activeElement;
			},
			cleanup() {
				cleanups.forEach((cleanup) => cleanup());
			}
		};
	}
}
