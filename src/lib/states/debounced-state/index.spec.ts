import { describe, expect, it } from 'vitest';
import { debouncedState } from './index.svelte.js';

const DEFAULT_DEBOUNCE = 1000;

describe('Debounce works properly', () => {
	it('Changes state correctly after the default debounce', async () => {
		const search = debouncedState('');

		expect(search.current).toBe('');

		search.current = 'test';
		expect(search.current).toBe('');

		await new Promise((resolve) => setTimeout(resolve, DEFAULT_DEBOUNCE + 100));

		expect(search.current).toBe('test');
	});

	it('Changes state correctly after a custom debounce', async () => {
		const delay = 500;
		const search = debouncedState('', { delay });

		expect(search.current).toBe('');

		search.current = 'test';
		expect(search.current).toBe('');

		await new Promise((resolve) => setTimeout(resolve, delay + 100));

		expect(search.current).toBe('test');
	});

	it('Changes state correctly after multiple assignments with the default debounce', async () => {
		const search = debouncedState('');

		expect(search.current).toBe('');

		search.current = 'test';
		search.current = 'test2';
		search.current = 'test3';

		expect(search.current).toBe('');

		await new Promise((resolve) => setTimeout(resolve, DEFAULT_DEBOUNCE + 100));

		expect(search.current).toBe('test3');
	});

	it('Changes state correctly after multiple assignments with a custom debounce', async () => {
		const delay = 500;
		const search = debouncedState('', { delay });

		expect(search.current).toBe('');

		search.current = 'test';
		search.current = 'test2';
		search.current = 'test3';

		expect(search.current).toBe('');

		await new Promise((resolve) => setTimeout(resolve, delay + 100));

		expect(search.current).toBe('test3');
	});
});
