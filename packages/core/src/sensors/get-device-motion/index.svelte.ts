import { onDestroy } from 'svelte';
import { handleEventListener } from '../../browser/index.js';
import { isSupported } from '../../__internal__/is.svelte.js';
import { noop } from '../../__internal__/utils.js';
import type { CleanupFunction } from '../../__internal__/types.js';

type GetDeviceMotionOptions = {
	/**
	 * Whether to auto-cleanup the event listener or not.
	 *
	 * If set to `true`, it must run in the component initialization lifecycle.
	 * @default true
	 */
	autoCleanup?: boolean;
};

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
	/**
	 * Cleans up the event listener.
	 * @note Is called automatically if `options.autoCleanup` is set to `true`.
	 */
	cleanup: CleanupFunction;
};

/**
 * Provides information about the device's motion, including acceleration and rotation rate.
 * @see https://svelte-librarian.github.io/sv-use/docs/core/sensors/get-device-motion
 */
export function getDeviceMotion(options: GetDeviceMotionOptions = {}): GetDeviceMotionReturn {
	const { autoCleanup = true } = options;

	let cleanup: CleanupFunction = noop;

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

	if (_isSupported.current) {
		cleanup = handleEventListener('devicemotion', onDeviceMotion, { autoCleanup });
	}

	if (autoCleanup) {
		onDestroy(() => cleanup());
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
		},
		cleanup
	};
}
