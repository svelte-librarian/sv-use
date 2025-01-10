import { BROWSER } from 'esm-env';
import { isSupported } from '../../__internal__/is.svelte.js';

type GetDevicePixelRatioReturn = {
	/** Whether the {@link https://developer.mozilla.org/en-US/docs/Web/API/Window/devicePixelRatio | devicePixelRatio property} is supported or not. */
	readonly isSupported: boolean;
	/** The current device pixel ratio. */
	readonly current: number;
};

/** Returns the ratio of the resolution in physical pixels to the resolution in CSS pixels for the current display device. */
export function getDevicePixelRatio(): GetDevicePixelRatioReturn {
	const _isSupported = isSupported(() => window && 'devicePixelRatio' in window);
	let devicePixelRatio = $state(1);

	if (_isSupported.current && BROWSER) {
		let media: MediaQueryList;

		updatePixelRatio();

		function updatePixelRatio() {
			devicePixelRatio = window.devicePixelRatio;
			cleanup();

			media = window.matchMedia(`(resolution: ${window.devicePixelRatio}dppx)`);
			media.addEventListener('change', updatePixelRatio, { once: true });
		}

		function cleanup() {
			media?.removeEventListener('change', updatePixelRatio);
		}
	}

	return {
		get isSupported() {
			return _isSupported.current;
		},
		get current() {
			return devicePixelRatio;
		}
	};
}
