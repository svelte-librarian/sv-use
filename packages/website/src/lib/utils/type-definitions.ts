import { createHighlighter } from 'shiki';

/** The highlighter for type definitions. */
export function getHighlighter() {
	return createHighlighter({
		themes: ['one-light', 'one-dark-pro'],
		langs: ['typescript']
	});
}
