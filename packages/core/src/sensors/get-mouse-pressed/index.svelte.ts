import { handleEventListener } from '../../browser/index.js';
import { defaultWindow } from '../../__internal__/configurable.js';

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
	 * Only trigger if the click happened inside `target`.
	 * @default window
	 */
	target?: HTMLElement;
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
	 */
	onPressed?: (event: GetMousePressedPressAndReleaseEvent<EnableTouch, EnableDrag>) => void;
	/**
	 * Callback for when the mouse/tap is released.
	 */
	onReleased?: (event: GetMousePressedPressAndReleaseEvent<EnableTouch, EnableDrag>) => void;
};

type GetMousePressedType = 'mouse' | 'touch' | null;

type GetMousePressedReturn = {
	readonly isPressed: boolean;
	readonly type: GetMousePressedType;
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
		target = defaultWindow,
		enableTouch = true,
		enableDrag = true,
		onPressed = () => {},
		onReleased = () => {}
	} = options;

	let _isPressed = $state(false);
	let _type = $state<GetMousePressedType>(null);

	if (target) {
		handleEventListener<MouseEvent>(target, 'mousedown', _onPressed('mouse'), {
			passive: true
		});

		handleEventListener<MouseEvent>(window, 'mouseleave', _onReleased, { passive: true });
		handleEventListener<MouseEvent>(window, 'mouseup', _onReleased, { passive: true });

		if (enableDrag) {
			handleEventListener<DragEvent>(target, 'dragstart', _onPressed('mouse'), {
				passive: true
			});

			handleEventListener<DragEvent>(window, 'drop', _onReleased, { passive: true });
			handleEventListener<DragEvent>(window, 'dragend', _onReleased, { passive: true });
		}

		if (enableTouch) {
			handleEventListener<TouchEvent>(target, 'touchstart', _onPressed('touch'), {
				passive: true
			});

			handleEventListener<TouchEvent>(window, 'touchend', _onReleased, { passive: true });
			handleEventListener<TouchEvent>(window, 'touchcancel', _onReleased, { passive: true });
		}
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

	return {
		get isPressed() {
			return _isPressed;
		},
		get type() {
			return _type;
		}
	};
}
