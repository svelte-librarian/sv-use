import { untrack } from 'svelte';
import { handleEventListener } from '../handle-event-listener/index.svelte.js';
import { observeResize } from '../observe-resize/index.svelte.js';
import { observeMutation } from '../observe-mutation/index.svelte.js';
import { normalizeValue } from '../__internal__/utils.svelte.js';
import type { MaybeGetter } from '../__internal__/types.js';

type GetScrollbarWidthReturn = {
	readonly x: number;
	readonly y: number;
};

/**
 * Gets the scrollbar width of an element.
 * @param element The element on which to get the scrollbar width from.
 * @see https://svelte-librarian.github.io/sv-use/core/get-scrollbar-width
 */
export function getScrollbarWidth(
	element: MaybeGetter<HTMLElement | null | undefined>
): GetScrollbarWidthReturn {
	let x = $state<number>(0);
	let y = $state<number>(0);

	handleEventListener(element, 'resize', calculate);

	observeResize(element, calculate, { autoCleanup: false });
	observeMutation(element, calculate, { autoCleanup: false, attributes: true });

	$effect(() => untrack(() => calculate()));

	function calculate() {
		const _element = normalizeValue(element);

		if (!_element) return;

		x = _element.offsetWidth - _element.clientWidth;
		y = _element.offsetHeight - _element.clientHeight;
	}

	return {
		get x() {
			return x;
		},
		get y() {
			return y;
		}
	};
}
