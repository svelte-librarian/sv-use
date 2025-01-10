import { BROWSER } from 'esm-env';

/** Only runs in browser. */
export function isSupported(callback: () => boolean) {
	let _isSupported = $state<boolean>(false);

	if (BROWSER) {
		_isSupported = callback();
	}

	return { current: _isSupported };
}
