import { onMount } from 'svelte';

type GetMouseOptions = {
	/** The initial value for the position of the mouse. */
	initial: { x: number; y: number };
	/** A callback for when the mouse moves. */
	onMove?: (event: MouseEvent) => void;
};

type GetMouseReturn = {
	/** The horizontal position of the mouse. */
	readonly x: number;
	/** The vertical position of the mouse. */
	readonly y: number;
};

const DEFAULT_INITIAL = { x: 0, y: 0 };

/**
 * Retrieves information about the mouse.
 * @param options Additional options to customize the behavior.
 */
export function getMouse(options?: GetMouseOptions): GetMouseReturn {
	const DEFAULT_ON_MOVE = (event: MouseEvent) => {
		_x = event.pageX;
		_y = event.pageY;
	};

	const initial = options?.initial ?? DEFAULT_INITIAL;
	const onMove = options?.onMove ?? DEFAULT_ON_MOVE;

	let _x = $state<number>(initial.x);
	let _y = $state<number>(initial.y);

	onMount(() => {
		window.addEventListener('mousemove', onMove);

		return () => {
			window.removeEventListener('mousemove', onMove);
		};
	});

	return {
		get x() {
			return _x;
		},
		get y() {
			return _y;
		}
	};
}
