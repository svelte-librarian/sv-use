import { describe, expect, it } from 'vitest';
import { getPrevious } from './index.svelte.js';
import { flushSync } from 'svelte';

describe('Works with primitives', () => {
	it('Is `undefined` by default', () => {
		const cleanup = $effect.root(() => {
			const counter = $state(0);
			const previousCounter = getPrevious(() => counter);

			expect(previousCounter.current).toBeUndefined();
		});

		cleanup();
	});

	it('Corresponds to the previous value after one change', () => {
		const cleanup = $effect.root(() => {
			let counter = $state(0);
			const previousCounter = getPrevious(() => counter);

			expect(previousCounter.current).toBeUndefined();

			flushSync(() => {
				counter = 1;
			});

			expect(previousCounter.current).toBe(0);
		});

		cleanup();
	});

	it('Corresponds to the previous value after multiple changes', () => {
		const cleanup = $effect.root(() => {
			let counter = $state(0);
			const previousCounter = getPrevious(() => counter);

			expect(previousCounter.current).toBeUndefined();

			flushSync(() => {
				counter = 1;
			});

			expect(previousCounter.current).toBe(0);

			flushSync(() => {
				counter = 2;
			});

			expect(previousCounter.current).toBe(1);

			flushSync(() => {
				counter = 3;
			});

			expect(previousCounter.current).toBe(2);
		});

		cleanup();
	});

	it('Is the previous the value if given', () => {
		const cleanup = $effect.root(() => {
			const counter = $state(0);
			const previousCounter = getPrevious(() => counter, -1);

			expect(previousCounter.current).toBe(-1);
		});

		cleanup();
	});
});

describe('Works with objects', () => {
	it('Is `undefined` by default', () => {
		const cleanup = $effect.root(() => {
			const counter = $state({ current: 0 });
			const previousCounter = getPrevious(() => counter);

			expect(previousCounter.current).toBeUndefined();
		});

		cleanup();
	});

	it('Corresponds to the previous value after one change', () => {
		const cleanup = $effect.root(() => {
			let counter = $state({ current: 0 });
			const previousCounter = getPrevious(() => counter);

			expect(previousCounter.current).toBeUndefined();

			flushSync(() => {
				counter = { current: 1 };
			});

			expect(previousCounter.current).toStrictEqual({ current: 0 });
		});

		cleanup();
	});

	it('Corresponds to the previous value after multiple changes', () => {
		const cleanup = $effect.root(() => {
			let counter = $state({ current: 0 });
			const previousCounter = getPrevious(() => counter);

			expect(previousCounter.current).toBeUndefined();

			flushSync(() => {
				counter = { current: 1 };
			});

			expect(previousCounter.current).toStrictEqual({ current: 0 });

			flushSync(() => {
				counter = { current: 2 };
			});

			expect(previousCounter.current).toStrictEqual({ current: 1 });

			flushSync(() => {
				counter = { current: 3 };
			});

			expect(previousCounter.current).toStrictEqual({ current: 2 });
		});

		cleanup();
	});

	it('Is the previous the value if given', () => {
		const cleanup = $effect.root(() => {
			const counter = $state({ current: 0 });
			const previousCounter = getPrevious(() => counter, { current: -1 });

			expect(previousCounter.current).toStrictEqual({ current: -1 });
		});

		cleanup();
	});
});

describe('Works with property assignments on objects', () => {
	it('Is `undefined` by default', () => {
		const cleanup = $effect.root(() => {
			const counter = $state({ current: 0 });
			const previousCounter = getPrevious(() => counter);

			expect(previousCounter.current).toBeUndefined();
		});

		cleanup();
	});

	it('Corresponds to the previous value after one change', () => {
		const cleanup = $effect.root(() => {
			const counter = $state({ current: 0 });
			const previousCounter = getPrevious(() => counter);

			expect(previousCounter.current?.current).toBeUndefined();

			flushSync(() => {
				counter.current = 1;
			});

			expect(previousCounter.current?.current).toBe(0);
		});

		cleanup();
	});

	it('Corresponds to the previous value after multiple changes', () => {
		const cleanup = $effect.root(() => {
			const counter = $state({ current: 0 });
			const previousCounter = getPrevious(() => counter);

			expect(previousCounter.current).toBeUndefined();

			flushSync(() => {
				counter.current = 1;
			});

			expect(previousCounter.current?.current).toBe(0);

			flushSync(() => {
				counter.current = 2;
			});

			expect(previousCounter.current?.current).toBe(1);

			flushSync(() => {
				counter.current = 3;
			});

			expect(previousCounter.current?.current).toBe(2);
		});

		cleanup();
	});

	it('Is the previous the value if given', () => {
		const cleanup = $effect.root(() => {
			const counter = $state({ current: 0 });
			const previousCounter = getPrevious(() => counter, { current: -1 });

			expect(previousCounter.current.current).toBe(-1);
		});

		cleanup();
	});
});

describe('Works with objects', () => {
	it('Is `undefined` by default', () => {
		const cleanup = $effect.root(() => {
			const counter = $state({ current: 0 });
			const previousCounter = getPrevious(() => counter);

			expect(previousCounter.current).toBeUndefined();
		});

		cleanup();
	});

	it('Corresponds to the previous value after one change', () => {
		const cleanup = $effect.root(() => {
			let counter = $state({ current: 0 });
			const previousCounter = getPrevious(() => counter);

			expect(previousCounter.current).toBeUndefined();

			flushSync(() => {
				counter = { current: 1 };
			});

			expect(previousCounter.current).toStrictEqual({ current: 0 });
		});

		cleanup();
	});

	it('Corresponds to the previous value after multiple changes', () => {
		const cleanup = $effect.root(() => {
			let counter = $state({ current: 0 });
			const previousCounter = getPrevious(() => counter);

			expect(previousCounter.current).toBeUndefined();

			flushSync(() => {
				counter = { current: 1 };
			});

			expect(previousCounter.current).toStrictEqual({ current: 0 });

			flushSync(() => {
				counter = { current: 2 };
			});

			expect(previousCounter.current).toStrictEqual({ current: 1 });

			flushSync(() => {
				counter = { current: 3 };
			});

			expect(previousCounter.current).toStrictEqual({ current: 2 });
		});

		cleanup();
	});

	it('Is the previous the value if given', () => {
		const cleanup = $effect.root(() => {
			const counter = $state({ current: 0 });
			const previousCounter = getPrevious(() => counter, { current: -1 });

			expect(previousCounter.current).toStrictEqual({ current: -1 });
		});

		cleanup();
	});
});

describe('Works with arrays', () => {
	it('Is `undefined` by default', () => {
		const cleanup = $effect.root(() => {
			const counter = $state([0]);
			const previousCounter = getPrevious(() => counter);

			expect(previousCounter.current).toBeUndefined();
		});

		cleanup();
	});

	it('Corresponds to the previous value after one change', () => {
		const cleanup = $effect.root(() => {
			let counter = $state([0]);
			const previousCounter = getPrevious(() => counter);

			expect(previousCounter.current).toBeUndefined();

			flushSync(() => {
				counter = [1];
			});

			expect(previousCounter.current).toStrictEqual([0]);
		});

		cleanup();
	});

	it('Corresponds to the previous value after multiple changes', () => {
		const cleanup = $effect.root(() => {
			let counter = $state([0]);
			const previousCounter = getPrevious(() => counter);

			expect(previousCounter.current).toBeUndefined();

			flushSync(() => {
				counter = [1];
			});

			expect(previousCounter.current).toStrictEqual([0]);

			flushSync(() => {
				counter = [2];
			});

			expect(previousCounter.current).toStrictEqual([1]);

			flushSync(() => {
				counter = [3];
			});

			expect(previousCounter.current).toStrictEqual([2]);
		});

		cleanup();
	});

	it('Is the previous the value if given', () => {
		const cleanup = $effect.root(() => {
			const counter = $state([0]);
			const previousCounter = getPrevious(() => counter, []);

			expect(previousCounter.current).toStrictEqual([]);
		});

		cleanup();
	});
});

describe('Works with array methods', () => {
	it('Is `undefined` by default', () => {
		const cleanup = $effect.root(() => {
			const counter = $state([0]);
			const previousCounter = getPrevious(() => counter);

			expect(previousCounter.current).toBeUndefined();
		});

		cleanup();
	});

	it('Corresponds to the previous value after one change', () => {
		const cleanup = $effect.root(() => {
			const counter = $state([0]);
			const previousCounter = getPrevious(() => counter);

			expect(previousCounter.current).toBeUndefined();

			flushSync(() => {
				counter.push(1);
			});

			expect(previousCounter.current).toStrictEqual([0]);
		});

		cleanup();
	});

	it('Corresponds to the previous value after multiple changes', () => {
		const cleanup = $effect.root(() => {
			const counter = $state([0]);
			const previousCounter = getPrevious(() => counter);

			expect(previousCounter.current).toBeUndefined();

			flushSync(() => {
				counter.push(1);
			});

			expect(previousCounter.current).toStrictEqual([0]);

			flushSync(() => {
				counter.push(2);
			});

			expect(previousCounter.current).toStrictEqual([0, 1]);

			flushSync(() => {
				counter.push(3);
			});

			expect(previousCounter.current).toStrictEqual([0, 1, 2]);
		});

		cleanup();
	});

	it('Is the previous the value if given', () => {
		const cleanup = $effect.root(() => {
			const counter = $state([0]);
			const previousCounter = getPrevious(() => counter, []);

			expect(previousCounter.current).toStrictEqual([]);
		});

		cleanup();
	});
});
