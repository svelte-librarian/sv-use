import { handleEventListener } from '../../browser/handle-event-listener/index.svelte.js';
import { noop } from '../../__internal__/utils.svelte.js';
import { defaultDocument, type ConfigurableDocument } from '../../__internal__/configurable.js';
import type { CleanupFunction } from '../../__internal__/types.js';

interface GetDocumentVisibilityOptions extends ConfigurableDocument {
	/**
	 * Whether to auto-cleanup the event listener or not.
	 *
	 * If set to `true`, it must run in the component initialization lifecycle.
	 * @default true
	 */
	autoCleanup?: boolean;
}

type GetDocumentVisibilityReturn = {
	readonly current: DocumentVisibilityState;
	/**
	 * Cleans up the event listener.
	 * @note Is called automatically if `options.autoCleanup` is `true`.
	 */
	cleanup: CleanupFunction;
};

/**
 * Whether the document is visible or not.
 * @see https://svelte-librarian.github.io/sv-use/docs/core/elements/get-document-visibility
 */
export function getDocumentVisibility(
	options: GetDocumentVisibilityOptions = {}
): GetDocumentVisibilityReturn {
	const { autoCleanup = true, document = defaultDocument } = options;

	let cleanup: CleanupFunction = noop;
	let _current = $state<DocumentVisibilityState>(document?.visibilityState ?? 'visible');

	if (document) {
		cleanup = handleEventListener(
			document,
			'visibilitychange',
			() => {
				console.log('change', document.visibilityState);
				_current = document.visibilityState;
			},
			{ autoCleanup }
		);
	}

	return {
		get current() {
			return _current;
		},
		cleanup
	};
}
