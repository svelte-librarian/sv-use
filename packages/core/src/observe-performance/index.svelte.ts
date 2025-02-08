import { isSupported } from '../__internal__/is.svelte.js';
import { defaultWindow, type ConfigurableWindow } from '../__internal__/configurable.js';
import type { CleanupFunction } from '../__internal__/types.js';

// Extracted from https://developer.mozilla.org/en-US/docs/Web/API/PerformanceEntry/entryType#value
export const performanceEntryTypes = [
	'element',
	'event',
	'first-input',
	'largest-contentful-paint',
	'layout-shift',
	'long-animation-frame',
	'longtask',
	'mark',
	'measure',
	'navigation',
	'paint',
	'resource',
	'taskattribution',
	'visibility-state'
] as const;

export type PerformanceEntryType = (typeof performanceEntryTypes)[number];

interface ObservePerformanceOptions extends ConfigurableWindow {
	/**
	 * Whether to start the observer immediately or not.
	 * @default true
	 */
	immediate?: boolean;
	/**
	 * A single string specifying exactly one performance entry type to observe.
	 *
	 * May not be used together with the {@link entryTypes} option.
	 */
	type?: PerformanceEntryType;
	/**
	 * A boolean flag to indicate whether buffered entries should be queued into the observer's buffer.
	 *
	 * Must be used only with the {@link type} option.
	 * @default false
	 */
	buffered?: boolean;
	/**
	 * A {@link DOMHighResTimeStamp} defining the threshold for {@link https://developer.mozilla.org/en-US/docs/Web/API/PerformanceEventTiming | PerformanceEventTiming} entries.
	 *
	 * Defaults to 104ms and is rounded to the nearest of 8ms. Lowest possible threshold is 16ms.
	 *
	 * May not be used together with the {@link entryTypes} option.
	 */
	durationThreshold?: DOMHighResTimeStamp;
	/**
	 * An array of strings, each specifying one performance entry type to observe.
	 *
	 * Unrecognized types are ignored, though the browser may output a warning message to the console to help developers debug their code. If no valid types are found, observe() has no effect.
	 */
	entryTypes?: PerformanceEntryType[];
}

interface ObservePerformanceReturn {
	/** Whether the {@link https://developer.mozilla.org/en-US/docs/Web/API/PerformanceObserver `Performance Observer API`} is supported or not. */
	readonly isSupported: boolean;
	/**
	 * Resumes the performance observer.
	 *
	 * Is called automatically if `options.immediate` is set to `true`.
	 */
	resume: () => void;
	/**
	 * Pauses the observer.
	 *
	 * Can be restarted with {@link resume | `resume`}.
	 */
	pause: () => void;
	/** Cleans up the observer. */
	cleanup: CleanupFunction;
}

/**
 * Observes performance metrics.
 * @param callback The callback for when performance entry events are recorded.
 * @param options Additional options to customize the behavior.
 * @see https://svelte-librarian.github.io/sv-use/docs/core/observe-performance
 */
export function observePerformance(
	callback: PerformanceObserverCallback,
	options: ObservePerformanceOptions
): ObservePerformanceReturn {
	const { window = defaultWindow, immediate = true, ...performanceOptions } = options;

	let _observer: PerformanceObserver | undefined;

	const _isSupported = isSupported(() => window !== undefined && 'PerformanceObserver' in window);

	if (immediate) {
		resume();
	}

	function resume() {
		if (!_isSupported.current) return;

		cleanup();

		if (!_observer) {
			_observer = new PerformanceObserver(callback);
		}

		_observer.observe(performanceOptions);
	}

	function pause() {
		_observer?.disconnect();
	}

	function cleanup() {
		_observer?.disconnect();
		_observer = undefined;
	}

	return {
		get isSupported() {
			return _isSupported.current;
		},
		resume,
		pause,
		cleanup
	};
}
