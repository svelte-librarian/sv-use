import { handleEventListener } from '../handle-event-listener/index.svelte.js';
import { noop, normalizeValue } from '../__internal__/utils.svelte.js';
import type { ConfigurableWindow } from '../__internal__/configurable.js';
import type { CleanupFunction, MaybeGetter } from '../__internal__/types.js';

type Position = { x: number; y: number };

type OnSwipeDirection = 'up' | 'down' | 'left' | 'right' | 'none';

interface OnSwipeOptions extends ConfigurableWindow {
	/**
	 * Whether to register events as passive or not.
	 * @default true
	 */
	passive?: boolean;
	/**
	 * The treshold in pixels before considering the touch event as a swipe.
	 * @default 50
	 */
	threshold?: number;
	/**
	 * Callback on swipe start.
	 * @default () => {}
	 */
	onStart?(e: TouchEvent): void;
	/**
	 * Callback on swipe move.
	 * @default () => {}
	 */
	onMove?(e: TouchEvent): void;
	/**
	 * Callback on swipe end.
	 * @default () => {}
	 */
	onEnd?(e: TouchEvent, direction: OnSwipeDirection): void;
}

type OnSwipeReturn = {
	readonly isSwiping: boolean;
	readonly direction: OnSwipeDirection;
	readonly coordsStart: Position;
	readonly coordsEnd: Position;
	/** The distance travelled by the swipe in the `x` axis. */
	readonly lengthX: number;
	/** The distance travelled by the swipe in the `y` axis. */
	readonly lengthY: number;
	reset: () => void;
	cleanup: () => void;
};

/**
 * Reactive swipe detection for mobile devices.
 * @param target The target on which to detect swipe events.
 * @param options Additional options to customize the behavior.
 * @see https://svelte-librarian.github.io/sv-use/docs/core/on-swipe
 */
export function onSwipe(
	target: MaybeGetter<EventTarget | null | undefined>,
	options: OnSwipeOptions = {}
): OnSwipeReturn {
	const { passive = true, threshold = 50, onStart = noop, onMove = noop, onEnd = noop } = options;

	const listenerOptions = { passive, capture: !passive };
	let cleanups: CleanupFunction[] = [];

	let isSwiping = $state(false);
	let coordsStart = $state<Position>({ x: 0, y: 0 });
	let coordsEnd = $state<Position>({ x: 0, y: 0 });

	const _target = $derived(normalizeValue(target));
	const diffX = $derived(coordsStart.x - coordsEnd.x);
	const diffY = $derived(coordsStart.y - coordsEnd.y);

	const isThresholdExceeded = $derived.by(() => {
		return Math.max(Math.abs(diffX), Math.abs(diffY)) >= threshold;
	});

	const direction = $derived.by<OnSwipeDirection>(() => {
		if (!isThresholdExceeded) return 'none';

		if (Math.abs(diffX) > Math.abs(diffY)) {
			return diffX > 0 ? 'left' : 'right';
		} else {
			return diffY > 0 ? 'up' : 'down';
		}
	});

	$effect(() => {
		if (_target) {
			cleanups = [
				handleEventListener(_target, 'touchstart', onTouchStart, listenerOptions),
				handleEventListener(_target, 'touchmove', onTouchMove, listenerOptions),
				handleEventListener(_target, ['touchend', 'touchcancel'], onTouchEnd, listenerOptions)
			];
		}

		return cleanup;
	});

	function getTouchEventCoords(e: TouchEvent) {
		return [e.touches[0].clientX, e.touches[0].clientY];
	}

	function updateCoordsStart(x: number, y: number) {
		coordsStart.x = x;
		coordsStart.y = y;
	}

	function updateCoordsEnd(x: number, y: number) {
		coordsEnd.x = x;
		coordsEnd.y = y;
	}

	function onTouchStart(event: TouchEvent) {
		if (event.touches.length !== 1) return;

		const [x, y] = getTouchEventCoords(event);

		updateCoordsStart(x, y);
		updateCoordsEnd(x, y);

		onStart(event);
	}

	function onTouchMove(event: TouchEvent) {
		if (event.touches.length !== 1) return;

		const [x, y] = getTouchEventCoords(event);

		updateCoordsEnd(x, y);

		if (listenerOptions.capture && !listenerOptions.passive && Math.abs(diffX) > Math.abs(diffY)) {
			event.preventDefault();
		}

		if (!isSwiping && isThresholdExceeded) {
			isSwiping = true;
		}

		if (isSwiping) {
			onMove(event);
		}
	}

	function onTouchEnd(event: TouchEvent) {
		if (isSwiping) {
			onEnd(event, direction);
		}

		isSwiping = false;
	}

	function cleanup() {
		cleanups.forEach((fn) => fn());
	}

	function reset() {
		coordsStart = { x: 0, y: 0 };
		coordsEnd = { x: 0, y: 0 };
	}

	return {
		get isSwiping() {
			return isSwiping;
		},
		get direction() {
			return direction;
		},
		get coordsStart() {
			return coordsStart;
		},
		get coordsEnd() {
			return coordsEnd;
		},
		get lengthX() {
			return diffX;
		},
		get lengthY() {
			return diffY;
		},
		reset,
		cleanup
	};
}
