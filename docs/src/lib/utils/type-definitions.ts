import { createHighlighter } from 'shiki';

const highlighter = createHighlighter({
	themes: ['one-light', 'one-dark-pro'],
	langs: ['typescript']
});

/** The highlighter for type definitions. */
export function getHighlighter() {
	return highlighter;
}
