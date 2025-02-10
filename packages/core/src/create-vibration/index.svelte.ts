import { normalizeValue } from '../__internal__/utils.svelte.js';
import { defaultNavigator, type ConfigurableNavigator } from '../__internal__/configurable.js';
import type { MaybeGetter } from '../__internal__/types.js';

interface CreateVibrationOptions extends ConfigurableNavigator {
	/**
	 * An array of values describes alternating periods in which the device is
	 * vibrating and not vibrating. Each value in the array is converted to an
	 * integer, then interpreted alternately as the number of milliseconds the
	 * device should vibrate and the number of milliseconds it should not be
	 * vibrating.
	 * @default []
	 */
	pattern?: MaybeGetter<VibratePattern>;
}

type CreateVibrationReturn = {
	readonly isSupported: boolean;
	vibrate: () => void;
	stop: () => void;
};

/**
 * Reactive vibrate.
 * @param options Additional options to customize the behavior.
 * @see https://svelte-librarian.github.io/sv-use/docs/core/create-vibration
 */
export function createVibration(options: CreateVibrationOptions = {}): CreateVibrationReturn {
	const { pattern = [], navigator = defaultNavigator } = options;

	const isSupported = $derived(typeof navigator !== 'undefined' && 'vibrate' in navigator);
	const _pattern = $derived(normalizeValue(pattern));

	function vibrate() {
		if (!isSupported) return;

		navigator!.vibrate(_pattern);
	}

	function stop() {
		if (!isSupported) return;

		navigator!.vibrate(0);
	}

	return {
		get isSupported() {
			return isSupported;
		},
		vibrate,
		stop
	};
}
