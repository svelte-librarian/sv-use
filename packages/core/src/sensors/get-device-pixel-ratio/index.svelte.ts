import { onDestroy } from 'svelte';
import { handleEventListener } from '../../browser/index.js';
import { noop } from '../../__internal__/utils.js';
import { isSupported } from '../../__internal__/is.svelte.js';
import type { CleanupFunction } from '../../__internal__/types.js';

type GetDevicePixelRatioOptions = {
	/**
	 * Whether to auto-cleanup the event listener or not.
	 *
	 * If set to `true`, it must run in the component initialization lifecycle.
	 * @default true
	 */
	autoCleanup?: boolean;
};

type GetDevicePixelRatioReturn = {
	/** Whether the {@link https://developer.mozilla.org/en-US/docs/Web/API/Window/devicePixelRatio | devicePixelRatio property} is supported or not. */
	readonly isSupported: boolean;
	/** The current device pixel ratio. */
	readonly current: number;
	/**
	 * Cleans up the event listener.
	 * @note Is called automatically if `options.autoCleanup` is set to `true`.
	 */
	cleanup: CleanupFunction;
};

/**
 * Returns the ratio of the resolution in physical pixels to the resolution in CSS pixels for the current display device.
 * @see https://svelte-librarian.github.io/sv-use/docs/core/sensors/get-device-pixel-ratio
 */
export function getDevicePixelRatio(
	options: GetDevicePixelRatioOptions = {}
): GetDevicePixelRatioReturn {
	const { autoCleanup = true } = options;

	let cleanup: CleanupFunction = noop;

	const _isSupported = isSupported(() => window && 'devicePixelRatio' in window);
	let _current = $state(1);

	if (_isSupported.current) {
		updatePixelRatio();
	}

	if (autoCleanup) {
		onDestroy(() => cleanup());
	}

	function updatePixelRatio() {
		_current = window.devicePixelRatio;
		cleanup();

		const media = window.matchMedia(`(resolution: ${window.devicePixelRatio}dppx)`);
		cleanup = handleEventListener(media, 'change', updatePixelRatio, { autoCleanup, once: true });
	}

	return {
		get isSupported() {
			return _isSupported.current;
		},
		get current() {
			return _current;
		},
		cleanup
	};
}
