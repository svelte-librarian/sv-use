import { describe, expect, it } from 'vitest';
import { historyState } from './index.svelte.js';

describe('Works with primitives', () => {
	it('Adds to the history correctly with one change', () => {
		const history = historyState('');

		history.current = 'test';

		expect(history.history.length).toBe(1);
		expect(history.history[0].snapshot).toBe('');
		expect(history.history[0].timestamp).toBeGreaterThan(0);

		expect(history.current).toBe('test');
	});

	it('Adds to the history correctly with multiple changes', () => {
		const history = historyState('');

		history.current = 'test';
		history.current = 'test2';

		expect(history.history.length).toBe(2);
		expect(history.history[0].snapshot).toBe('');
		expect(history.history[0].timestamp).toBeGreaterThan(0);
		expect(history.history[1].snapshot).toBe('test');
		expect(history.history[1].timestamp).toBeGreaterThan(0);

		expect(history.current).toBe('test2');
	});

	it('Undoes correctly', () => {
		const history = historyState('');

		history.current = 'test';
		history.current = 'test2';

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

	it('Redoes correctly', () => {
		const history = historyState('');

		history.current = 'test';
		history.current = 'test2';

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
});

describe('Works with reassigned objects', () => {
	it('Adds to the history correctly with one change', () => {
		const history = historyState({ value: '' });

		history.current = { value: 'test' };

		expect(history.history.length).toBe(1);
		expect(history.history[0].snapshot).toStrictEqual({ value: '' });
		expect(history.history[0].timestamp).toBeGreaterThan(0);

		expect(history.current).toStrictEqual({ value: 'test' });
	});

	it('Adds to the history correctly with multiple changes', () => {
		const history = historyState({ value: '' });

		history.current = { value: 'test' };
		history.current = { value: 'test2' };

		expect(history.history.length).toBe(2);
		expect(history.history[0].snapshot).toStrictEqual({ value: '' });
		expect(history.history[0].timestamp).toBeGreaterThan(0);
		expect(history.history[1].snapshot).toStrictEqual({ value: 'test' });
		expect(history.history[1].timestamp).toBeGreaterThan(0);

		expect(history.current).toStrictEqual({ value: 'test2' });
	});

	it('Undoes correctly', () => {
		const history = historyState({ value: '' });

		history.current = { value: 'test' };
		history.current = { value: 'test2' };

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

	it('Redoes correctly', () => {
		const history = historyState({ value: '' });

		history.current = { value: 'test' };
		history.current = { value: 'test2' };

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
});

// TODO : Make historyState track assignments on nested objects

/* describe('Works with property assignment on objects', () => {
	it('Adds to the history correctly with one change', () => {
		const history = historyState({ value: '' });

		history.current.value = 'test';

		expect(history.history.length).toBe(1);
		expect(history.history[0].snapshot).toStrictEqual({ value: '' });
		expect(history.history[0].timestamp).toBeGreaterThan(0);

		expect(history.current).toStrictEqual({ value: 'test' });
	});

	it('Adds to the history correctly with multiple changes', () => {
		const history = historyState({ value: '' });

		history.current.value = 'test';
		history.current.value = 'test2';

		expect(history.history.length).toBe(2);
		expect(history.history[0].snapshot).toStrictEqual({ value: '' });
		expect(history.history[0].timestamp).toBeGreaterThan(0);
		expect(history.history[1].snapshot).toStrictEqual({ value: 'test' });
		expect(history.history[1].timestamp).toBeGreaterThan(0);

		expect(history.current).toStrictEqual({ value: 'test2' });
	});

	it('Undoes correctly', () => {
		const history = historyState({ value: '' });

		history.current.value = 'test';
		history.current.value = 'test2';

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

	it('Redoes correctly', () => {
		const history = historyState({ value: '' });

		history.current.value = 'test';
		history.current.value = 'test2';

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
}); */
