import { handleEventListener } from '../handle-event-listener/index.svelte.js';
import {
	defaultDocument,
	defaultWindow,
	type ConfigurableDocument,
	type ConfigurableWindow
} from '../__internal__/configurable.js';

interface HasLeftPageOptions extends ConfigurableWindow, ConfigurableDocument {}

type HasLeftPageReturn = {
	readonly current: boolean;
};

/**
 * Whether the mouse has left the page or not.
 * @param options Additional options to customize the behavior.
 * @see https://svelte-librarian.github.io/sv-use/docs/core/has-left-page
 */
export function hasLeftPage(options: HasLeftPageOptions = {}): HasLeftPageReturn {
	const { window = defaultWindow, document = defaultDocument } = options;

	let _current = $state(false);

	const handler = (event: MouseEvent) => {
		if (!window) return;

		event = event || (window.event as unknown);
		// @ts-expect-error missing types
		const from = event.relatedTarget || event.toElement;

		_current = !from;
	};

	handleEventListener(window, 'mouseout', handler, { passive: true });
	handleEventListener(document, ['mouseleave', 'mouseenter'], handler, { passive: true });

	return {
		get current() {
			return _current;
		}
	};
}
