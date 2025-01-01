import { BROWSER } from 'esm-env';
import { handleEventListener } from '../../browser/handle-event-listener/index.svelte.js';

type GetDocumentVisibilityReturn = {
	readonly current: DocumentVisibilityState;
};

/**
 * Whether the document is visible or not.
 * @note You can only run this in the component initialization lifecycle.
 */
export function getDocumentVisibility(): GetDocumentVisibilityReturn {
	const _state = $state<{ current: DocumentVisibilityState }>({ current: 'visible' });

	if (BROWSER) {
		handleEventListener(
			document,
			'visibilitychange',
			() => {
				_state.current = document.visibilityState;
			},
			{ autoMountAndCleanup: true }
		);
	}

	return {
		get current() {
			return _state.current;
		}
	};
}
