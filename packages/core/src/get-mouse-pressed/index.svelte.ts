import { handleEventListener } from '../handle-event-listener/index.svelte.js';
import { defaultWindow, type ConfigurableWindow } from '../__internal__/configurable.js';
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

interface GetMousePressedOptions<EnableTouch extends boolean, EnableDrag extends boolean>
	extends ConfigurableWindow {
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
}

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
 * @see https://svelte-librarian.github.io/sv-use/docs/core/get-mouse-pressed
 */
export function getMousePressed<
	EnableTouch extends boolean = true,
	EnableDrag extends boolean = true
>(options: GetMousePressedOptions<EnableTouch, EnableDrag> = {}): GetMousePressedReturn {
	const {
		target = defaultWindow,
		window = defaultWindow,
		enableTouch = true,
		enableDrag = true,
		onPressed = () => {},
		onReleased = () => {}
	} = options;

	const cleanups: CleanupFunction[] = [];

	let _isPressed = $state(false);
	let _type = $state<GetMousePressedType>(null);

	handleEventListener(target, 'mousedown', _onPressed('mouse'), { passive: true });
	handleEventListener(window, 'mouseleave', _onReleased, { passive: true });
	handleEventListener(window, 'mouseup', _onReleased, { passive: true });

	if (enableDrag) {
		handleEventListener(target, 'dragstart', _onPressed('mouse'), { passive: true });
		handleEventListener(window, 'drop', _onReleased, { passive: true });
		handleEventListener(window, 'dragend', _onReleased, { passive: true });
	}

	if (enableTouch) {
		handleEventListener(target, 'touchstart', _onPressed('touch'), { passive: true });
		handleEventListener(window, 'touchend', _onReleased, { passive: true });
		handleEventListener(window, 'touchcancel', _onReleased, { passive: true });
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
