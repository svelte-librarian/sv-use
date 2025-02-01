import { BROWSER } from 'esm-env';

export interface ConfigurableWindow {
	window?: Window;
}

export interface ConfigurableDocument {
	document?: Document;
}

export interface ConfigurableNavigator {
	navigator?: Navigator;
}

export const defaultWindow = BROWSER ? window : undefined;
export const defaultDocument = BROWSER ? document : undefined;
export const defaultNavigator = BROWSER ? navigator : undefined;
