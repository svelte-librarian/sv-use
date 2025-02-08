import { onDestroy } from 'svelte';
import { handleEventListener } from '../handle-event-listener/index.svelte.js';
import { noop } from '../__internal__/utils.svelte.js';
import type { CleanupFunction } from '../__internal__/types.js';

// Custom type because only 1 out of 3 major browsers support it.
export interface BatteryManager extends EventTarget {
	readonly charging: number;
	readonly chargingTime: number;
	readonly dischargingTime: number;
	readonly level: number;
}

type NavigatorWithBattery = Navigator & {
	getBattery: () => Promise<BatteryManager>;
};

type GetBatteryOptions = {
	/**
	 * Whether to auto-cleanup the event listener or not.
	 *
	 * If set to `true`, it must run in the component initialization lifecycle.
	 * @default true
	 */
	autoCleanup?: boolean;
};

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
	/**
	 * Cleans up the event listeners.
	 * @note Is called automatically if `options.autoCleanup` is set to `true`.
	 */
	cleanup: CleanupFunction;
};

/**
 * Retrieves information about the battery.
 * @see https://svelte-librarian.github.io/sv-use/docs/core/get-battery
 */
export function getBattery(options: GetBatteryOptions = {}): GetBatteryReturn {
	const { autoCleanup = true } = options;

	const events = ['chargingchange', 'chargingtimechange', 'dischargingtimechange', 'levelchange'];

	let battery: BatteryManager;
	let cleanup: CleanupFunction = noop;

	const _isSupported = $derived.by(() => navigator && 'getBattery' in navigator);
	let _charging = $state<number>(0);
	let _chargingTime = $state<number>(0);
	let _dischargingTime = $state<number>(0);
	let _level = $state<number>(1);

	if (_isSupported) {
		(navigator as NavigatorWithBattery).getBattery().then((_battery) => {
			battery = _battery;
			updateBatteryInfo.call(battery);
			cleanup = handleEventListener(battery, events, updateBatteryInfo, {
				autoCleanup,
				passive: true
			});
		});
	}

	if (autoCleanup) {
		onDestroy(() => cleanup());
	}

	function updateBatteryInfo(this: BatteryManager) {
		_charging = this.charging || 0;
		_chargingTime = this.chargingTime || 0;
		_dischargingTime = this.dischargingTime || 0;
		_level = this.level || 1;
	}

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
		},
		cleanup
	};
}
