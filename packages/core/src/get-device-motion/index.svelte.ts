import { handleEventListener } from '../handle-event-listener/index.svelte.js';
import { isSupported } from '../__internal__/is.svelte.js';
import { defaultWindow, type ConfigurableWindow } from '$lib/__internal__/configurable.js';

type GetDeviceMotionOptions = ConfigurableWindow;

type GetDeviceMotionReturn = {
	/** Whether the device supports the {@link https://developer.mozilla.org/en-US/docs/Web/API/DeviceMotionEvent | `DeviceMotionEvent`} feature or not. */
	readonly isSupported: boolean;
	/**
	 * The amount of acceleration recorded by the device, in meters per second squared (m/s²).
	 *
	 * The acceleration value does not include the effect of the gravity force, in contrast to {@link GetDeviceMotionReturn.accelerationIncludingGravity | `accelerationIncludingGravity`}.
	 */
	readonly acceleration: DeviceMotionEventAcceleration;
	/**
	 * The amount of acceleration recorded by the device, in meters per second squared (m/s²).
	 *
	 * Unlike {@link GetDeviceMotionReturn.acceleration | `acceleration`} which compensates for the influence of gravity, its value is the sum of the acceleration of the device as induced by the user and an acceleration equal and opposite to that caused by gravity.
	 *
	 * In other words, it measures the g-force. In practice, this value represents the raw data measured by an accelerometer.
	 */
	readonly accelerationIncludingGravity: DeviceMotionEventAcceleration;
	/** The rate at which the device is rotating around each of its axes in degrees per second. */
	readonly rotationRate: DeviceMotionEventRotationRate;
	/** The interval, in milliseconds, at which data is obtained from the underlying hardware. */
	readonly interval: number;
};

/**
 * Provides information about the device's motion, including acceleration and rotation rate.
 * @param options Additional options to customize the behavior.
 * @see https://svelte-librarian.github.io/sv-use/docs/core/get-device-motion
 */
export function getDeviceMotion(options: GetDeviceMotionOptions = {}): GetDeviceMotionReturn {
	const { window = defaultWindow } = options;

	const _isSupported = isSupported(() => window !== undefined && 'DeviceMotionEvent' in window);
	let _acceleration = $state<NonNullable<DeviceMotionEvent['acceleration']>>({
		x: null,
		y: null,
		z: null
	});
	let _accelerationIncludingGravity = $state<
		NonNullable<DeviceMotionEvent['accelerationIncludingGravity']>
	>({
		x: null,
		y: null,
		z: null
	});
	let _rotationRate = $state<NonNullable<DeviceMotionEvent['rotationRate']>>({
		alpha: null,
		beta: null,
		gamma: null
	});
	let _interval = $state<number>(0);

	if (_isSupported.current && window) {
		handleEventListener(window, 'devicemotion', onDeviceMotion, { passive: true });
	}

	function onDeviceMotion(event: DeviceMotionEvent) {
		if (event.acceleration) {
			_acceleration = event.acceleration;
		}

		if (event.accelerationIncludingGravity) {
			_accelerationIncludingGravity = event.accelerationIncludingGravity;
		}

		if (event.rotationRate) {
			_rotationRate = event.rotationRate;
		}

		_interval = event.interval;
	}

	return {
		get isSupported() {
			return _isSupported.current;
		},
		get acceleration() {
			return _acceleration;
		},
		get accelerationIncludingGravity() {
			return _accelerationIncludingGravity;
		},
		get rotationRate() {
			return _rotationRate;
		},
		get interval() {
			return _interval;
		}
	};
}
