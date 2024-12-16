import { debouncedState, DEFAULT_DEBOUNCE } from '$lib/reactivity/debounce.svelte.js';
import { describe, expect, it } from 'vitest';

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
		const debounce = 500;
		const search = debouncedState('', { debounce });

		expect(search.current).toBe('');

		search.current = 'test';
		expect(search.current).toBe('');

		await new Promise((resolve) => setTimeout(resolve, debounce + 100));

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
		const debounce = 500;
		const search = debouncedState('', { debounce });

		expect(search.current).toBe('');

		search.current = 'test';
		search.current = 'test2';
		search.current = 'test3';

		expect(search.current).toBe('');

		await new Promise((resolve) => setTimeout(resolve, debounce + 100));

		expect(search.current).toBe('test3');
	});
});
