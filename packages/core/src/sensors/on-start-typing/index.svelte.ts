import { handleEventListener } from '../../browser/index.js';
import { noop } from '../../__internal__/utils.svelte.js';
import { defaultDocument, type ConfigurableDocument } from '../../__internal__/configurable.js';
import type { CleanupFunction } from '../../__internal__/types.js';

interface OnStartTypingOptions extends ConfigurableDocument {
	/**
	 * Whether to auto-cleanup the event listener or not.
	 *
	 * If set to `true`, it must run in the component initialization lifecycle.
	 * @default true
	 */
	autoCleanup?: boolean;
}

/**
 * Fires when users start typing on non-editable elements.
 * @param callback The callback for when users start typing on non-editable elements.
 * @param options Additional options to customize the behavior.
 * @see https://svelte-librarian.github.io/sv-use/docs/core/sensors/on-start-typing
 */
export function onStartTyping(
	callback: (event: KeyboardEvent) => void,
	options: OnStartTypingOptions = {}
): CleanupFunction {
	const { autoCleanup = true, document = defaultDocument } = options;

	let cleanup: CleanupFunction = noop;

	if (document) {
		cleanup = handleEventListener(document, 'keydown', onKeydown, { autoCleanup, passive: true });
	}

	function onKeydown(event: KeyboardEvent) {
		if (!isFocusedElementEditable() && isTypedCharValid(event)) {
			callback(event);
		}
	}

	function isFocusedElementEditable() {
		if (!document) return;

		if (!document.activeElement) return false;
		if (document.activeElement === document.body) return false;

		// Assume <input> and <textarea> elements are editable.
		switch (document.activeElement.tagName) {
			case 'INPUT':
			case 'TEXTAREA':
				return true;
		}

		// Check if any other focused element id editable.
		return document.activeElement.hasAttribute('contenteditable');
	}

	function isTypedCharValid({ keyCode, metaKey, ctrlKey, altKey }: KeyboardEvent) {
		if (metaKey || ctrlKey || altKey) return false;

		// 0...9
		if (keyCode >= 48 && keyCode <= 57) return true;

		// A...Z
		if (keyCode >= 65 && keyCode <= 90) return true;

		// a...z
		if (keyCode >= 97 && keyCode <= 122) return true;

		// All other keys.
		return false;
	}

	return cleanup;
}
