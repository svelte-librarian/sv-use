import { defaultDocument, type ConfigurableDocument } from '../__internal__/configurable.js';

type GetDocumentVisibilityOptions = ConfigurableDocument;

type GetDocumentVisibilityReturn = {
	readonly current: DocumentVisibilityState;
};

/**
 * Whether the document is visible or not.
 * @param options Additional options to customize the behavior.
 * @see https://svelte-librarian.github.io/sv-use/docs/core/get-document-visibility
 */
export function getDocumentVisibility(
	options: GetDocumentVisibilityOptions = {}
): GetDocumentVisibilityReturn {
	const { document = defaultDocument } = options;

	let _current = $state<DocumentVisibilityState>(document?.visibilityState ?? 'visible');

	if (document) {
		document.addEventListener('visibilitychange', onVisibilityChange, {
			passive: true
		});
	}

	function onVisibilityChange() {
		if (!document) return;

		_current = document.visibilityState;
	}

	return {
		get current() {
			return _current;
		}
	};
}
