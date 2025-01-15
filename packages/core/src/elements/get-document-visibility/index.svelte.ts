import { BROWSER } from 'esm-env';
import { handleEventListener } from '../../browser/handle-event-listener/index.svelte.js';
import { noop } from '../../__internal__/utils.js';
import type { CleanupFunction } from '../../__internal__/types.js';

interface GetDocumentVisibilityOptions {
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
	 * @note Called automatically if {@link GetDocumentVisibilityOptions.autoCleanup | `GetDocumentVisibilityOptions.autoCleanup`} is `true`.
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
	const { autoCleanup = true } = options;

	const _state = $state<{ current: DocumentVisibilityState }>({ current: 'visible' });
	let cleanup: CleanupFunction = noop;

	if (BROWSER) {
		cleanup = handleEventListener(
			document,
			'visibilitychange',
			() => (_state.current = document.visibilityState),
			{ autoMountAndCleanup: autoCleanup }
		);
	}

	return {
		get current() {
			return _state.current;
		},
		cleanup
	};
}
