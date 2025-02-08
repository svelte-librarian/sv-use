import { createHighlighter } from 'shiki';

/** The highlighter for type definitions. */
export const highlighter = await createHighlighter({
	themes: ['one-light', 'one-dark-pro'],
	langs: ['typescript']
});
