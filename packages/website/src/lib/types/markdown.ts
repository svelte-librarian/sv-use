type Category = 'reactivity' | 'storage' | 'sensors' | 'elements';

export type UtilityAttributes = {
	slug: string;
	title: string;
	description: string;
	category: Category;
	unstable?: boolean;
};

export type MarkdownHeading = {
	depth: number;
	value: string;
	data: {
		id: string;
	};
};

export type MarkdownReturn<T> = {
	attributes: T;
	html: string;
	headings: MarkdownHeading[];
};
