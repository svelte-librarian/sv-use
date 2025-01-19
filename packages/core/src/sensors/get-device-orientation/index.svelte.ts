import { onDestroy } from 'svelte';
import { handleEventListener } from '../../browser/index.js';
import { isSupported } from '../../__internal__/is.svelte.js';
import { noop } from '../../__internal__/utils.js';
import type { CleanupFunction } from '../../__internal__/types.js';

type GetDeviceOrientationOptions = {
	/**
	 * Whether to auto-cleanup the event listener or not.
	 *
	 * If set to `true`, it must run in the component initialization lifecycle.
	 * @default true
	 */
	autoCleanup?: boolean;
};

type GetDeviceOrientationReturn = {
	readonly isSupported: boolean;
	/** Whether or not the device is providing orientation data absolutely or not. */
	readonly isAbsolute: boolean;
	/** The motion of the device around the z axis, express in degrees with values ranging from 0 (inclusive) to 360 (exclusive). */
	readonly alpha: number;
	/** The motion of the device around the x axis, express in degrees with values ranging from -180 (inclusive) to 180 (exclusive). */
	readonly beta: number;
	/** The motion of the device around the y axis, express in degrees with values ranging from -90 (inclusive) to 90 (exclusive). */
	readonly gamma: number;
	/**
	 * Cleans up the event listener.
	 * @note Is called automatically if `options.autoCleanup` is set to `true`.
	 */
	cleanup: CleanupFunction;
};

/**
 * Provides web developers with information from the physical orientation of the device running the web page.
 * @see https://svelte-librarian.github.io/sv-use/docs/core/sensors/get-device-orientation
 */
export function getDeviceOrientation(
	options: GetDeviceOrientationOptions = {}
): GetDeviceOrientationReturn {
	const { autoCleanup = true } = options;

	let cleanup: CleanupFunction = noop;

	const _isSupported = isSupported(() => window && 'DeviceOrientationEvent' in window);
	let _isAbsolute = $state<boolean>(false);
	let _alpha = $state<number>(0);
	let _beta = $state<number>(0);
	let _gamma = $state<number>(0);

	if (_isSupported.current) {
		cleanup = handleEventListener('deviceorientation', onDeviceOrientation, { autoCleanup });
	}

	if (autoCleanup) {
		onDestroy(() => cleanup());
	}

	function onDeviceOrientation(event: DeviceOrientationEvent) {
		_isAbsolute = event.absolute;
		_alpha = event.alpha!;
		_beta = event.beta!;
		_gamma = event.gamma!;
	}

	return {
		get isSupported() {
			return _isSupported.current;
		},
		get isAbsolute() {
			return _isAbsolute;
		},
		get alpha() {
			return _alpha;
		},
		get beta() {
			return _beta;
		},
		get gamma() {
			return _gamma;
		},
		cleanup
	};
}
