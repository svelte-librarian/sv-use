import { onDestroy } from 'svelte';
import { BROWSER } from 'esm-env';
import { getPermission } from '../get-permission/index.svelte.js';
import { handleEventListener } from '../handle-event-listener/index.svelte.js';
import type { CleanupFunction } from '../__internal__/types.js';
import { noop } from '../__internal__/utils.svelte.js';

type GetClipboardOptions<AllowRead extends boolean> = {
	/**
	 * Whether to automatically clean up the event listeners or not.
	 * @note If set to `true`, you must call `getClipboardText` in the component initialization lifecycle.
	 * @default true
	 */
	autoCleanup?: boolean;
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
	/** Cleans up the event listeners. */
	cleanup: CleanupFunction;
};

/**
 * Provides write (and optionally read) access to the text clipboard.
 * @param options Additional options to customize the behavior.
 * @see https://svelte-librarian.github.io/sv-use/docs/core/get-clipboard-text
 */
export function getClipboardText<AllowRead extends boolean = false>(
	options: GetClipboardOptions<AllowRead> = {}
): GetClipboardReturn {
	const {
		autoCleanup = true,
		allowRead = false,
		copyDuration = 2000,
		legacyCopy = false
	} = options;

	const _isClipboardAPISupported = $derived.by(() => navigator && 'clipboard' in navigator);
	const _isSupported = $derived.by(() => _isClipboardAPISupported || legacyCopy);
	const _readPermission = getPermission('clipboard-read', { exposeControls: true });
	const _writePermission = getPermission('clipboard-write');
	let _isCopied = $state<boolean>(false);
	let _text = $state<string>('');
	let cleanup: CleanupFunction = noop;

	if (BROWSER && _isSupported && allowRead) {
		cleanup = handleEventListener(['copy', 'cut'], readText);
	}

	if (autoCleanup) {
		onDestroy(() => {
			cleanup();
		});
	}

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
		copyText,
		cleanup
	};
}
