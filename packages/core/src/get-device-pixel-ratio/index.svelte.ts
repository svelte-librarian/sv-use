import { handleEventListener } from '../handle-event-listener/index.svelte.js';
import { isSupported } from '../__internal__/is.svelte.js';
import { defaultWindow, type ConfigurableWindow } from '../__internal__/configurable.js';

type GetDevicePixelRatioOptions = ConfigurableWindow;

type GetDevicePixelRatioReturn = {
	/** Whether the {@link https://developer.mozilla.org/en-US/docs/Web/API/Window/devicePixelRatio | devicePixelRatio property} is supported or not. */
	readonly isSupported: boolean;
	readonly current: number;
};

/**
 * Returns the ratio of the resolution in physical pixels to the resolution in CSS pixels for the current display device.
 * @see https://svelte-librarian.github.io/sv-use/docs/core/get-device-pixel-ratio
 */
export function getDevicePixelRatio(
	options: GetDevicePixelRatioOptions = {}
): GetDevicePixelRatioReturn {
	const { window = defaultWindow } = options;

	const _isSupported = isSupported(() => window !== undefined && 'devicePixelRatio' in window);
	let _current = $state(1);

	if (_isSupported.current) {
		updatePixelRatio();
	}

	function updatePixelRatio() {
		_current = window!.devicePixelRatio;

		const media = window!.matchMedia(`(resolution: ${window!.devicePixelRatio}dppx)`);
		handleEventListener(media, 'change', updatePixelRatio, { once: true });
	}

	return {
		get isSupported() {
			return _isSupported.current;
		},
		get current() {
			return _current;
		}
	};
}
