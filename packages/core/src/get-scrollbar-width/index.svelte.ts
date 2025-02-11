import { untrack } from 'svelte';
import { handleEventListener } from '../handle-event-listener/index.svelte.js';
import { observeResize } from '../observe-resize/index.svelte.js';
import { observeMutation } from '../observe-mutation/index.svelte.js';
import { normalizeValue } from '../__internal__/utils.svelte.js';
import type { CleanupFunction, MaybeGetter } from '../__internal__/types.js';

type GetScrollbarWidthReturn = {
	readonly x: number;
	readonly y: number;
	cleanup: CleanupFunction;
};

/**
 * Gets the scrollbar width of an element.
 * @param element The element on which to get the scrollbar width from.
 * @see https://svelte-librarian.github.io/sv-use/core/get-scrollbar-width
 */
export function getScrollbarWidth(
	element: MaybeGetter<HTMLElement | null | undefined>
): GetScrollbarWidthReturn {
	let cleanups: CleanupFunction[] = [];

	let x = $state<number>(0);
	let y = $state<number>(0);
	const _target = $derived(normalizeValue(element));

	$effect(() => untrack(() => calculate()));

	$effect(() => {
		if (_target) {
			cleanups.push(handleEventListener('resize', calculate));
		}

		return cleanup;
	});

	cleanups.push(
		observeResize(() => _target, calculate, { autoCleanup: false }).cleanup,
		observeMutation(() => _target, calculate, { autoCleanup: false, attributes: true }).cleanup
	);

	function calculate() {
		if (!_target) return;

		x = _target.offsetWidth - _target.clientWidth;
		y = _target.offsetHeight - _target.clientHeight;
	}

	function cleanup() {
		cleanups.forEach((fn) => fn());
		cleanups = [];
	}

	return {
		get x() {
			return x;
		},
		get y() {
			return y;
		},
		cleanup
	};
}
