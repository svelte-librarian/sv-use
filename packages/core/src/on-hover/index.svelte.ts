import { handleEventListener } from '../handle-event-listener/index.svelte.js';
import { noop } from '../__internal__/utils.svelte.js';
import type { MaybeGetter } from '../__internal__/types.js';

type OnHoverOptions = {
	/**
	 * A delay before triggering the callback.
	 * @default undefined
	 */
	delay?: number;
	/**
	 * Whether to use `mouseover` and `mouseout` events or not.
	 *
	 * If `false`, uses `mouseenter` and `mouseleave` events.
	 * @default false
	 */
	dirty?: boolean;
	onLeave?(event: MouseEvent): void;
};

type OnHoverReturn = {
	readonly current: boolean;
};

/**
 * Tracks whether the given element is hovered or not.
 * @param element The element on which to detect the hover.
 * @param options Additional options to customize the behavior.
 * @see https://svelte-librarian.github.io/sv-use/docs/core/on-hover
 */
export function onHover(
	element: MaybeGetter<HTMLElement | null | undefined>,
	options?: OnHoverOptions
): OnHoverReturn;

/**
 * Tracks whether the given element is hovered or not and runs a callback if `true`.
 * @param element The element on which to detect the hover.
 * @param callback The callback to run if the element is hovered.
 * @param options Additional options to customize the behavior.
 * @see https://svelte-librarian.github.io/sv-use/docs/core/on-hover
 */
export function onHover(
	element: MaybeGetter<HTMLElement | null | undefined>,
	callback: (event: MouseEvent) => void,
	options?: OnHoverOptions
): OnHoverReturn;

export function onHover(
	element: MaybeGetter<HTMLElement | null | undefined>,
	callbackOrOptions?: ((event: MouseEvent) => void) | OnHoverOptions,
	optionsOrNever?: OnHoverOptions
): OnHoverReturn {
	let timeout: ReturnType<typeof setTimeout>;
	let callback: (event: MouseEvent) => void = noop;
	let options: OnHoverOptions = { delay: undefined, onLeave: noop, dirty: false };

	if (callbackOrOptions && typeof callbackOrOptions === 'function') {
		callback = callbackOrOptions;
		options = {
			...options,
			...(optionsOrNever ?? {})
		};
	} else if (callbackOrOptions && typeof callbackOrOptions === 'object') {
		options = {
			...options,
			...(callbackOrOptions ?? {})
		};
	}

	let current = $state(false);

	handleEventListener(element, options.dirty ? 'mouseover' : 'mouseenter', (event) => {
		clearTimeout(timeout);

		if (options.delay) {
			timeout = setTimeout(() => {
				current = true;
				callback(event);
			}, options.delay);
		} else {
			current = true;
			callback(event);
		}
	});

	handleEventListener(element, options.dirty ? 'mouseout' : 'mouseleave', (event) => {
		clearTimeout(timeout);

		current = false;
		options.onLeave?.(event);
	});

	return {
		get current() {
			return current;
		}
	};
}
