import { onDestroy } from 'svelte';
import { handleEventListener } from '../handle-event-listener/index.svelte.js';
import { defaultWindow, type ConfigurableWindow } from '../__internal__/configurable.js';
import type { CleanupFunction } from '../__internal__/types.js';

interface HasLeftPageOptions extends ConfigurableWindow {
	/**
	 * Whether to automatically clean up the event listeners or not.
	 *
	 * If set to `true`, it must run in the component initialization lifecycle.
	 * @default true
	 */
	autoCleanup?: boolean;
}

type HasLeftPageReturn = {
	readonly current: boolean;
	/**
	 * Cleans up the event listeners.
	 * @note Is called automatically if `options.autoCleanup` is set to `true`.
	 */
	cleanup: CleanupFunction;
};

/**
 * Whether the mouse has left the page or not.
 * @param options Additional options to customize the behavior.
 * @see https://svelte-librarian.github.io/sv-use/docs/core/sensors/has-left-page
 */
export function hasLeftPage(options: HasLeftPageOptions = {}): HasLeftPageReturn {
	const { autoCleanup = true, window = defaultWindow } = options;

	const cleanups: CleanupFunction[] = [];
	let _current = $state(false);

	const handler = (event: MouseEvent) => {
		if (!window) return;

		event = event || (window.event as unknown);
		// @ts-expect-error missing types
		const from = event.relatedTarget || event.toElement;

		_current = !from;
	};

	if (window) {
		cleanups.push(
			handleEventListener(window, 'mouseout', handler, {
				autoCleanup,
				passive: true
			}),
			handleEventListener(document, ['mouseleave', 'mouseenter'], handler, {
				autoCleanup,
				passive: true
			})
		);
	}

	if (autoCleanup) {
		onDestroy(() => cleanup());
	}

	function cleanup() {
		cleanups.forEach((cleanup) => cleanup());
	}

	return {
		get current() {
			return _current;
		},
		cleanup
	};
}
