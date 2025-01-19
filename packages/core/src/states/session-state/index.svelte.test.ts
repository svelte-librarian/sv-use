import { afterAll, beforeAll, beforeEach, describe, expect, it, vi } from 'vitest';
import { sessionState } from './index.svelte.js';
import { flushSync } from 'svelte';

const ORIGINAL_WINDOW_LOCATION = window.location;

describe('Works with primitives', () => {
	beforeEach(() => {
		sessionStorage.clear();
	});

	beforeAll(() => {
		/** @see https://stackoverflow.com/a/55771671/20892950 */
		Object.defineProperty(window, 'location', {
			configurable: true,
			value: { reload: vi.fn(() => {}) }
		});
	});

	afterAll(() => {
		Object.defineProperty(window, 'location', {
			configurable: true,
			value: ORIGINAL_WINDOW_LOCATION
		});
	});

	it('Persists state correctly', () => {
		const cleanup = $effect.root(() => {
			const state = sessionState('counter', 0);

			expect(state.current).toBe(0);
			expect(sessionStorage.getItem('counter')).toBe('0');

			flushSync(() => {
				state.current = 1;
			});
			expect(state.current).toBe(1);
			expect(sessionStorage.getItem('counter')).toBe('1');
		});

		cleanup();
	});

	it('Persists state correctly after reload', () => {
		const cleanup = $effect.root(() => {
			const state = sessionState('counter', 0);

			expect(state.current).toBe(0);
			expect(sessionStorage.getItem('counter')).toBe('0');

			flushSync(() => {
				state.current = 1;
			});
			expect(state.current).toBe(1);
			expect(sessionStorage.getItem('counter')).toBe('1');

			window.location.reload();

			expect(state.current).toBe(1);
			expect(sessionStorage.getItem('counter')).toBe('1');
		});

		cleanup();
	});

	it('Persists state correctly after multiple changes', () => {
		const cleanup = $effect.root(() => {
			const state = sessionState('counter', 0);

			expect(state.current).toBe(0);
			expect(sessionStorage.getItem('counter')).toBe('0');

			flushSync(() => {
				state.current = 1;
			});
			expect(state.current).toBe(1);
			expect(sessionStorage.getItem('counter')).toBe('1');

			flushSync(() => {
				state.current = 2;
			});
			expect(state.current).toBe(2);
			expect(sessionStorage.getItem('counter')).toBe('2');

			flushSync(() => {
				state.current = 3;
			});
			expect(state.current).toBe(3);
			expect(sessionStorage.getItem('counter')).toBe('3');
		});

		cleanup();
	});

	it('Retrieves initial state from local storage correctly as number', () => {
		const cleanup = $effect.root(() => {
			sessionStorage.setItem('counter', '1');

			const state = sessionState('counter', 0);

			expect(state.current).toBe(1);
		});

		cleanup();
	});

	it('Retrieves initial state from local storage correctly as string', () => {
		const cleanup = $effect.root(() => {
			sessionStorage.setItem('search', 'test');

			const state = sessionState('search', '', {
				serialize: (value) => value,
				deserialize: (value) => value
			});

			expect(state.current).toBe('test');
		});

		cleanup();
	});

	it('Retrieves initial state from local storage correctly as boolean', () => {
		const cleanup = $effect.root(() => {
			sessionStorage.setItem('accept_cookies', 'true');

			const state = sessionState('accept_cookies', false, {
				deserialize: (value) => value === 'true'
			});

			expect(state.current).toBe(true);
		});

		cleanup();
	});
});

describe('Works with objects', () => {
	beforeEach(() => {
		sessionStorage.clear();
	});

	beforeAll(() => {
		/** @see https://stackoverflow.com/a/55771671/20892950 */
		Object.defineProperty(window, 'location', {
			configurable: true,
			value: { reload: vi.fn(() => {}) }
		});
	});

	afterAll(() => {
		Object.defineProperty(window, 'location', {
			configurable: true,
			value: ORIGINAL_WINDOW_LOCATION
		});
	});

	it('Persists state correctly', () => {
		const cleanup = $effect.root(() => {
			const state = sessionState('counter', { value: 0 });

			expect(state.current).toStrictEqual({ value: 0 });
			expect(sessionStorage.getItem('counter')).toBe('{"value":0}');

			flushSync(() => {
				state.current = { value: 1 };
			});
			expect(state.current).toStrictEqual({ value: 1 });
			expect(sessionStorage.getItem('counter')).toBe('{"value":1}');
		});

		cleanup();
	});

	it('Persists state correctly after reload', () => {
		const cleanup = $effect.root(() => {
			const state = sessionState('counter', { value: 0 });

			expect(state.current).toStrictEqual({ value: 0 });
			expect(sessionStorage.getItem('counter')).toBe('{"value":0}');

			flushSync(() => {
				state.current = { value: 1 };
			});
			expect(state.current).toStrictEqual({ value: 1 });
			expect(sessionStorage.getItem('counter')).toBe('{"value":1}');

			window.location.reload();

			expect(state.current).toStrictEqual({ value: 1 });
			expect(sessionStorage.getItem('counter')).toBe('{"value":1}');
		});

		cleanup();
	});

	it('Persists state correctly after multiple changes', () => {
		const cleanup = $effect.root(() => {
			const state = sessionState('counter', { value: 0 });

			expect(state.current).toStrictEqual({ value: 0 });
			expect(sessionStorage.getItem('counter')).toBe('{"value":0}');

			flushSync(() => {
				state.current = { value: 1 };
			});
			expect(state.current).toStrictEqual({ value: 1 });
			expect(sessionStorage.getItem('counter')).toBe('{"value":1}');

			flushSync(() => {
				state.current = { value: 2 };
			});
			expect(state.current).toStrictEqual({ value: 2 });
			expect(sessionStorage.getItem('counter')).toBe('{"value":2}');

			flushSync(() => {
				state.current = { value: 3 };
			});
			expect(state.current).toStrictEqual({ value: 3 });
			expect(sessionStorage.getItem('counter')).toBe('{"value":3}');
		});

		cleanup();
	});

	it('Retrieves initial state from local storage correctly', () => {
		const cleanup = $effect.root(() => {
			sessionStorage.setItem('counter', '{"value":1}');

			const state = sessionState('counter', { value: 0 });

			expect(state.current).toStrictEqual({ value: 1 });
		});

		cleanup();
	});
});

describe('Works with property assignment on objects', () => {
	beforeEach(() => {
		sessionStorage.clear();
	});

	beforeAll(() => {
		/** @see https://stackoverflow.com/a/55771671/20892950 */
		Object.defineProperty(window, 'location', {
			configurable: true,
			value: { reload: vi.fn(() => {}) }
		});
	});

	afterAll(() => {
		Object.defineProperty(window, 'location', {
			configurable: true,
			value: ORIGINAL_WINDOW_LOCATION
		});
	});

	it('Persists state correctly', () => {
		const cleanup = $effect.root(() => {
			const state = sessionState('counter', { value: 0 });

			expect(state.current).toStrictEqual({ value: 0 });
			expect(sessionStorage.getItem('counter')).toBe('{"value":0}');

			flushSync(() => {
				state.current.value = 1;
			});
			expect(state.current).toStrictEqual({ value: 1 });
			expect(sessionStorage.getItem('counter')).toBe('{"value":1}');
		});

		cleanup();
	});

	it('Persists state correctly after reload', () => {
		const cleanup = $effect.root(() => {
			const state = sessionState('counter', { value: 0 });

			expect(state.current).toStrictEqual({ value: 0 });
			expect(sessionStorage.getItem('counter')).toBe('{"value":0}');

			flushSync(() => {
				state.current.value = 1;
			});
			expect(state.current).toStrictEqual({ value: 1 });
			expect(sessionStorage.getItem('counter')).toBe('{"value":1}');

			window.location.reload();

			expect(state.current).toStrictEqual({ value: 1 });
			expect(sessionStorage.getItem('counter')).toBe('{"value":1}');
		});

		cleanup();
	});

	it('Persists state correctly after multiple changes', () => {
		const cleanup = $effect.root(() => {
			const state = sessionState('counter', { value: 0 });

			expect(state.current).toStrictEqual({ value: 0 });
			expect(sessionStorage.getItem('counter')).toBe('{"value":0}');

			flushSync(() => {
				state.current.value = 1;
			});
			expect(state.current).toStrictEqual({ value: 1 });
			expect(sessionStorage.getItem('counter')).toBe('{"value":1}');

			flushSync(() => {
				state.current.value = 2;
			});
			expect(state.current).toStrictEqual({ value: 2 });
			expect(sessionStorage.getItem('counter')).toBe('{"value":2}');

			flushSync(() => {
				state.current.value = 3;
			});
			expect(state.current).toStrictEqual({ value: 3 });
			expect(sessionStorage.getItem('counter')).toBe('{"value":3}');
		});

		cleanup();
	});
});

describe('Works with arrays', () => {
	beforeEach(() => {
		sessionStorage.clear();
	});

	beforeAll(() => {
		/** @see https://stackoverflow.com/a/55771671/20892950 */
		Object.defineProperty(window, 'location', {
			configurable: true,
			value: { reload: vi.fn(() => {}) }
		});
	});

	afterAll(() => {
		Object.defineProperty(window, 'location', {
			configurable: true,
			value: ORIGINAL_WINDOW_LOCATION
		});
	});

	it('Persists state correctly', () => {
		const cleanup = $effect.root(() => {
			const state = sessionState('counter', [] as number[]);

			expect(state.current).toStrictEqual([]);
			expect(sessionStorage.getItem('counter')).toBe('[]');

			flushSync(() => {
				state.current = [1];
			});
			expect(state.current).toStrictEqual([1]);
			expect(sessionStorage.getItem('counter')).toBe('[1]');
		});

		cleanup();
	});

	it('Persists state correctly after reload', () => {
		const cleanup = $effect.root(() => {
			const state = sessionState('counter', [] as number[]);

			expect(state.current).toStrictEqual([]);
			expect(sessionStorage.getItem('counter')).toBe('[]');

			flushSync(() => {
				state.current = [1];
			});
			expect(state.current).toStrictEqual([1]);
			expect(sessionStorage.getItem('counter')).toBe('[1]');

			window.location.reload();

			expect(state.current).toStrictEqual([1]);
			expect(sessionStorage.getItem('counter')).toBe('[1]');
		});

		cleanup();
	});

	it('Persists state correctly after multiple changes', () => {
		const cleanup = $effect.root(() => {
			const state = sessionState('counter', [] as number[]);

			expect(state.current).toStrictEqual([]);
			expect(sessionStorage.getItem('counter')).toBe('[]');

			flushSync(() => {
				state.current = [1];
			});
			expect(state.current).toStrictEqual([1]);
			expect(sessionStorage.getItem('counter')).toBe('[1]');

			flushSync(() => {
				state.current = [2];
			});
			expect(state.current).toStrictEqual([2]);
			expect(sessionStorage.getItem('counter')).toBe('[2]');

			flushSync(() => {
				state.current = [3];
			});
			expect(state.current).toStrictEqual([3]);
			expect(sessionStorage.getItem('counter')).toBe('[3]');
		});

		cleanup();
	});

	it('Retrieves initial state from local storage correctly', () => {
		const cleanup = $effect.root(() => {
			sessionStorage.setItem('counter', '[1]');

			const state = sessionState('counter', [] as number[]);

			expect(state.current).toStrictEqual([1]);
		});

		cleanup();
	});
});

describe('Works with array methods', () => {
	beforeEach(() => {
		sessionStorage.clear();
	});

	beforeAll(() => {
		/** @see https://stackoverflow.com/a/55771671/20892950 */
		Object.defineProperty(window, 'location', {
			configurable: true,
			value: { reload: vi.fn(() => {}) }
		});
	});

	afterAll(() => {
		Object.defineProperty(window, 'location', {
			configurable: true,
			value: ORIGINAL_WINDOW_LOCATION
		});
	});

	it('Persists state correctly', () => {
		const cleanup = $effect.root(() => {
			const state = sessionState('counter', [] as number[]);

			expect(state.current).toStrictEqual([]);
			expect(sessionStorage.getItem('counter')).toBe('[]');

			flushSync(() => {
				state.current.push(1);
			});
			expect(state.current).toStrictEqual([1]);
			expect(sessionStorage.getItem('counter')).toBe('[1]');
		});

		cleanup();
	});

	it('Persists state correctly after reload', () => {
		const cleanup = $effect.root(() => {
			const state = sessionState('counter', [] as number[]);

			expect(state.current).toStrictEqual([]);
			expect(sessionStorage.getItem('counter')).toBe('[]');

			flushSync(() => {
				state.current.push(1);
			});
			expect(state.current).toStrictEqual([1]);
			expect(sessionStorage.getItem('counter')).toBe('[1]');

			window.location.reload();

			expect(state.current).toStrictEqual([1]);
			expect(sessionStorage.getItem('counter')).toBe('[1]');
		});

		cleanup();
	});

	it('Persists state correctly after multiple changes', () => {
		const cleanup = $effect.root(() => {
			const state = sessionState('counter', [] as number[]);

			expect(state.current).toStrictEqual([]);
			expect(sessionStorage.getItem('counter')).toBe('[]');

			flushSync(() => {
				state.current.push(1);
			});
			expect(state.current).toStrictEqual([1]);
			expect(sessionStorage.getItem('counter')).toBe('[1]');

			flushSync(() => {
				state.current.push(2);
			});
			expect(state.current).toStrictEqual([1, 2]);
			expect(sessionStorage.getItem('counter')).toBe('[1,2]');

			flushSync(() => {
				state.current.push(3);
			});
			expect(state.current).toStrictEqual([1, 2, 3]);
			expect(sessionStorage.getItem('counter')).toBe('[1,2,3]');
		});

		cleanup();
	});

	it('Retrieves initial state from local storage correctly', () => {
		const cleanup = $effect.root(() => {
			sessionStorage.setItem('counter', '[1]');

			const state = sessionState('counter', [] as number[]);

			expect(state.current).toStrictEqual([1]);
		});

		cleanup();
	});
});
