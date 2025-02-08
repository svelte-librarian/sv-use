import { debouncedState } from './index.svelte.js';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

describe('Works with primitives', () => {
	beforeEach(() => {
		vi.useFakeTimers();
	});

	afterEach(() => {
		vi.restoreAllMocks();
	});

	it('Changes state correctly after the default debounce', () => {
		const search = debouncedState('');

		expect(search.current).toBe('');

		search.current = 'test';
		expect(search.current).toBe('');

		vi.runAllTimers();

		expect(search.current).toBe('test');
	});

	it('Changes state correctly after a custom debounce', () => {
		const delay = 500;
		const search = debouncedState('', { delay });

		expect(search.current).toBe('');

		search.current = 'test';
		expect(search.current).toBe('');

		vi.runAllTimers();

		expect(search.current).toBe('test');
	});

	it('Changes state correctly after multiple assignments with the default debounce', () => {
		const search = debouncedState('');

		expect(search.current).toBe('');

		search.current = 'test';
		search.current = 'test2';
		search.current = 'test3';

		expect(search.current).toBe('');

		vi.runAllTimers();

		expect(search.current).toBe('test3');
	});

	it('Changes state correctly after multiple assignments with a custom debounce', () => {
		const delay = 500;
		const search = debouncedState('', { delay });

		expect(search.current).toBe('');

		search.current = 'test';
		search.current = 'test2';
		search.current = 'test3';

		expect(search.current).toBe('');

		vi.runAllTimers();

		expect(search.current).toBe('test3');
	});
});

describe('Works with reassigned objects', () => {
	beforeEach(() => {
		vi.useFakeTimers();
	});

	afterEach(() => {
		vi.restoreAllMocks();
	});

	it('Changes state correctly after the default debounce', () => {
		const search = debouncedState({ value: 'hello' });

		expect(search.current).toStrictEqual({ value: 'hello' });

		search.current = { value: 'test' };
		expect(search.current).toStrictEqual({ value: 'hello' });

		vi.runAllTimers();

		expect(search.current).toStrictEqual({ value: 'test' });
	});

	it('Changes state correctly after a custom debounce', () => {
		const delay = 500;
		const search = debouncedState({ value: 'hello' }, { delay });

		expect(search.current).toStrictEqual({ value: 'hello' });

		search.current = { value: 'test' };
		expect(search.current).toStrictEqual({ value: 'hello' });

		vi.runAllTimers();

		expect(search.current).toStrictEqual({ value: 'test' });
	});

	it('Changes state correctly after multiple assignments with the default debounce', () => {
		const search = debouncedState({ value: 'hello' });

		expect(search.current).toStrictEqual({ value: 'hello' });

		search.current = { value: 'test' };
		search.current = { value: 'test2' };
		search.current = { value: 'test3' };

		expect(search.current).toStrictEqual({ value: 'hello' });

		vi.runAllTimers();

		expect(search.current).toStrictEqual({ value: 'test3' });
	});

	it('Changes state correctly after multiple assignments with a custom debounce', () => {
		const delay = 500;
		const search = debouncedState({ value: 'hello' }, { delay });

		expect(search.current).toStrictEqual({ value: 'hello' });

		search.current = { value: 'test' };
		search.current = { value: 'test2' };
		search.current = { value: 'test3' };

		expect(search.current).toStrictEqual({ value: 'hello' });

		vi.runAllTimers();

		expect(search.current).toStrictEqual({ value: 'test3' });
	});
});

describe('Works with property assignment on objects', () => {
	beforeEach(() => {
		vi.useFakeTimers();
	});

	afterEach(() => {
		vi.restoreAllMocks();
	});

	it('Changes state correctly after the default debounce', () => {
		const search = debouncedState({ value: 'hello' });

		expect(search.current).toStrictEqual({ value: 'hello' });

		search.current.value = 'test';
		expect(search.current).toStrictEqual({ value: 'hello' });

		vi.runAllTimers();

		expect(search.current).toStrictEqual({ value: 'test' });
	});

	it('Changes state correctly after a custom debounce', () => {
		const delay = 500;
		const search = debouncedState({ value: 'hello' }, { delay });

		expect(search.current).toStrictEqual({ value: 'hello' });

		search.current.value = 'test';
		expect(search.current).toStrictEqual({ value: 'hello' });

		vi.runAllTimers();

		expect(search.current).toStrictEqual({ value: 'test' });
	});

	it('Changes state correctly after multiple assignments with the default debounce', () => {
		const search = debouncedState({ value: 'hello' });

		expect(search.current).toStrictEqual({ value: 'hello' });

		search.current.value = 'test';
		search.current.value = 'test2';
		search.current.value = 'test3';

		expect(search.current).toStrictEqual({ value: 'hello' });

		vi.runAllTimers();

		expect(search.current).toStrictEqual({ value: 'test3' });
	});

	it('Changes state correctly after multiple assignments with a custom debounce', () => {
		const delay = 500;
		const search = debouncedState({ value: 'hello' }, { delay });

		expect(search.current).toStrictEqual({ value: 'hello' });

		search.current.value = 'test';
		search.current.value = 'test2';
		search.current.value = 'test3';

		expect(search.current).toStrictEqual({ value: 'hello' });

		vi.runAllTimers();

		expect(search.current).toStrictEqual({ value: 'test3' });
	});
});
