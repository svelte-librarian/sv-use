import { handleEventListener } from '../handle-event-listener/index.svelte.js';
import { isSupported } from '../__internal__/is.svelte.js';
import { defaultWindow, type ConfigurableWindow } from '../__internal__/configurable.js';

type GetDeviceOrientationOptions = ConfigurableWindow;

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
};

/**
 * Provides web developers with information from the physical orientation of the device running the web page.
 * @see https://svelte-librarian.github.io/sv-use/docs/core/get-device-orientation
 */
export function getDeviceOrientation(
	options: GetDeviceOrientationOptions = {}
): GetDeviceOrientationReturn {
	const { window = defaultWindow } = options;

	const _isSupported = isSupported(
		() => window !== undefined && 'DeviceOrientationEvent' in window
	);
	let _isAbsolute = $state<boolean>(false);
	let _alpha = $state<number>(0);
	let _beta = $state<number>(0);
	let _gamma = $state<number>(0);

	if (_isSupported.current) {
		handleEventListener(window!, 'deviceorientation', onDeviceOrientation, { passive: true });
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
		}
	};
}
