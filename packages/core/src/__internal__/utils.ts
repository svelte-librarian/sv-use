export function toArray<T>(v: T): T extends Array<unknown> ? T : T[] {
	// @ts-expect-error Bypass type error
	return Array.isArray(v) ? v : [v];
}
