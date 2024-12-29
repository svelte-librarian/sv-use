import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { autoResetState } from './index.svelte.js';

const DEFAULT_DELAY = 3000;
const DEFAULT_CHECK_AFTER = DEFAULT_DELAY + 100;
const CUSTOM_DELAY = 500;
const CUSTOM_CHECK_AFTER = CUSTOM_DELAY + 100;

describe('Works with primitives', () => {
	beforeEach(() => {
		vi.useFakeTimers();
	});

	afterEach(() => {
		vi.restoreAllMocks();
	});

	it('Resets properly after the default delay', () => {
		const message = autoResetState('');

		message.current = 'test';
		expect(message.current).toBe('test');

		vi.advanceTimersByTime(DEFAULT_CHECK_AFTER / 2);
		expect(message.current).toBe('test');

		vi.advanceTimersByTime(DEFAULT_CHECK_AFTER);
		expect(message.current).toBe('');
	});

	it('Resets properly after a custom delay', () => {
		const message = autoResetState('', CUSTOM_DELAY);

		message.current = 'test';
		expect(message.current).toBe('test');

		vi.advanceTimersByTime(CUSTOM_CHECK_AFTER / 2);
		expect(message.current).toBe('test');

		vi.advanceTimersByTime(CUSTOM_CHECK_AFTER);
		expect(message.current).toBe('');
	});
});

describe('Works with objects', () => {
	beforeEach(() => {
		vi.useFakeTimers();
	});

	afterEach(() => {
		vi.restoreAllMocks();
	});

	it('Resets properly after the default delay', () => {
		const message = autoResetState({ value: '' });

		message.current = { value: 'test' };
		expect(message.current).toStrictEqual({ value: 'test' });

		vi.advanceTimersByTime(DEFAULT_CHECK_AFTER / 2);
		expect(message.current).toStrictEqual({ value: 'test' });

		vi.advanceTimersByTime(DEFAULT_CHECK_AFTER);
		expect(message.current).toStrictEqual({ value: '' });
	});

	it('Resets properly after a custom delay', () => {
		const message = autoResetState({ value: '' }, CUSTOM_DELAY);

		message.current = { value: 'test' };
		expect(message.current).toStrictEqual({ value: 'test' });

		vi.advanceTimersByTime(CUSTOM_CHECK_AFTER / 2);
		expect(message.current).toStrictEqual({ value: 'test' });

		vi.advanceTimersByTime(CUSTOM_CHECK_AFTER);
		expect(message.current).toStrictEqual({ value: '' });
	});
});
