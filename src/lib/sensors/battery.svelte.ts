import { onMount } from 'svelte';

/** Custom type because only 1 out of 3 major browsers support it. */
export interface BatteryManager extends EventTarget {
	readonly charging: number;
	readonly chargingTime: number;
	readonly dischargingTime: number;
	readonly level: number;
}

type GetBatteryReturn = {
	/** Whether the {@link https://developer.mozilla.org/en-US/docs/Web/API/Battery_Status_API | Battery Status API} is supported by the browser or not. */
	readonly isSupported: boolean;
	/** Whether the battery is currently being charged or not. */
	readonly charging: number;
	/** The remaining time in seconds until the battery is fully charged, or 0 if the battery is already fully charged. */
	readonly chargingTime: number;
	/** The remaining time in seconds until the battery is completely discharged and the system suspends. */
	readonly dischargingTime: number;
	/** The system's battery charge level scaled to a value between 0.0 and 1.0. */
	readonly level: number;
};

/**
 * Retrieves information about the battery.
 * @note The {@link https://developer.mozilla.org/en-US/docs/Web/API/Battery_Status_API | Battery Status API} is not supported by all browsers.
 */
export function getBattery(): GetBatteryReturn {
	let _isSupported = $state<boolean>(false);
	let _charging = $state<number>(0);
	let _chargingTime = $state<number>(0);
	let _dischargingTime = $state<number>(0);
	let _level = $state<number>(1);

	onMount(async () => {
		if (!('getBattery' in navigator)) return;

		// @ts-expect-error navigator.getBattery is not typed since only 1 out of 3 major browsers support it
		const battery = (await navigator.getBattery()) as BatteryManager;

		_isSupported = true;
		_charging = battery.charging;
		_chargingTime = battery.chargingTime;
		_dischargingTime = battery.dischargingTime;
		_level = battery.level;

		battery.addEventListener('chargingchange', () => {
			_charging = battery.charging;
		});

		battery.addEventListener('chargingtimechange', () => {
			_chargingTime = battery.chargingTime;
		});

		battery.addEventListener('dischargingtimechange', () => {
			_dischargingTime = battery.dischargingTime;
		});

		battery.addEventListener('levelchange', () => {
			_level = battery.level;
		});
	});

	return {
		get isSupported() {
			return _isSupported;
		},
		get charging() {
			return _charging;
		},
		get chargingTime() {
			return _chargingTime;
		},
		get dischargingTime() {
			return _dischargingTime;
		},
		get level() {
			return _level;
		}
	};
}
