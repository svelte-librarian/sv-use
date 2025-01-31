import { BROWSER } from 'esm-env';

export interface ConfigurableWindow {
	window?: Window;
}

export interface ConfigurableDocument {
	document?: Document;
}

export const defaultWindow = BROWSER ? window : undefined;
export const defaultDocument = BROWSER ? document : undefined;
