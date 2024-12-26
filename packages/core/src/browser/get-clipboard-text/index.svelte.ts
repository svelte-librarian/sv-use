import { onMount } from 'svelte';
import { getPermission } from '../get-permission/index.svelte.js';
import { handleEventListener } from '../handle-event-listener/index.svelte.js';

type GetClipboardOptions<AllowRead extends boolean> = {
	/**
	 * Whether to allow reading from the clipboard.
	 * @default false
	 */
	allowRead?: AllowRead;
	/**
	 * How long before {@link GetClipboardReturn.isCopied | `GetClipboardReturn.isCopied`} is set to `false`.
	 * @default 2000
	 */
	copyDuration?: number;
	/**
	 * Whether to fallback to the legacy `document.execCommand('copy')` for copying if the Clipboard API is not supported or not.
	 * @default false
	 */
	legacyCopy?: boolean;
};

type GetClipboardReturn = {
	readonly isSupported: boolean;
	readonly isCopied: boolean;
	/** The text currently in the clipboard. */
	readonly text: string;
	/** Copies text to the clipboard. */
	copyText: (value: string) => void;
};

/**
 * Provides write (and optionally read) access to the text clipboard.
 * @param options Additional options to customize the behavior.
 */
export function getClipboardText<AllowRead extends boolean = false>(
	options: GetClipboardOptions<AllowRead> = {}
): GetClipboardReturn {
	const { allowRead = false, copyDuration = 2000, legacyCopy = false } = options;

	let _isClipboardAPISupported = $state<boolean>(false);
	let _isCopied = $state<boolean>(false);
	let _text = $state<string>('');
	const _isSupported = $state<boolean>(_isClipboardAPISupported || legacyCopy);
	const _readPermission = getPermission('clipboard-read', { exposeControls: true });
	const _writePermission = getPermission('clipboard-write');

	function copyText(value: string) {
		if (!_isSupported) return;

		if (_isClipboardAPISupported && _writePermission) {
			navigator.clipboard.writeText(value).then(() => {
				_isCopied = true;

				setTimeout(() => {
					_isCopied = false;
				}, copyDuration);
			});
		} else {
			legacyCopyText(value);
		}

		_text = value;
	}

	async function readText() {
		if (!_isClipboardAPISupported) return;

		_text =
			_readPermission.isSupported && _readPermission.current !== 'denied'
				? await navigator.clipboard.readText()
				: legacyReadText();
	}

	function legacyCopyText(value: string) {
		const textArea = document.createElement('textarea');
		textArea.value = value;
		document.body.appendChild(textArea);
		textArea.select();
		document.execCommand('copy');
		document.body.removeChild(textArea);
	}

	function legacyReadText() {
		return document?.getSelection?.()?.toString() ?? '';
	}

	onMount(() => {
		if (!('clipboard' in navigator)) return;

		_isClipboardAPISupported = true;

		if (!_isSupported || !allowRead) return;

		return handleEventListener(['copy', 'cut'], readText);
	});

	return {
		get isSupported() {
			return _isClipboardAPISupported;
		},
		get isCopied() {
			return _isCopied;
		},
		get text() {
			return _text;
		},
		copyText
	};
}
