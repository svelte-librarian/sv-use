import { normalizeValue, toArray } from '../../__internal__/utils.js';
import { isSupported } from '../../__internal__/is.svelte.js';
import { defaultWindow, type ConfigurableWindow } from '../../__internal__/configurable.js';
import type { Arrayable, CleanupFunction, MaybeGetter } from '../../__internal__/types.js';

type ResizeObserverSize = {
	readonly inlineSize: number;
	readonly blockSize: number;
};

type ResizeObserverEntry = {
	readonly target: Element;
	readonly contentRect: DOMRectReadOnly;
	readonly borderBoxSize: ReadonlyArray<ResizeObserverSize>;
	readonly contentBoxSize: ReadonlyArray<ResizeObserverSize>;
	readonly devicePixelContentBoxSize: ReadonlyArray<ResizeObserverSize>;
};

type ResizeObserverCallback = (
	entries: ReadonlyArray<ResizeObserverEntry>,
	observer: ResizeObserver
) => void;

interface ObserveResizeOptions extends ConfigurableWindow {
	/**
	 * Sets which box model the observer will observe changes to. Possible values
	 * are `content-box` (the default), `border-box` and `device-pixel-content-box`.
	 *
	 * @default 'content-box'
	 */
	box?: ResizeObserverBoxOptions;
}

declare class ResizeObserver {
	constructor(callback: ResizeObserverCallback);
	disconnect(): void;
	observe(target: Element, options?: ObserveResizeOptions): void;
	unobserve(target: Element): void;
}

type ObserveResizeReturn = {
	/** Whether the {@link https://developer.mozilla.org/en-US/docs/Web/API/ResizeObserver | `Resize Observer API`} is supported or not. */
	readonly isSupported: boolean;
	/** A function to cleanup the observer. */
	cleanup: CleanupFunction;
};

/**
 * Watch for changes to the dimensions of a given element's content or its border-box.
 * @param target The target to watch.
 * @param callback The callback for when an element's dimensions changes.
 * @param options Additional options to customize the behavior.
 * @see https://svelte-librarian.github.io/sv-use/docs/core/observers/observe-resize
 */
export function observeResize(
	target: MaybeGetter<HTMLElement | undefined>,
	callback: ResizeObserverCallback,
	options?: ObserveResizeOptions
): ObserveResizeReturn;

/**
 * Watch for changes to the dimensions of the given elements' content or their border-box.
 * @param targets The targets to watch.
 * @param callback The callback for when an element's dimensions changes.
 * @param options Additional options to customize the behavior.
 * @see https://svelte-librarian.github.io/sv-use/docs/core/observers/observe-resize
 */
export function observeResize(
	targets: Array<MaybeGetter<HTMLElement | undefined>>,
	callback: ResizeObserverCallback,
	options?: ObserveResizeOptions
): ObserveResizeReturn;

export function observeResize(
	targets: Arrayable<MaybeGetter<HTMLElement | undefined>>,
	callback: ResizeObserverCallback,
	options: ObserveResizeOptions = {}
): ObserveResizeReturn {
	const { window = defaultWindow, ...observerOptions } = options;

	let _observer: ResizeObserver | undefined;

	const _isSupported = isSupported(() => window !== undefined && 'ResizeObserver' in window);
	const _targets = $derived(toArray(targets).map<HTMLElement | undefined>(normalizeValue));

	$effect(() => {
		cleanup();

		if (_isSupported.current && window) {
			_observer = new ResizeObserver(callback);

			for (const el of _targets) {
				if (el) {
					_observer!.observe(el, observerOptions);
				}
			}
		}
	});

	function cleanup() {
		if (!_observer) return;

		_observer.disconnect();
		_observer = undefined;
	}

	return {
		get isSupported() {
			return _isSupported.current;
		},
		cleanup
	};
}
