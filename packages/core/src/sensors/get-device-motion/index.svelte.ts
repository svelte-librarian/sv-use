import { onMount } from 'svelte';
import { handleEventListener } from '../../browser/index.js';

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

/** Provides information about the device's motion, including acceleration and rotation rate. */
export function getDeviceMotion(): GetDeviceMotionReturn {
	const _isSupported = $derived.by(() => window && 'DeviceMotionEvent' in window);
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

	onMount(() => {
		if (!_isSupported) return;

		const onDeviceMotion = (event: DeviceMotionEvent) => {
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
		};

		return handleEventListener('devicemotion', onDeviceMotion);
	});

	return {
		get isSupported() {
			return _isSupported;
		},
		get acceleration() {
			return _acceleration ?? { x: null, y: null, z: null };
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
