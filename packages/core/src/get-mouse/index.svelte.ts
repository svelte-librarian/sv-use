import { handleEventListener } from '../handle-event-listener/index.svelte.js';
import { noop } from '../__internal__/utils.svelte.js';
import { defaultWindow, type ConfigurableWindow } from '../__internal__/configurable.js';

interface GetMouseOptions extends ConfigurableWindow {
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
}

type GetMouseReturn = {
	/** The horizontal position of the mouse. */
	readonly x: number;
	/** The vertical position of the mouse. */
	readonly y: number;
};

/**
 * Retrieves information about the mouse.
 * @param options Additional options to customize the behavior.
 * @see https://svelte-librarian.github.io/sv-use/docs/core/get-mouse
 */
export function getMouse(options: GetMouseOptions = {}): GetMouseReturn {
	const { initial = { x: 0, y: 0 }, onMove = noop, window = defaultWindow } = options;

	let _x = $state<number>(initial.x);
	let _y = $state<number>(initial.y);

	handleEventListener(window, 'mousemove', onMouseMove);

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
		}
	};
}
