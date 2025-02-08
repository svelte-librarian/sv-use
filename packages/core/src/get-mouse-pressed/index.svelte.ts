import { onDestroy } from 'svelte';
import { handleEventListener } from '../handle-event-listener/index.svelte.js';
import { defaultWindow } from '../__internal__/configurable.js';
import type { CleanupFunction } from '../__internal__/types.js';

type GetMousePressedPressAndReleaseEvent<
	EnableTouch extends boolean,
	EnableDrag extends boolean
> = EnableTouch extends true
	? EnableDrag extends true
		? MouseEvent | TouchEvent | DragEvent
		: MouseEvent | TouchEvent
	: EnableDrag extends true
		? MouseEvent | DragEvent
		: MouseEvent;

type GetMousePressedOptions<EnableTouch extends boolean, EnableDrag extends boolean> = {
	/**
	 * Whether to auto-cleanup the event listeners or not.
	 *
	 * If set to `true`, it must run in the component initialization lifecycle.
	 * @default true
	 */
	autoCleanup?: boolean;
	/**
	 * Only trigger if the click happened inside `target`.
	 * @default window
	 */
	target?: Window | HTMLElement;
	/**
	 * Whether to detect touch events or not.
	 * @default true
	 */
	enableTouch?: EnableTouch;
	/**
	 * Whether to detect drag events or not.
	 * @default true
	 */
	enableDrag?: EnableDrag;
	/**
	 * Callback for when the mouse/tap is pressed.
	 * @default () => {}
	 */
	onPressed?: (event: GetMousePressedPressAndReleaseEvent<EnableTouch, EnableDrag>) => void;
	/**
	 * Callback for when the mouse/tap is released.
	 * @default () => {}
	 */
	onReleased?: (event: GetMousePressedPressAndReleaseEvent<EnableTouch, EnableDrag>) => void;
};

type GetMousePressedType = 'mouse' | 'touch' | null;

type GetMousePressedReturn = {
	readonly isPressed: boolean;
	readonly type: GetMousePressedType;
	/**
	 * Cleans up the event listeners.
	 * @note Is called automatically if `options.autoCleanup` is set to `true`.
	 */
	cleanup: CleanupFunction;
};

/**
 * Reactive values for mouse/touch/drag pressing state.
 * @param options Additional options to customize the behavior.
 * @see https://svelte-librarian.github.io/sv-use/docs/core/sensors/get-mouse-pressed
 */
export function getMousePressed<
	EnableTouch extends boolean = true,
	EnableDrag extends boolean = true
>(options: GetMousePressedOptions<EnableTouch, EnableDrag> = {}): GetMousePressedReturn {
	const {
		autoCleanup = true,
		target = defaultWindow,
		enableTouch = true,
		enableDrag = true,
		onPressed = () => {},
		onReleased = () => {}
	} = options;

	const cleanups: CleanupFunction[] = [];

	let _isPressed = $state(false);
	let _type = $state<GetMousePressedType>(null);

	if (target) {
		cleanups.push(
			handleEventListener<MouseEvent>(target, 'mousedown', _onPressed('mouse'), {
				passive: true
			}),

			handleEventListener<MouseEvent>(window, 'mouseleave', _onReleased, {
				autoCleanup,
				passive: true
			}),
			handleEventListener<MouseEvent>(window, 'mouseup', _onReleased, {
				autoCleanup,
				passive: true
			})
		);

		if (enableDrag) {
			cleanups.push(
				handleEventListener<DragEvent>(target, 'dragstart', _onPressed('mouse'), {
					passive: true
				}),

				handleEventListener<DragEvent>(window, 'drop', _onReleased, { autoCleanup, passive: true }),
				handleEventListener<DragEvent>(window, 'dragend', _onReleased, {
					autoCleanup,
					passive: true
				})
			);
		}

		if (enableTouch) {
			cleanups.push(
				handleEventListener<TouchEvent>(target, 'touchstart', _onPressed('touch'), {
					passive: true
				}),

				handleEventListener<TouchEvent>(window, 'touchend', _onReleased, {
					autoCleanup,
					passive: true
				}),
				handleEventListener<TouchEvent>(window, 'touchcancel', _onReleased, {
					autoCleanup,
					passive: true
				})
			);
		}
	}

	if (autoCleanup) {
		onDestroy(() => cleanup());
	}

	function _onPressed(type: GetMousePressedType) {
		return function (event: MouseEvent | TouchEvent | DragEvent) {
			_isPressed = true;
			_type = type;

			// @ts-expect-error TS types not resolved correctly
			onPressed(event);
		};
	}

	function _onReleased(event: MouseEvent | TouchEvent | DragEvent) {
		_isPressed = false;
		_type = null;

		// @ts-expect-error TS types not resolved correctly
		onReleased(event);
	}

	function cleanup() {
		cleanups.forEach((fn) => fn());
	}

	return {
		get isPressed() {
			return _isPressed;
		},
		get type() {
			return _type;
		},
		cleanup
	};
}
