import { handleEventListener } from '../handle-event-listener/index.svelte.js';
import { toArray } from '../__internal__/utils.svelte.js';
import { defaultWindow, type ConfigurableWindow } from '../__internal__/configurable.js';
import type { Arrayable, CleanupFunction, Getter } from '../__internal__/types.js';
import { onDestroy } from 'svelte';

interface OnClickOutsideOptions extends ConfigurableWindow {
	/**
	 * Whether to auto-cleanup the event listeners or not.
	 *
	 * If set to `true`, it must run in the component initialization lifecycle.
	 * @default false
	 */
	autoCleanup?: boolean;
	/**
	 * Use capturing phase for internal event listener.
	 * @default true
	 */
	capture?: boolean;
	/**
	 * Element(s) that will not trigger the event.
	 * @default []
	 */
	ignore?: Arrayable<Getter<HTMLElement | null | undefined>>;
}

/**
 * Runs a callback when a click occurs outside the element or its ignore list.
 * @param element The main element on which not to trigger a click.
 * @param callback The callback to run when an outside click is valid.
 * @param options Additional options to customize the behavior.
 * @see https://svelte-librarian.github.io/sv-use/docs/core/on-click-outside
 */
export function onClickOutside<T extends HTMLElement>(
	element: Getter<T | null | undefined>,
	callback: (event: PointerEvent) => void,
	options: OnClickOutsideOptions = {}
): CleanupFunction {
	const { autoCleanup = false, capture = true, ignore = [], window = defaultWindow } = options;

	let shouldListen: boolean = true;
	let isProcessingClick: boolean = false;
	const cleanups: CleanupFunction[] = [];

	if (window) {
		cleanups.push(
			handleEventListener(
				window,
				'click',
				(event: PointerEvent) => {
					if (!isProcessingClick) {
						isProcessingClick = true;

						setTimeout(() => {
							isProcessingClick = false;
						}, 0);

						handleClick(event);
					}
				},
				{ passive: true, capture }
			),
			handleEventListener(
				window,
				'pointerdown',
				(e) => {
					const el = element();
					shouldListen = !shouldIgnoreClick(e) && !!(el && !e.composedPath().includes(el));
				},
				{ passive: true }
			)
		);
	}

	if (autoCleanup) {
		onDestroy(() => {
			cleanup();
		});
	}

	function handleClick(event: PointerEvent) {
		const el = element();

		if (!event.target) return;
		if (!el || el === event.target || event.composedPath().includes(el)) return;

		if (event.detail === 0) {
			shouldListen = !shouldIgnoreClick(event);
		}

		if (!shouldListen) {
			shouldListen = true;
			return;
		}

		callback(event);
	}

	function shouldIgnoreClick(event: PointerEvent) {
		return toArray(ignore).some((target) => {
			const el = target();
			return el && (event.target === el || event.composedPath().includes(el));
		});
	}

	function cleanup() {
		cleanups.forEach((fn) => fn());
	}

	return cleanup;
}
