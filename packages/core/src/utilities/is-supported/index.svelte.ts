import { BROWSER } from 'esm-env';

type IsSupportedReturn = {
	/** Whether the browser feature is supported or not. */
	readonly current: boolean;
};

/**
 * Checks whether a browser feature is supported or not.
 *
 * Is `false` in non-browser environments.
 * @param callback The callback that returns whether the browser feature is supported or not.
 */
export function isSupported(callback: () => boolean): IsSupportedReturn {
	let _isSupported = $state<boolean>(false);

	if (BROWSER) {
		_isSupported = callback();
	}

	return { current: _isSupported };
}
