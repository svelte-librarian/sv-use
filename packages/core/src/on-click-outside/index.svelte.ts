import { handleEventListener } from '../handle-event-listener/index.svelte.js';
import { normalizeValue, toArray } from '../__internal__/utils.svelte.js';
import { defaultWindow, type ConfigurableWindow } from '../__internal__/configurable.js';
import type { Arrayable, MaybeGetter } from '../__internal__/types.js';

interface OnClickOutsideOptions extends ConfigurableWindow {
	/**
	 * Use capturing phase for internal event listener.
	 * @default true
	 */
	capture?: boolean;
	/**
	 * Element(s) that will not trigger the event.
	 * @default []
	 */
	ignore?: Arrayable<MaybeGetter<HTMLElement | null | undefined>>;
}

/**
 * Runs a callback when a click occurs outside the element or its ignore list.
 * @param element The main element on which not to trigger a click.
 * @param callback The callback to run when an outside click is valid.
 * @param options Additional options to customize the behavior.
 * @see https://svelte-librarian.github.io/sv-use/docs/core/on-click-outside
 */
export function onClickOutside<T extends HTMLElement>(
	element: MaybeGetter<T | null | undefined>,
	callback: (event: PointerEvent) => void,
	options: OnClickOutsideOptions = {}
): void {
	const { capture = true, ignore = [], window = defaultWindow } = options;

	let shouldListen: boolean = true;
	let isProcessingClick: boolean = false;

	const _element = $derived(normalizeValue(element));

	handleEventListener(window, 'click', onClick, { passive: true, capture });
	handleEventListener(window, 'pointerdown', onPointerDown, { passive: true });

	function onClick(event: PointerEvent) {
		if (!isProcessingClick) {
			isProcessingClick = true;

			setTimeout(() => {
				isProcessingClick = false;
			}, 0);

			handleClick(event);
		}
	}

	function onPointerDown(event: PointerEvent) {
		shouldListen =
			!shouldIgnoreClick(event) && !!(_element && !event.composedPath().includes(_element));
	}

	function handleClick(event: PointerEvent) {
		if (!event.target) return;
		if (!_element || _element === event.target || event.composedPath().includes(_element)) return;

		if (event.detail === 0) {
			shouldListen = !shouldIgnoreClick(event);
		}

		if (!shouldListen) {
			shouldListen = true;
			return;
		}

		callback(event);
	}

	function shouldIgnoreClick(event: PointerEvent) {
		return toArray(ignore).some((target) => {
			const _target = normalizeValue(target);

			return _target && (event.target === _target || event.composedPath().includes(_target));
		});
	}
}
