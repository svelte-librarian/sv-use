import { describe, expect, it } from 'vitest';
import { historyState } from './index.svelte.js';
import { flushSync } from 'svelte';

describe('Works with primitives', () => {
	it('Adds to the history correctly with one change', () => {
		const cleanup = $effect.root(() => {
			const history = historyState('');

			flushSync(() => {
				history.current = 'test';
			});

			expect(history.history.length).toBe(1);
			expect(history.history[0].snapshot).toBe('');
			expect(history.history[0].timestamp).toBeGreaterThan(0);

			expect(history.current).toBe('test');
		});

		cleanup();
	});

	it('Adds to the history correctly with multiple changes', () => {
		const cleanup = $effect.root(() => {
			const history = historyState('');

			flushSync(() => {
				history.current = 'test';
			});

			flushSync(() => {
				history.current = 'test2';
			});

			expect(history.history.length).toBe(2);
			expect(history.history[0].snapshot).toBe('');
			expect(history.history[0].timestamp).toBeGreaterThan(0);
			expect(history.history[1].snapshot).toBe('test');
			expect(history.history[1].timestamp).toBeGreaterThan(0);

			expect(history.current).toBe('test2');
		});

		cleanup();
	});

	it('Undoes correctly', () => {
		const cleanup = $effect.root(() => {
			const history = historyState('');

			flushSync(() => {
				history.current = 'test';
			});

			flushSync(() => {
				history.current = 'test2';
			});

			expect(history.history.length).toBe(2);
			expect(history.history[0].snapshot).toBe('');
			expect(history.history[0].timestamp).toBeGreaterThan(0);
			expect(history.history[1].snapshot).toBe('test');
			expect(history.history[1].timestamp).toBeGreaterThan(0);

			expect(history.current).toBe('test2');

			history.undo();

			expect(history.history.length).toBe(1);
			expect(history.history[0].snapshot).toBe('');
			expect(history.history[0].timestamp).toBeGreaterThan(0);

			expect(history.current).toBe('test');
		});

		cleanup();
	});

	it('Redoes correctly', () => {
		const cleanup = $effect.root(() => {
			const history = historyState('');

			flushSync(() => {
				history.current = 'test';
			});

			flushSync(() => {
				history.current = 'test2';
			});

			expect(history.history.length).toBe(2);
			expect(history.history[0].snapshot).toBe('');
			expect(history.history[0].timestamp).toBeGreaterThan(0);
			expect(history.history[1].snapshot).toBe('test');
			expect(history.history[1].timestamp).toBeGreaterThan(0);

			history.undo();
			history.redo();

			expect(history.history.length).toBe(2);
			expect(history.history[0].snapshot).toBe('');
			expect(history.history[0].timestamp).toBeGreaterThan(0);
			expect(history.history[1].snapshot).toBe('test');
			expect(history.history[1].timestamp).toBeGreaterThan(0);

			expect(history.current).toBe('test2');
		});

		cleanup();
	});
});

describe('Works with reassigned objects', () => {
	it('Adds to the history correctly with one change', () => {
		const cleanup = $effect.root(() => {
			const history = historyState({ value: '' });

			flushSync(() => {
				history.current = { value: 'test' };
			});

			expect(history.history.length).toBe(1);
			expect(history.history[0].snapshot).toStrictEqual({ value: '' });
			expect(history.history[0].timestamp).toBeGreaterThan(0);

			expect(history.current).toStrictEqual({ value: 'test' });
		});

		cleanup();
	});

	it('Adds to the history correctly with multiple changes', () => {
		const cleanup = $effect.root(() => {
			const history = historyState({ value: '' });

			flushSync(() => {
				history.current = { value: 'test' };
			});

			flushSync(() => {
				history.current = { value: 'test2' };
			});

			expect(history.history.length).toBe(2);
			expect(history.history[0].snapshot).toStrictEqual({ value: '' });
			expect(history.history[0].timestamp).toBeGreaterThan(0);
			expect(history.history[1].snapshot).toStrictEqual({ value: 'test' });
			expect(history.history[1].timestamp).toBeGreaterThan(0);

			expect(history.current).toStrictEqual({ value: 'test2' });
		});

		cleanup();
	});

	it('Undoes correctly', () => {
		const cleanup = $effect.root(() => {
			const history = historyState({ value: '' });

			flushSync(() => {
				history.current = { value: 'test' };
			});

			flushSync(() => {
				history.current = { value: 'test2' };
			});

			expect(history.history.length).toBe(2);
			expect(history.history[0].snapshot).toStrictEqual({ value: '' });
			expect(history.history[0].timestamp).toBeGreaterThan(0);
			expect(history.history[1].snapshot).toStrictEqual({ value: 'test' });
			expect(history.history[1].timestamp).toBeGreaterThan(0);

			expect(history.current).toStrictEqual({ value: 'test2' });

			history.undo();

			expect(history.history.length).toBe(1);
			expect(history.history[0].snapshot).toStrictEqual({ value: '' });
			expect(history.history[0].timestamp).toBeGreaterThan(0);

			expect(history.current).toStrictEqual({ value: 'test' });
		});

		cleanup();
	});

	it('Redoes correctly', () => {
		const cleanup = $effect.root(() => {
			const history = historyState({ value: '' });

			flushSync(() => {
				history.current = { value: 'test' };
			});

			flushSync(() => {
				history.current = { value: 'test2' };
			});

			expect(history.history.length).toBe(2);
			expect(history.history[0].snapshot).toStrictEqual({ value: '' });
			expect(history.history[0].timestamp).toBeGreaterThan(0);
			expect(history.history[1].snapshot).toStrictEqual({ value: 'test' });
			expect(history.history[1].timestamp).toBeGreaterThan(0);

			expect(history.current).toStrictEqual({ value: 'test2' });

			history.undo();
			history.redo();

			expect(history.history.length).toBe(2);
			expect(history.history[0].snapshot).toStrictEqual({ value: '' });
			expect(history.history[0].timestamp).toBeGreaterThan(0);
			expect(history.history[1].snapshot).toStrictEqual({ value: 'test' });
			expect(history.history[1].timestamp).toBeGreaterThan(0);

			expect(history.current).toStrictEqual({ value: 'test2' });
		});

		cleanup();
	});
});

describe('Works with property assignment on objects', () => {
	it('Adds to the history correctly with one change', () => {
		const cleanup = $effect.root(() => {
			const history = historyState({ value: '' });

			flushSync(() => {
				history.current.value = 'test';
			});

			expect(history.history.length).toBe(1);
			expect(history.history[0].snapshot).toStrictEqual({ value: '' });
			expect(history.history[0].timestamp).toBeGreaterThan(0);

			expect(history.current).toStrictEqual({ value: 'test' });
		});

		cleanup();
	});

	it('Adds to the history correctly with multiple changes', () => {
		const cleanup = $effect.root(() => {
			const history = historyState({ value: '' });

			flushSync(() => {
				history.current.value = 'test';
			});

			flushSync(() => {
				history.current.value = 'test2';
			});

			expect(history.history.length).toBe(2);
			expect(history.history[0].snapshot).toStrictEqual({ value: '' });
			expect(history.history[0].timestamp).toBeGreaterThan(0);
			expect(history.history[1].snapshot).toStrictEqual({ value: 'test' });
			expect(history.history[1].timestamp).toBeGreaterThan(0);

			expect(history.current).toStrictEqual({ value: 'test2' });
		});

		cleanup();
	});

	it('Undoes correctly', () => {
		const cleanup = $effect.root(() => {
			const history = historyState({ value: '' });

			flushSync(() => {
				history.current.value = 'test';
			});

			flushSync(() => {
				history.current.value = 'test2';
			});

			expect(history.history.length).toBe(2);
			expect(history.history[0].snapshot).toStrictEqual({ value: '' });
			expect(history.history[0].timestamp).toBeGreaterThan(0);
			expect(history.history[1].snapshot).toStrictEqual({ value: 'test' });
			expect(history.history[1].timestamp).toBeGreaterThan(0);

			expect(history.current).toStrictEqual({ value: 'test2' });

			history.undo();

			expect(history.history.length).toBe(1);
			expect(history.history[0].snapshot).toStrictEqual({ value: '' });
			expect(history.history[0].timestamp).toBeGreaterThan(0);

			expect(history.current).toStrictEqual({ value: 'test' });
		});

		cleanup();
	});

	it('Redoes correctly', () => {
		const cleanup = $effect.root(() => {
			const history = historyState({ value: '' });

			flushSync(() => {
				history.current.value = 'test';
			});

			flushSync(() => {
				history.current.value = 'test2';
			});

			expect(history.history.length).toBe(2);
			expect(history.history[0].snapshot).toStrictEqual({ value: '' });
			expect(history.history[0].timestamp).toBeGreaterThan(0);
			expect(history.history[1].snapshot).toStrictEqual({ value: 'test' });
			expect(history.history[1].timestamp).toBeGreaterThan(0);

			expect(history.current).toStrictEqual({ value: 'test2' });

			history.undo();
			history.redo();

			expect(history.history.length).toBe(2);
			expect(history.history[0].snapshot).toStrictEqual({ value: '' });
			expect(history.history[0].timestamp).toBeGreaterThan(0);
			expect(history.history[1].snapshot).toStrictEqual({ value: 'test' });
			expect(history.history[1].timestamp).toBeGreaterThan(0);

			expect(history.current).toStrictEqual({ value: 'test2' });
		});

		cleanup();
	});
});

describe('Works with arrays', () => {
	it('Adds to the history correctly with one change', () => {
		const cleanup = $effect.root(() => {
			const history = historyState<string[]>([]);

			flushSync(() => {
				history.current = ['test'];
			});

			expect(history.history.length).toBe(1);
			expect(history.history[0].snapshot).toStrictEqual([]);
			expect(history.history[0].timestamp).toBeGreaterThan(0);

			expect(history.current).toStrictEqual(['test']);
		});

		cleanup();
	});

	it('Adds to the history correctly with multiple changes', () => {
		const cleanup = $effect.root(() => {
			const history = historyState<string[]>([]);

			flushSync(() => {
				history.current = ['test'];
			});

			flushSync(() => {
				history.current = ['test2'];
			});

			expect(history.history.length).toBe(2);
			expect(history.history[0].snapshot).toStrictEqual([]);
			expect(history.history[0].timestamp).toBeGreaterThan(0);
			expect(history.history[1].snapshot).toStrictEqual(['test']);
			expect(history.history[1].timestamp).toBeGreaterThan(0);

			expect(history.current).toStrictEqual(['test2']);
		});

		cleanup();
	});

	it('Undoes correctly', () => {
		const cleanup = $effect.root(() => {
			const history = historyState<string[]>([]);

			flushSync(() => {
				history.current = ['test'];
			});

			flushSync(() => {
				history.current = ['test2'];
			});

			expect(history.history.length).toBe(2);
			expect(history.history[0].snapshot).toStrictEqual([]);
			expect(history.history[0].timestamp).toBeGreaterThan(0);
			expect(history.history[1].snapshot).toStrictEqual(['test']);
			expect(history.history[1].timestamp).toBeGreaterThan(0);

			expect(history.current).toStrictEqual(['test2']);

			history.undo();

			expect(history.history.length).toBe(1);
			expect(history.history[0].snapshot).toStrictEqual([]);
			expect(history.history[0].timestamp).toBeGreaterThan(0);

			expect(history.current).toStrictEqual(['test']);
		});

		cleanup();
	});

	it('Redoes correctly', () => {
		const cleanup = $effect.root(() => {
			const history = historyState<string[]>([]);

			flushSync(() => {
				history.current = ['test'];
			});

			flushSync(() => {
				history.current = ['test2'];
			});

			expect(history.history.length).toBe(2);
			expect(history.history[0].snapshot).toStrictEqual([]);
			expect(history.history[0].timestamp).toBeGreaterThan(0);
			expect(history.history[1].snapshot).toStrictEqual(['test']);
			expect(history.history[1].timestamp).toBeGreaterThan(0);

			expect(history.current).toStrictEqual(['test2']);

			history.undo();
			history.redo();

			expect(history.history.length).toBe(2);
			expect(history.history[0].snapshot).toStrictEqual([]);
			expect(history.history[0].timestamp).toBeGreaterThan(0);
			expect(history.history[1].snapshot).toStrictEqual(['test']);
			expect(history.history[1].timestamp).toBeGreaterThan(0);

			expect(history.current).toStrictEqual(['test2']);
		});

		cleanup();
	});
});

describe('Works with array methods', () => {
	it('Adds to the history correctly with one change', () => {
		const cleanup = $effect.root(() => {
			const history = historyState<string[]>([]);

			flushSync(() => {
				history.current = ['test'];
			});

			expect(history.history.length).toBe(1);
			expect(history.history[0].snapshot).toStrictEqual([]);
			expect(history.history[0].timestamp).toBeGreaterThan(0);

			expect(history.current).toStrictEqual(['test']);
		});

		cleanup();
	});

	it('Adds to the history correctly with multiple changes', () => {
		const cleanup = $effect.root(() => {
			const history = historyState<string[]>([]);

			flushSync(() => {
				history.current = ['test'];
			});

			flushSync(() => {
				history.current = ['test2'];
			});

			expect(history.history.length).toBe(2);
			expect(history.history[0].snapshot).toStrictEqual([]);
			expect(history.history[0].timestamp).toBeGreaterThan(0);
			expect(history.history[1].snapshot).toStrictEqual(['test']);
			expect(history.history[1].timestamp).toBeGreaterThan(0);

			expect(history.current).toStrictEqual(['test2']);
		});

		cleanup();
	});

	it('Undoes correctly', () => {
		const cleanup = $effect.root(() => {
			const history = historyState<string[]>([]);

			flushSync(() => {
				history.current = ['test'];
			});

			flushSync(() => {
				history.current = ['test2'];
			});

			expect(history.history.length).toBe(2);
			expect(history.history[0].snapshot).toStrictEqual([]);
			expect(history.history[0].timestamp).toBeGreaterThan(0);
			expect(history.history[1].snapshot).toStrictEqual(['test']);
			expect(history.history[1].timestamp).toBeGreaterThan(0);

			expect(history.current).toStrictEqual(['test2']);

			history.undo();

			expect(history.history.length).toBe(1);
			expect(history.history[0].snapshot).toStrictEqual([]);
			expect(history.history[0].timestamp).toBeGreaterThan(0);

			expect(history.current).toStrictEqual(['test']);
		});

		cleanup();
	});

	it('Redoes correctly', () => {
		const cleanup = $effect.root(() => {
			const history = historyState<string[]>([]);

			flushSync(() => {
				history.current = ['test'];
			});

			flushSync(() => {
				history.current = ['test2'];
			});

			expect(history.history.length).toBe(2);
			expect(history.history[0].snapshot).toStrictEqual([]);
			expect(history.history[0].timestamp).toBeGreaterThan(0);
			expect(history.history[1].snapshot).toStrictEqual(['test']);
			expect(history.history[1].timestamp).toBeGreaterThan(0);

			expect(history.current).toStrictEqual(['test2']);

			history.undo();
			history.redo();

			expect(history.history.length).toBe(2);
			expect(history.history[0].snapshot).toStrictEqual([]);
			expect(history.history[0].timestamp).toBeGreaterThan(0);
			expect(history.history[1].snapshot).toStrictEqual(['test']);
			expect(history.history[1].timestamp).toBeGreaterThan(0);

			expect(history.current).toStrictEqual(['test2']);
		});

		cleanup();
	});
});
