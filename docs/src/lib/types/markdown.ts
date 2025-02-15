export type MarkdownHeading = {
	depth: number;
	value: string;
	data: {
		id: string;
	};
};

export type MarkdownReturn<T extends Record<string, unknown> = Record<string, unknown>> = {
	attributes: T;
	title: string;
	lede: string;
	html: string;
	headings: MarkdownHeading[];
};

export type Category = {
	category: string;
	utilities: { slug: string; label: string }[];
};
