import { afterAll, beforeAll, beforeEach, describe, expect, it, vi } from 'vitest';
import { localState } from './index.svelte.js';

// Used for testing classes
class Vector {
	x: number;
	y: number;

	constructor(x: number, y: number) {
		this.x = x;
		this.y = y;
	}
}

const ORIGINAL_WINDOW_LOCATION = window.location;

describe('Works with primitives', () => {
	beforeEach(() => {
		localStorage.clear();
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
			const state = localState('counter', 0);

			expect(state.current).toBe(0);
			expect(localStorage.getItem('counter')).toBe('0');

			state.current = 1;
			expect(state.current).toBe(1);
			expect(localStorage.getItem('counter')).toBe('1');
		});

		cleanup();
	});

	it('Persists state correctly after reload', () => {
		const cleanup = $effect.root(() => {
			const state = localState('counter', 0);

			expect(state.current).toBe(0);
			expect(localStorage.getItem('counter')).toBe('0');

			state.current = 1;
			expect(state.current).toBe(1);
			expect(localStorage.getItem('counter')).toBe('1');

			window.location.reload();

			expect(state.current).toBe(1);
			expect(localStorage.getItem('counter')).toBe('1');
		});

		cleanup();
	});

	it('Persists state correctly after multiple changes', () => {
		const cleanup = $effect.root(() => {
			const state = localState('counter', 0);

			expect(state.current).toBe(0);
			expect(localStorage.getItem('counter')).toBe('0');

			state.current = 1;
			expect(state.current).toBe(1);
			expect(localStorage.getItem('counter')).toBe('1');

			state.current = 2;
			expect(state.current).toBe(2);
			expect(localStorage.getItem('counter')).toBe('2');

			state.current = 3;
			expect(state.current).toBe(3);
			expect(localStorage.getItem('counter')).toBe('3');
		});

		cleanup();
	});

	it('Retrieves initial state from local storage correctly as number', () => {
		const cleanup = $effect.root(() => {
			localStorage.setItem('counter', '1');

			const state = localState('counter', 0);

			expect(state.current).toBe(1);
		});

		cleanup();
	});

	it('Retrieves initial state from local storage correctly as string', () => {
		const cleanup = $effect.root(() => {
			localStorage.setItem('search', 'test');

			const state = localState('search', '', {
				serialize: (value) => value,
				deserialize: (value) => value
			});

			expect(state.current).toBe('test');
		});

		cleanup();
	});

	it('Retrieves initial state from local storage correctly as boolean', () => {
		const cleanup = $effect.root(() => {
			localStorage.setItem('accept_cookies', 'true');

			const state = localState('accept_cookies', false, {
				deserialize: (value) => value === 'true'
			});

			expect(state.current).toBe(true);
		});

		cleanup();
	});
});

describe('Works with objects', () => {
	beforeEach(() => {
		localStorage.clear();
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
			const state = localState('counter', { value: 0 });

			expect(state.current).toStrictEqual({ value: 0 });
			expect(localStorage.getItem('counter')).toBe('{"value":0}');

			state.current = { value: 1 };
			expect(state.current).toStrictEqual({ value: 1 });
			expect(localStorage.getItem('counter')).toBe('{"value":1}');
		});

		cleanup();
	});

	it('Persists state correctly after reload', () => {
		const cleanup = $effect.root(() => {
			const state = localState('counter', { value: 0 });

			expect(state.current).toStrictEqual({ value: 0 });
			expect(localStorage.getItem('counter')).toBe('{"value":0}');

			state.current = { value: 1 };
			expect(state.current).toStrictEqual({ value: 1 });
			expect(localStorage.getItem('counter')).toBe('{"value":1}');

			window.location.reload();

			expect(state.current).toStrictEqual({ value: 1 });
			expect(localStorage.getItem('counter')).toBe('{"value":1}');
		});

		cleanup();
	});

	it('Persists state correctly after multiple changes', () => {
		const cleanup = $effect.root(() => {
			const state = localState('counter', { value: 0 });

			expect(state.current).toStrictEqual({ value: 0 });
			expect(localStorage.getItem('counter')).toBe('{"value":0}');

			state.current = { value: 1 };
			expect(state.current).toStrictEqual({ value: 1 });
			expect(localStorage.getItem('counter')).toBe('{"value":1}');

			state.current = { value: 2 };
			expect(state.current).toStrictEqual({ value: 2 });
			expect(localStorage.getItem('counter')).toBe('{"value":2}');

			state.current = { value: 3 };
			expect(state.current).toStrictEqual({ value: 3 });
			expect(localStorage.getItem('counter')).toBe('{"value":3}');
		});

		cleanup();
	});

	it('Retrieves initial state from local storage correctly', () => {
		const cleanup = $effect.root(() => {
			localStorage.setItem('counter', '{"value":1}');

			const state = localState('counter', { value: 0 });

			expect(state.current).toStrictEqual({ value: 1 });
		});

		cleanup();
	});
});

describe('Works with property assignment on objects', () => {
	beforeEach(() => {
		localStorage.clear();
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
			const state = localState('counter', { value: 0 });

			expect(state.current).toStrictEqual({ value: 0 });
			expect(localStorage.getItem('counter')).toBe('{"value":0}');

			state.current.value = 1;
			expect(state.current).toStrictEqual({ value: 1 });
			expect(localStorage.getItem('counter')).toBe('{"value":1}');
		});

		cleanup();
	});

	it('Persists state correctly after reload', () => {
		const cleanup = $effect.root(() => {
			const state = localState('counter', { value: 0 });

			expect(state.current).toStrictEqual({ value: 0 });
			expect(localStorage.getItem('counter')).toBe('{"value":0}');

			state.current.value = 1;
			expect(state.current).toStrictEqual({ value: 1 });
			expect(localStorage.getItem('counter')).toBe('{"value":1}');

			window.location.reload();

			expect(state.current).toStrictEqual({ value: 1 });
			expect(localStorage.getItem('counter')).toBe('{"value":1}');
		});

		cleanup();
	});

	it('Persists state correctly after multiple changes', () => {
		const cleanup = $effect.root(() => {
			const state = localState('counter', { value: 0 });

			expect(state.current).toStrictEqual({ value: 0 });
			expect(localStorage.getItem('counter')).toBe('{"value":0}');

			state.current.value = 1;
			expect(state.current).toStrictEqual({ value: 1 });
			expect(localStorage.getItem('counter')).toBe('{"value":1}');

			state.current.value = 2;
			expect(state.current).toStrictEqual({ value: 2 });
			expect(localStorage.getItem('counter')).toBe('{"value":2}');

			state.current.value = 3;
			expect(state.current).toStrictEqual({ value: 3 });
			expect(localStorage.getItem('counter')).toBe('{"value":3}');
		});

		cleanup();
	});
});

describe('Works with arrays', () => {
	beforeEach(() => {
		localStorage.clear();
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
			const state = localState('counter', [] as number[]);

			expect(state.current).toStrictEqual([]);
			expect(localStorage.getItem('counter')).toBe('[]');

			state.current = [1];
			expect(state.current).toStrictEqual([1]);
			expect(localStorage.getItem('counter')).toBe('[1]');
		});

		cleanup();
	});

	it('Persists state correctly after reload', () => {
		const cleanup = $effect.root(() => {
			const state = localState('counter', [] as number[]);

			expect(state.current).toStrictEqual([]);
			expect(localStorage.getItem('counter')).toBe('[]');

			state.current = [1];
			expect(state.current).toStrictEqual([1]);
			expect(localStorage.getItem('counter')).toBe('[1]');

			window.location.reload();

			expect(state.current).toStrictEqual([1]);
			expect(localStorage.getItem('counter')).toBe('[1]');
		});

		cleanup();
	});

	it('Persists state correctly after multiple changes', () => {
		const cleanup = $effect.root(() => {
			const state = localState('counter', [] as number[]);

			expect(state.current).toStrictEqual([]);
			expect(localStorage.getItem('counter')).toBe('[]');

			state.current = [1];
			expect(state.current).toStrictEqual([1]);
			expect(localStorage.getItem('counter')).toBe('[1]');

			state.current = [2];
			expect(state.current).toStrictEqual([2]);
			expect(localStorage.getItem('counter')).toBe('[2]');

			state.current = [3];
			expect(state.current).toStrictEqual([3]);
			expect(localStorage.getItem('counter')).toBe('[3]');
		});

		cleanup();
	});

	it('Retrieves initial state from local storage correctly', () => {
		const cleanup = $effect.root(() => {
			localStorage.setItem('counter', '[1]');

			const state = localState('counter', [] as number[]);

			expect(state.current).toStrictEqual([1]);
		});

		cleanup();
	});
});

describe('Works with array methods', () => {
	beforeEach(() => {
		localStorage.clear();
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
			const state = localState('counter', [] as number[]);

			expect(state.current).toStrictEqual([]);
			expect(localStorage.getItem('counter')).toBe('[]');

			state.current.push(1);
			expect(state.current).toStrictEqual([1]);
			expect(localStorage.getItem('counter')).toBe('[1]');
		});

		cleanup();
	});

	it('Persists state correctly after reload', () => {
		const cleanup = $effect.root(() => {
			const state = localState('counter', [] as number[]);

			expect(state.current).toStrictEqual([]);
			expect(localStorage.getItem('counter')).toBe('[]');

			state.current.push(1);
			expect(state.current).toStrictEqual([1]);
			expect(localStorage.getItem('counter')).toBe('[1]');

			window.location.reload();

			expect(state.current).toStrictEqual([1]);
			expect(localStorage.getItem('counter')).toBe('[1]');
		});

		cleanup();
	});

	it('Persists state correctly after multiple changes', () => {
		const cleanup = $effect.root(() => {
			const state = localState('counter', [] as number[]);

			expect(state.current).toStrictEqual([]);
			expect(localStorage.getItem('counter')).toBe('[]');

			state.current.push(1);
			expect(state.current).toStrictEqual([1]);
			expect(localStorage.getItem('counter')).toBe('[1]');

			state.current.push(2);
			expect(state.current).toStrictEqual([1, 2]);
			expect(localStorage.getItem('counter')).toBe('[1,2]');

			state.current.push(3);
			expect(state.current).toStrictEqual([1, 2, 3]);
			expect(localStorage.getItem('counter')).toBe('[1,2,3]');
		});

		cleanup();
	});

	it('Retrieves initial state from local storage correctly', () => {
		const cleanup = $effect.root(() => {
			localStorage.setItem('counter', '[1]');

			const state = localState('counter', [] as number[]);

			expect(state.current).toStrictEqual([1]);
		});

		cleanup();
	});
});

describe('Works with classes', () => {
	beforeEach(() => {
		localStorage.clear();
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
			const state = localState('vector', new Vector(0, 0), {
				serialize: (value) => JSON.stringify([value.x, value.y]),
				deserialize: (value) => new Vector(...(JSON.parse(value) as [number, number]))
			});

			expect(state.current).toStrictEqual(new Vector(0, 0));
			expect(localStorage.getItem('vector')).toBe('[0,0]');

			state.current.x = 1;
			expect(state.current).toStrictEqual(new Vector(1, 0));
			expect(localStorage.getItem('vector')).toBe('[1,0]');
		});

		cleanup();
	});

	it('Persists state correctly after reload', () => {
		const cleanup = $effect.root(() => {
			const state = localState('vector', new Vector(0, 0), {
				serialize: (value) => JSON.stringify([value.x, value.y]),
				deserialize: (value) => new Vector(...(JSON.parse(value) as [number, number]))
			});

			expect(state.current).toStrictEqual(new Vector(0, 0));
			expect(localStorage.getItem('vector')).toBe('[0,0]');

			state.current.x = 1;
			expect(state.current).toStrictEqual(new Vector(1, 0));
			expect(localStorage.getItem('vector')).toBe('[1,0]');

			window.location.reload();

			expect(state.current).toStrictEqual(new Vector(1, 0));
			expect(localStorage.getItem('vector')).toBe('[1,0]');
		});

		cleanup();
	});

	it('Persists state correctly after multiple changes', () => {
		const cleanup = $effect.root(() => {
			const state = localState('vector', new Vector(0, 0), {
				serialize: (value) => JSON.stringify([value.x, value.y]),
				deserialize: (value) => new Vector(...(JSON.parse(value) as [number, number]))
			});

			expect(state.current).toStrictEqual(new Vector(0, 0));
			expect(localStorage.getItem('vector')).toBe('[0,0]');

			state.current.x = 1;
			expect(state.current).toStrictEqual(new Vector(1, 0));
			expect(localStorage.getItem('vector')).toBe('[1,0]');

			state.current.x = 2;
			expect(state.current).toStrictEqual(new Vector(2, 0));
			expect(localStorage.getItem('vector')).toBe('[2,0]');

			state.current.x = 3;
			expect(state.current).toStrictEqual(new Vector(3, 0));
			expect(localStorage.getItem('vector')).toBe('[3,0]');
		});

		cleanup();
	});

	it('Retrieves initial state from local storage correctly', () => {
		const cleanup = $effect.root(() => {
			localStorage.setItem('vector', '[1,2]');

			const state = localState('vector', new Vector(0, 0), {
				serialize: (value) => JSON.stringify([value.x, value.y]),
				deserialize: (value) => new Vector(...(JSON.parse(value) as [number, number]))
			});

			expect(state.current).toStrictEqual(new Vector(1, 2));
		});

		cleanup();
	});
});