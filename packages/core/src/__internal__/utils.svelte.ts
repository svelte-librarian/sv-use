import type { Getter } from './types.js';

export const noop = () => {};

export function toArray<T>(v: T): T extends Array<unknown> ? T : T[] {
	// @ts-expect-error Bypass type error
	return Array.isArray(v) ? v : [v];
}

/** If function, return function value. Else, return value. */
export function normalizeValue<T>(v: T | Getter<T>): T {
	// Using instanceof instead of typeof
	// https://github.com/microsoft/TypeScript/issues/37663
	return v instanceof Function ? v() : v;
}

/** `true` if the value is not `null` nor `undefined`. `false` otherwise. */
export function notNullish<T>(v: T | null | undefined): v is T {
	return v !== null && v !== undefined;
}

export function asyncEffectRoot(cb: () => Promise<void>) {
	let promise: Promise<void>;

	const cleanup = $effect.root(() => {
		promise = cb();
	});

	return () => promise.finally(cleanup);
}
