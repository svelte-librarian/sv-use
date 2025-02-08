import { onDestroy } from 'svelte';
import { BROWSER } from 'esm-env';
import { handleEventListener } from '../handle-event-listener/index.svelte.js';
import { noop } from '../__internal__/utils.svelte.js';
import type { CleanupFunction } from '../__internal__/types.js';

type GetMouseOptions = {
	/**
	 * Whether to auto-cleanup the event listener or not.
	 *
	 * If set to `true`, it must run in the component initialization lifecycle.
	 * @default true
	 */
	autoCleanup?: boolean;
	/**
	 * The initial position of the mouse.
	 * @default { x: 0; y: 0 }
	 */
	initial?: { x: number; y: number };
	/**
	 * A callback for when the mouse moves.
	 * @default () => {}
	 */
	onMove?: (event: MouseEvent) => void;
};

type GetMouseReturn = {
	/** The horizontal position of the mouse. */
	readonly x: number;
	/** The vertical position of the mouse. */
	readonly y: number;
	/**
	 * Cleans up the event listener.
	 * @note Is called automatically if `options.autoCleanup` is set to `true`.
	 */
	cleanup: CleanupFunction;
};

/**
 * Retrieves information about the mouse.
 * @param options Additional options to customize the behavior.
 * @see https://svelte-librarian.github.io/sv-use/docs/core/get-mouse
 */
export function getMouse(options: GetMouseOptions = {}): GetMouseReturn {
	const { autoCleanup = true, initial = { x: 0, y: 0 }, onMove = noop } = options;

	let cleanup: CleanupFunction = noop;

	let _x = $state<number>(initial.x);
	let _y = $state<number>(initial.y);

	if (BROWSER) {
		cleanup = handleEventListener('mousemove', onMouseMove, { autoCleanup });
	}

	if (autoCleanup) {
		onDestroy(() => cleanup());
	}

	function onMouseMove(event: MouseEvent) {
		_x = event.pageX;
		_y = event.pageY;

		onMove(event);
	}

	return {
		get x() {
			return _x;
		},
		get y() {
			return _y;
		},
		cleanup
	};
}
