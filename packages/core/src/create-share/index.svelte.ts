import { normalizeValue } from '../__internal__/utils.svelte.js';
import { defaultNavigator, type ConfigurableNavigator } from '../__internal__/configurable.js';
import type { MaybeGetter } from '../__internal__/types.js';

type NavigatorShareData = {
	title?: string;
	files?: File[];
	text?: string;
	url?: string;
};

interface NavigatorWithShare {
	share?: (data: NavigatorShareData) => Promise<void>;
	canShare?: (data: NavigatorShareData) => boolean;
}

type CreateShareData = {
	title?: MaybeGetter<string>;
	files?: MaybeGetter<File[]>;
	text?: MaybeGetter<string>;
	url?: MaybeGetter<string>;
};

type CreateShareOptions = ConfigurableNavigator;

type CreateShareReturn = {
	readonly isSupported: boolean;
	share(): Promise<void>;
};

/**
 * Invokes the native sharing mechanism of the device to share data such as text, URLs, or files.
 * @param data The data to share.
 * @param options Additional options to customize the behavior.
 * @see https://svelte-librarian.github.io/sv-use/docs/core/create-share
 */
export function createShare(
	data: CreateShareData,
	options: CreateShareOptions = {}
): CreateShareReturn {
	const { navigator = defaultNavigator } = options;

	const _data = $derived({
		files: normalizeValue(data.files),
		text: normalizeValue(data.text),
		title: normalizeValue(data.title),
		url: normalizeValue(data.url)
	});

	const _navigator = navigator as NavigatorWithShare;
	const isSupported = $derived(_navigator && 'canShare' in _navigator);

	async function share() {
		if (!isSupported) return;
		let granted = true;

		if (data.files && _navigator.canShare) {
			granted = _navigator.canShare({ files: normalizeValue(data.files) });
		}

		if (granted) {
			return _navigator.share!(_data);
		}
	}

	return {
		get isSupported() {
			return isSupported;
		},
		share
	};
}
