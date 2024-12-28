import type { MarkdownHeading } from '$types/markdown.js';

let _onThisPageHeadings = $state<MarkdownHeading[]>([]);

export const onThisPageHeadings = {
	get current() {
		return _onThisPageHeadings;
	},
	set current(v) {
		_onThisPageHeadings = v;
	}
};
