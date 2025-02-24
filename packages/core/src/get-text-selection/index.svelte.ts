import { handleEventListener } from '../handle-event-listener/index.svelte.js';
import {
	defaultDocument,
	defaultWindow,
	type ConfigurableDocument,
	type ConfigurableWindow
} from '../__internal__/configurable.js';

interface GetTextSelectionOptions extends ConfigurableWindow, ConfigurableDocument {}

type GetTextSelectionReturn = {
	readonly text: string;
	readonly rects: DOMRect[];
	readonly ranges: Range[];
	current: Selection | null;
};

/**
 * Gets the range of text selected by the user or the current position of the caret.
 * @param options Additional options to customize the behavior.
 * @see https://svelte-librarian.github.io/sv-use/docs/core/browser/get-text-selection
 */
export function getTextSelection(options: GetTextSelectionOptions = {}): GetTextSelectionReturn {
	const { window = defaultWindow, document = defaultDocument } = options;

	let current = $state<Selection | null>(null);

	const text = $derived.by(() => current?.toString() ?? '');
	const ranges = $derived.by(() => (current ? getRangesFromSelection(current) : []));
	const rects = $derived.by(() => ranges.map((range) => range.getBoundingClientRect()));

	handleEventListener(document, 'selectionchange', onSelectionChange, { passive: true });

	function getRangesFromSelection(selection: Selection) {
		const rangeCount = selection.rangeCount ?? 0;
		return Array.from({ length: rangeCount }, (_, i) => selection.getRangeAt(i));
	}

	function onSelectionChange() {
		current = null;

		if (window) {
			current = window.getSelection();
		}
	}

	return {
		get current() {
			return current;
		},
		set current(v) {
			current = v;
		},
		get text() {
			return text;
		},
		get rects() {
			return rects;
		},
		get ranges() {
			return ranges;
		}
	};
}
