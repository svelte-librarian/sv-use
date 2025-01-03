import { BROWSER } from 'esm-env';

export interface ConfigurableWindow {
	/**  */
	window?: Window;
}

export const defaultWindow = BROWSER ? window : undefined;
