import { describe, expect, it } from 'vitest';
import { defaultState } from './index.svelte.js';
import { flushSync } from 'svelte';

describe('Works with primitives', () => {
	it('Is initialized to the default value if no initial value is given', () => {
		const message = defaultState(0);

		expect(message.current).toBe(0);
	});

	it('Is initialized to the initial value if given', () => {
		const message = defaultState(0, 1);

		expect(message.current).toBe(1);
	});

	it('Updates correctly after one change', () => {
		const message = defaultState(0, 1);

		expect(message.current).toBe(1);

		flushSync(() => {
			message.current = 2;
		});

		expect(message.current).toBe(2);
	});

	it('Updates correctly after multiple changes', () => {
		const message = defaultState(0, 1);

		expect(message.current).toBe(1);

		flushSync(() => {
			message.current = 2;
		});

		expect(message.current).toBe(2);

		flushSync(() => {
			message.current = 3;
		});

		expect(message.current).toBe(3);

		flushSync(() => {
			message.current = 4;
		});

		expect(message.current).toBe(4);
	});

	it('Resets to the default value if the the new value is null', () => {
		const message = defaultState(0, 1);

		expect(message.current).toBe(1);

		flushSync(() => {
			message.current = null;
		});

		expect(message.current).toBe(0);
	});

	it('Resets to the default value if the the new value is undefined', () => {
		const message = defaultState(0, 1);

		expect(message.current).toBe(1);

		flushSync(() => {
			message.current = undefined;
		});

		expect(message.current).toBe(0);
	});
});

describe('Works with objects', () => {
	it('Is initialized to the default value if no initial value is given', () => {
		const message = defaultState({ current: 0 });

		expect(message.current).toStrictEqual({ current: 0 });
	});

	it('Is initialized to the initial value if given', () => {
		const message = defaultState({ current: 0 }, { current: 1 });

		expect(message.current).toStrictEqual({ current: 1 });
	});

	it('Updates correctly after one change', () => {
		const message = defaultState({ current: 0 }, { current: 1 });

		expect(message.current).toStrictEqual({ current: 1 });

		flushSync(() => {
			message.current = { current: 2 };
		});

		expect(message.current).toStrictEqual({ current: 2 });
	});

	it('Updates correctly after multiple changes', () => {
		const message = defaultState({ current: 0 }, { current: 1 });

		expect(message.current).toStrictEqual({ current: 1 });

		flushSync(() => {
			message.current = { current: 2 };
		});

		expect(message.current).toStrictEqual({ current: 2 });

		flushSync(() => {
			message.current = { current: 3 };
		});

		expect(message.current).toStrictEqual({ current: 3 });

		flushSync(() => {
			message.current = { current: 4 };
		});

		expect(message.current).toStrictEqual({ current: 4 });
	});

	it('Resets to the default value if the the new value is null', () => {
		const message = defaultState({ current: 0 }, { current: 1 });

		expect(message.current).toStrictEqual({ current: 1 });

		flushSync(() => {
			message.current = null;
		});

		expect(message.current).toStrictEqual({ current: 0 });
	});

	it('Resets to the default value if the the new value is undefined', () => {
		const message = defaultState({ current: 0 }, { current: 1 });

		expect(message.current).toStrictEqual({ current: 1 });

		flushSync(() => {
			message.current = undefined;
		});

		expect(message.current).toStrictEqual({ current: 0 });
	});
});

describe('Works with property assignments on objects', () => {
	it('Is initialized to the default value if no initial value is given', () => {
		const message = defaultState({ current: 0 });

		expect(message.current!.current).toBe(0);
	});

	it('Is initialized to the initial value if given', () => {
		const message = defaultState({ current: 0 }, { current: 1 });

		expect(message.current!.current).toBe(1);
	});

	it('Updates correctly after one change', () => {
		const message = defaultState({ current: 0 }, { current: 1 });

		expect(message.current!.current).toBe(1);

		flushSync(() => {
			message.current!.current = 2;
		});

		expect(message.current!.current).toBe(2);
	});

	it('Updates correctly after multiple changes', () => {
		const message = defaultState({ current: 0 }, { current: 1 });

		expect(message.current!.current).toBe(1);

		flushSync(() => {
			message.current!.current = 2;
		});

		expect(message.current!.current).toBe(2);

		flushSync(() => {
			message.current!.current = 3;
		});

		expect(message.current!.current).toBe(3);

		flushSync(() => {
			message.current!.current = 4;
		});

		expect(message.current!.current).toBe(4);
	});

	it('Resets to the default value if the the new value is null', () => {
		const message = defaultState({ current: 0 }, { current: 1 });

		expect(message.current!.current).toBe(1);

		flushSync(() => {
			message.current = null;
		});

		expect(message.current!.current).toBe(0);
	});

	it('Resets to the default value if the the new value is undefined', () => {
		const message = defaultState({ current: 0 }, { current: 1 });

		expect(message.current!.current).toBe(1);

		flushSync(() => {
			message.current = undefined;
		});

		expect(message.current!.current).toBe(0);
	});

	it("Doesn't reset to the default value if the new value is null", () => {
		const message = defaultState({ current: 0 }, { current: 1 });

		expect(message.current!.current).toBe(1);

		flushSync(() => {
			// @ts-expect-error Intentional test
			message.current!.current = null;
		});

		expect(message.current).toStrictEqual({ current: null });
		expect(message.current!.current).toBe(null);
	});

	it("Doesn't reset to the default value if the new value is undefined", () => {
		const message = defaultState({ current: 0 }, { current: 1 });

		expect(message.current!.current).toBe(1);

		flushSync(() => {
			// @ts-expect-error Intentional test
			message.current!.current = undefined;
		});

		expect(message.current).toStrictEqual({ current: undefined });
		expect(message.current!.current).toBe(undefined);
	});
});

describe('Works with arrays', () => {
	it('Is initialized to the default value if no initial value is given', () => {
		const message = defaultState([0]);

		expect(message.current).toStrictEqual([0]);
	});

	it('Is initialized to the initial value if given', () => {
		const message = defaultState([0], [1]);

		expect(message.current).toStrictEqual([1]);
	});

	it('Updates correctly after one change', () => {
		const message = defaultState([0], [1]);

		expect(message.current).toStrictEqual([1]);

		flushSync(() => {
			message.current = [2];
		});

		expect(message.current).toStrictEqual([2]);
	});

	it('Updates correctly after multiple changes', () => {
		const message = defaultState([0], [1]);

		expect(message.current).toStrictEqual([1]);

		flushSync(() => {
			message.current = [2];
		});

		expect(message.current).toStrictEqual([2]);

		flushSync(() => {
			message.current = [3];
		});

		expect(message.current).toStrictEqual([3]);

		flushSync(() => {
			message.current = [4];
		});

		expect(message.current).toStrictEqual([4]);
	});

	it('Resets to the default value if the the new value is null', () => {
		const message = defaultState([0], [1]);

		expect(message.current).toStrictEqual([1]);

		flushSync(() => {
			message.current = null;
		});

		expect(message.current).toStrictEqual([0]);
	});

	it('Resets to the default value if the the new value is undefined', () => {
		const message = defaultState([0], [1]);

		expect(message.current).toStrictEqual([1]);

		flushSync(() => {
			message.current = undefined;
		});

		expect(message.current).toStrictEqual([0]);
	});
});

describe('Works with array methods', () => {
	it('Is initialized to the default value if no initial value is given', () => {
		const message = defaultState([0]);

		expect(message.current).toStrictEqual([0]);
	});

	it('Is initialized to the initial value if given', () => {
		const message = defaultState([0], [1]);

		expect(message.current).toStrictEqual([1]);
	});

	it('Updates correctly after one change', () => {
		const message = defaultState([0], [1]);

		expect(message.current).toStrictEqual([1]);

		flushSync(() => {
			message.current!.push(2);
		});

		expect(message.current).toStrictEqual([1, 2]);
	});

	it('Updates correctly after multiple changes', () => {
		const message = defaultState([0], [1]);

		expect(message.current).toStrictEqual([1]);

		flushSync(() => {
			message.current!.push(2);
		});

		expect(message.current).toStrictEqual([1, 2]);

		flushSync(() => {
			message.current!.push(3);
		});

		expect(message.current).toStrictEqual([1, 2, 3]);

		flushSync(() => {
			message.current!.push(4);
		});

		expect(message.current).toStrictEqual([1, 2, 3, 4]);
	});

	// * No point in checking for null and undefined since they are already
	// * handled in "Works with arrays" and it'd be the same tests
});
