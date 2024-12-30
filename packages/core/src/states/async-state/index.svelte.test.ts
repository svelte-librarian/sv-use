import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { asyncState } from './index.svelte.js';

// Used for testing classes
class Vector {
	x: number;
	y: number;

	constructor(x: number, y: number) {
		this.x = x;
		this.y = y;
	}
}

const DEFAULT_TIMEOUT = 1000;

describe("'asyncState' for base usage", () => {
	beforeEach(() => {
		vi.useFakeTimers();
	});

	afterEach(() => {
		vi.restoreAllMocks();
	});

	it('Fetches data immediately', async () => {
		const state = asyncState(() => {
			return new Promise((resolve: (value: string) => void) => {
				setTimeout(() => {
					resolve('data');
				}, DEFAULT_TIMEOUT);
			});
		}, '');

		expect(state.current).toBe('');
		expect(state.isLoading).toBe(true);
		expect(state.isReady).toBe(false);
		expect(state.error).toBe(null);

		await vi.runAllTimersAsync();

		expect(state.current).toBe('data');
		expect(state.isLoading).toBe(false);
		expect(state.isReady).toBe(true);
		expect(state.error).toBe(null);
	});

	it('Handles error correctly', async () => {
		const state = asyncState(() => {
			return new Promise((_, reject: (reason: string) => void) => {
				setTimeout(() => {
					reject('error');
				}, DEFAULT_TIMEOUT);
			});
		}, '');

		expect(state.current).toBe('');
		expect(state.isLoading).toBe(true);
		expect(state.isReady).toBe(false);
		expect(state.error).toBe(null);

		await vi.runAllTimersAsync();

		expect(state.current).toBe('');
		expect(state.isLoading).toBe(false);
		expect(state.isReady).toBe(false);
		expect(state.error).toBe('error');
	});

	it("Fetches data correctly after calling 'execute'", async () => {
		const state = asyncState(
			() => {
				return new Promise((resolve: (value: string) => void) => {
					setTimeout(() => {
						resolve('data');
					}, DEFAULT_TIMEOUT);
				});
			},
			'',
			{
				immediate: false
			}
		);

		expect(state.current).toBe('');
		expect(state.isLoading).toBe(false);
		expect(state.isReady).toBe(false);
		expect(state.error).toBe(null);

		state.execute();

		expect(state.current).toBe('');
		expect(state.isLoading).toBe(true);
		expect(state.isReady).toBe(false);
		expect(state.error).toBe(null);

		await vi.runAllTimersAsync();

		expect(state.current).toBe('data');
		expect(state.isLoading).toBe(false);
		expect(state.isReady).toBe(true);
		expect(state.error).toBe(null);
	});

	it('Fetches data correctly with parameters', async () => {
		const state = asyncState(
			(a: number, b: number) => {
				return new Promise((resolve: (value: number) => void) => {
					setTimeout(() => {
						resolve(a + b);
					}, DEFAULT_TIMEOUT);
				});
			},
			0,
			{
				immediate: false
			}
		);

		expect(state.current).toBe(0);
		expect(state.isLoading).toBe(false);
		expect(state.isReady).toBe(false);
		expect(state.error).toBe(null);

		state.execute(1, 2);

		expect(state.current).toBe(0);
		expect(state.isLoading).toBe(true);
		expect(state.isReady).toBe(false);
		expect(state.error).toBe(null);

		await vi.runAllTimersAsync();

		expect(state.current).toBe(3);
		expect(state.isLoading).toBe(false);
		expect(state.isReady).toBe(true);
		expect(state.error).toBe(null);
	});

	it('Re-fetches data correctly by keeping the last value', async () => {
		const state = asyncState(
			(a: number, b: number) => {
				return new Promise((resolve: (value: number) => void) => {
					setTimeout(() => {
						resolve(a + b);
					}, DEFAULT_TIMEOUT);
				});
			},
			0,
			{
				immediate: false
			}
		);

		expect(state.current).toBe(0);
		expect(state.isLoading).toBe(false);
		expect(state.isReady).toBe(false);
		expect(state.error).toBe(null);

		state.execute(1, 2);

		expect(state.current).toBe(0);
		expect(state.isLoading).toBe(true);
		expect(state.isReady).toBe(false);
		expect(state.error).toBe(null);

		await vi.runAllTimersAsync();

		expect(state.current).toBe(3);
		expect(state.isLoading).toBe(false);
		expect(state.isReady).toBe(true);
		expect(state.error).toBe(null);

		state.execute(3, 4);

		expect(state.current).toBe(3);
		expect(state.isLoading).toBe(true);
		expect(state.isReady).toBe(false);
		expect(state.error).toBe(null);

		await vi.runAllTimersAsync();

		expect(state.current).toBe(7);
		expect(state.isLoading).toBe(false);
		expect(state.isReady).toBe(true);
		expect(state.error).toBe(null);
	});

	it('Re-fetches data correctly by resetting the value', async () => {
		const state = asyncState(
			(a: number, b: number) => {
				return new Promise((resolve: (value: number) => void) => {
					setTimeout(() => {
						resolve(a + b);
					}, DEFAULT_TIMEOUT);
				});
			},
			0,
			{
				immediate: false,
				resetOnExecute: true
			}
		);

		expect(state.current).toBe(0);
		expect(state.isLoading).toBe(false);
		expect(state.isReady).toBe(false);
		expect(state.error).toBe(null);

		state.execute(1, 2);

		expect(state.current).toBe(0);
		expect(state.isLoading).toBe(true);
		expect(state.isReady).toBe(false);
		expect(state.error).toBe(null);

		await vi.runAllTimersAsync();

		expect(state.current).toBe(3);
		expect(state.isLoading).toBe(false);
		expect(state.isReady).toBe(true);
		expect(state.error).toBe(null);

		state.execute(3, 4);

		expect(state.current).toBe(0);
		expect(state.isLoading).toBe(true);
		expect(state.isReady).toBe(false);
		expect(state.error).toBe(null);

		await vi.runAllTimersAsync();

		expect(state.current).toBe(7);
		expect(state.isLoading).toBe(false);
		expect(state.isReady).toBe(true);
		expect(state.error).toBe(null);
	});

	it("Triggers 'onSuccess' callback", async () => {
		const onSuccessCallback = vi.fn(() => {});

		const state = asyncState(
			() => {
				return new Promise((resolve: (value: string) => void) => {
					setTimeout(() => {
						resolve('data');
					}, DEFAULT_TIMEOUT);
				});
			},
			'',
			{
				onSuccess: onSuccessCallback
			}
		);

		expect(state.current).toBe('');
		expect(state.isLoading).toBe(true);
		expect(state.isReady).toBe(false);
		expect(state.error).toBe(null);

		await vi.runAllTimersAsync();

		expect(state.current).toBe('data');
		expect(state.isLoading).toBe(false);
		expect(state.isReady).toBe(true);
		expect(state.error).toBe(null);

		expect(onSuccessCallback).toHaveBeenCalledTimes(1);
	});

	it("Triggers 'onError' callback", async () => {
		const onErrorCallback = vi.fn(() => {});

		const state = asyncState(
			() => {
				return new Promise((_, reject: (reason: string) => void) => {
					setTimeout(() => {
						reject('error');
					}, DEFAULT_TIMEOUT);
				});
			},
			'',
			{
				onError: onErrorCallback
			}
		);

		expect(state.current).toBe('');
		expect(state.isLoading).toBe(true);
		expect(state.isReady).toBe(false);
		expect(state.error).toBe(null);

		await vi.runAllTimersAsync();

		expect(state.current).toBe('');
		expect(state.isLoading).toBe(false);
		expect(state.isReady).toBe(false);
		expect(state.error).toBe('error');

		expect(onErrorCallback).toHaveBeenCalledTimes(1);
	});
});

describe("'asyncState' with assignment", () => {
	it('Works with primitives', async () => {
		const state = asyncState(() => {
			return new Promise((resolve: (value: string) => void) => {
				setTimeout(() => {
					resolve('data');
				}, DEFAULT_TIMEOUT);
			});
		}, '');

		expect(state.current).toBe('');
		expect(state.isLoading).toBe(true);
		expect(state.isReady).toBe(false);
		expect(state.error).toBe(null);

		await vi.runAllTimersAsync();

		expect(state.current).toBe('data');
		expect(state.isLoading).toBe(false);
		expect(state.isReady).toBe(true);
		expect(state.error).toBe(null);

		state.current = 'new data';

		expect(state.current).toBe('new data');
	});

	it('Works with objects', async () => {
		const state = asyncState(
			() => {
				return new Promise((resolve: (value: { value: string }) => void) => {
					setTimeout(() => {
						resolve({ value: 'data' });
					}, DEFAULT_TIMEOUT);
				});
			},
			{ value: '' }
		);

		expect(state.current.value).toBe('');
		expect(state.isLoading).toBe(true);
		expect(state.isReady).toBe(false);
		expect(state.error).toBe(null);

		await vi.runAllTimersAsync();

		expect(state.current.value).toBe('data');
		expect(state.isLoading).toBe(false);
		expect(state.isReady).toBe(true);
		expect(state.error).toBe(null);

		state.current = { value: 'new data' };

		expect(state.current).toStrictEqual({ value: 'new data' });
	});

	it('Works with property assignment on objects', async () => {
		const state = asyncState(
			() => {
				return new Promise((resolve: (value: { value: string }) => void) => {
					setTimeout(() => {
						resolve({ value: 'data' });
					}, DEFAULT_TIMEOUT);
				});
			},
			{ value: '' }
		);

		expect(state.current.value).toBe('');
		expect(state.isLoading).toBe(true);
		expect(state.isReady).toBe(false);
		expect(state.error).toBe(null);

		await vi.runAllTimersAsync();

		expect(state.current.value).toBe('data');
		expect(state.isLoading).toBe(false);
		expect(state.isReady).toBe(true);
		expect(state.error).toBe(null);

		state.current.value = 'new data';

		expect(state.current).toStrictEqual({ value: 'new data' });
	});

	it('Works with arrays', async () => {
		const state = asyncState(() => {
			return new Promise((resolve: (value: string[]) => void) => {
				setTimeout(() => {
					resolve(['data']);
				}, DEFAULT_TIMEOUT);
			});
		}, []);

		expect(state.current).toStrictEqual([]);
		expect(state.isLoading).toBe(true);
		expect(state.isReady).toBe(false);
		expect(state.error).toBe(null);

		await vi.runAllTimersAsync();

		expect(state.current).toStrictEqual(['data']);
		expect(state.isLoading).toBe(false);
		expect(state.isReady).toBe(true);
		expect(state.error).toBe(null);

		state.current = ['new data'];

		expect(state.current).toStrictEqual(['new data']);
	});

	it('Works with array methods', async () => {
		const state = asyncState(() => {
			return new Promise((resolve: (value: string[]) => void) => {
				setTimeout(() => {
					resolve(['data']);
				}, DEFAULT_TIMEOUT);
			});
		}, []);

		expect(state.current).toStrictEqual([]);
		expect(state.isLoading).toBe(true);
		expect(state.isReady).toBe(false);
		expect(state.error).toBe(null);

		await vi.runAllTimersAsync();

		expect(state.current).toStrictEqual(['data']);
		expect(state.isLoading).toBe(false);
		expect(state.isReady).toBe(true);
		expect(state.error).toBe(null);

		state.current.push('new data');

		expect(state.current).toStrictEqual(['data', 'new data']);
	});

	it('Works with classes', async () => {
		const state = asyncState(
			() => {
				return new Promise((resolve: (value: Vector) => void) => {
					setTimeout(() => {
						resolve(new Vector(1, 2));
					}, DEFAULT_TIMEOUT);
				});
			},
			new Vector(0, 0)
		);

		expect(state.current).toStrictEqual(new Vector(0, 0));
		expect(state.isLoading).toBe(true);
		expect(state.isReady).toBe(false);
		expect(state.error).toBe(null);

		await vi.runAllTimersAsync();

		expect(state.current).toStrictEqual(new Vector(1, 2));
		expect(state.isLoading).toBe(false);
		expect(state.isReady).toBe(true);
		expect(state.error).toBe(null);

		state.current = new Vector(3, 4);

		expect(state.current).toStrictEqual(new Vector(3, 4));
	});

	it('Works with property assignment on classes', async () => {
		const state = asyncState(
			() => {
				return new Promise((resolve: (value: Vector) => void) => {
					setTimeout(() => {
						resolve(new Vector(1, 2));
					}, DEFAULT_TIMEOUT);
				});
			},
			new Vector(0, 0)
		);

		expect(state.current).toStrictEqual(new Vector(0, 0));
		expect(state.isLoading).toBe(true);
		expect(state.isReady).toBe(false);
		expect(state.error).toBe(null);

		await vi.runAllTimersAsync();

		expect(state.current).toStrictEqual(new Vector(1, 2));
		expect(state.isLoading).toBe(false);
		expect(state.isReady).toBe(true);
		expect(state.error).toBe(null);

		state.current.x = 3;

		expect(state.current).toStrictEqual(new Vector(3, 2));
	});
});
