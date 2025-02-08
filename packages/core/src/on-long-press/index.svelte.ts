import { onDestroy } from 'svelte';
import { handleEventListener } from '../handle-event-listener/index.svelte.js';
import { noop, normalizeValue } from '../__internal__/utils.svelte.js';
import type { CleanupFunction, MaybeGetter } from '../__internal__/types.js';

type Position = {
	x: number;
	y: number;
};

type OnLongPressOptions = {
	/**
	 * Whether to auto-cleanup the event listeners or not.
	 *
	 * If set to `true`, it must run in the component initialization lifecycle.
	 * @default true
	 */
	autoCleanup?: boolean;
	/**
	 * Time in milliseconds before the `handler` gets called.
	 * @default 500
	 */
	delay?: number;
	/**
	 * Allowance of moving distance in pixels.
	 *
	 * The action will get canceled when moving too far from the pointerdown position.
	 * @default 10
	 */
	distanceThreshold?: number;
	modifiers?: OnLongPressModifiers;
	/**
	 * The callback for when the pointer is released.
	 * @param duration How long the element was pressed for in milliseconds.
	 * @param distance The distance travelled from the pointerdown position.
	 * @param isLongPress Whether the action was a long press or not.
	 */
	onMouseUp?(duration: number, distance: number, isLongPress: boolean): void;
};

type OnLongPressModifiers = {
	/**
	 * Whether to dispatch to the registered listener before being dispatched to any `EventTarget` beneath it in the DOM tree or not.
	 *
	 * Will be used in the event listeners' options.
	 * @default false
	 */
	capture?: boolean;
	/**
	 * Whether the event listener should be invoked at most once after being added or not.
	 *
	 * Will be used in the event listeners' options.
	 * @default false
	 */
	once?: boolean;
	/**
	 * Whether to call `event.preventDefault()` when an event occurs or not.
	 * @default false
	 */
	preventDefault?: boolean;
	/**
	 * Whether the listener should only be invoked if the `event.target` is the given element or not.
	 */
	self?: boolean;
	/**
	 * Whether to call `event.stopPropagation()` when an event occurs or not.
	 * @default false
	 */
	stopPropagation?: boolean;
};

/**
 * Runs a callback when a long press occurs on a given element.
 * @param target The element on which to attach the long press.
 * @param handler The callback to execute.
 * @param options Additional options to customize the behavior.
 * @returns A cleanup function.
 * @see https://svelte-librarian.github.io/sv-use/docs/core/sensors/on-long-press
 */
export function onLongPress(
	target: MaybeGetter<HTMLElement | null | undefined>,
	handler: (event: PointerEvent) => void,
	options: OnLongPressOptions = {}
): CleanupFunction {
	const { autoCleanup = true, delay = 500, distanceThreshold = 10, onMouseUp = noop } = options;
	const modifiers: OnLongPressModifiers = {
		capture: false,
		once: false,
		preventDefault: false,
		self: false,
		stopPropagation: false,
		...(options.modifiers ?? {})
	};

	let cleanups: CleanupFunction[] = [];
	const listenerOptions: Parameters<typeof handleEventListener>['3'] = {
		capture: modifiers.capture,
		once: modifiers.once,
		autoCleanup
	};
	let timeout: ReturnType<typeof setTimeout> | undefined;
	let startPosition: Position | undefined;
	let startTimestamp: number | undefined;
	let isLongPress = false;

	const _target = $derived(normalizeValue(target));

	$effect(() => {
		if (_target) {
			(cleanups = [] as CleanupFunction[]).push(
				handleEventListener(_target!, 'pointerdown', onDown, listenerOptions),
				handleEventListener(_target!, 'pointermove', onMove, listenerOptions),
				handleEventListener(_target!, ['pointerup', 'pointerleave'], onRelease, listenerOptions)
			);
		}
	});

	if (autoCleanup) {
		onDestroy(() => cleanup());
	}

	function onDown(event: PointerEvent) {
		if (modifiers.self && event.target !== _target) return;

		reset();

		if (modifiers.preventDefault) event.preventDefault();
		if (modifiers.stopPropagation) event.stopPropagation();

		startPosition = {
			x: event.x,
			y: event.y
		};
		startTimestamp = event.timeStamp;

		timeout = setTimeout(() => {
			isLongPress = true;
			handler(event);
		}, delay);
	}

	function onMove(event: PointerEvent) {
		if (modifiers.self && event.target !== _target) return;
		if (!startPosition || !distanceThreshold) return;

		if (modifiers.preventDefault) event.preventDefault();
		if (modifiers.stopPropagation) event.stopPropagation();

		const dx = event.x - startPosition.x;
		const dy = event.y - startPosition.y;
		const distance = Math.sqrt(dx * dx + dy * dy);

		if (distance >= distanceThreshold) {
			reset();
		}
	}

	function onRelease(event: PointerEvent) {
		const [_startTimestamp, _startPosition, _hasLongPressed] = [
			startTimestamp,
			startPosition,
			isLongPress
		];
		reset();

		if (!onMouseUp || !_startPosition || !_startTimestamp) return;
		if (modifiers.self && event.target !== _target) return;

		if (modifiers.preventDefault) event.preventDefault();
		if (modifiers.stopPropagation) event.stopPropagation();

		const dx = event.x - _startPosition.x;
		const dy = event.y - _startPosition.y;
		const distance = Math.sqrt(dx * dx + dy * dy);

		onMouseUp(event.timeStamp - _startTimestamp, distance, _hasLongPressed);
	}

	function reset() {
		if (timeout) {
			clearTimeout(timeout);
			timeout = undefined;
		}

		startPosition = undefined;
		startTimestamp = undefined;
		isLongPress = false;
	}

	function cleanup() {
		cleanups.forEach((fn) => fn());
		reset();
	}

	return cleanup;
}
