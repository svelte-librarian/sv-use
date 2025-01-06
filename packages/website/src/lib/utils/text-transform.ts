export function toTitleCase(str: string): string {
	return str.at(0)!.toUpperCase() + str.slice(1).toLowerCase();
}

/** @note Removes hyphens, underscores, and spaces. */
export function toCamelCase(str: string): string {
	const parts = str.toLowerCase().split(/[-_ ]+/);
	return parts.at(0)! + parts.slice(1).map(toTitleCase).join('');
}
