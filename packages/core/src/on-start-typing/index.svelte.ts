import { handleEventListener } from '../handle-event-listener/index.svelte.js';
import { defaultDocument, type ConfigurableDocument } from '../__internal__/configurable.js';

type OnStartTypingOptions = ConfigurableDocument;

/**
 * Fires when users start typing on non-editable elements.
 * @param callback The callback for when users start typing on non-editable elements.
 * @param options Additional options to customize the behavior.
 * @see https://svelte-librarian.github.io/sv-use/docs/core/on-start-typing
 */
export function onStartTyping(
	callback: (event: KeyboardEvent) => void,
	options: OnStartTypingOptions = {}
): void {
	const { document = defaultDocument } = options;

	handleEventListener(document, 'keydown', onKeydown, { passive: true });

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
}
