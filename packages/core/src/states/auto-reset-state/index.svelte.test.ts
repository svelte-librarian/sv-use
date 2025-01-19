import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { autoResetState } from './index.svelte.js';
import { flushSync } from 'svelte';

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
		const cleanup = $effect.root(() => {
			const message = autoResetState('');

			flushSync(() => {
				message.current = 'test';
			});

			expect(message.current).toBe('test');

			vi.advanceTimersByTime(DEFAULT_CHECK_AFTER / 2);
			expect(message.current).toBe('test');

			vi.advanceTimersByTime(DEFAULT_CHECK_AFTER);
			expect(message.current).toBe('');
		});

		cleanup();
	});

	it('Resets properly after a custom delay', () => {
		const cleanup = $effect.root(() => {
			const message = autoResetState('', CUSTOM_DELAY);

			flushSync(() => {
				message.current = 'test';
			});
			expect(message.current).toBe('test');

			vi.advanceTimersByTime(CUSTOM_CHECK_AFTER / 2);
			expect(message.current).toBe('test');

			vi.advanceTimersByTime(CUSTOM_CHECK_AFTER);
			expect(message.current).toBe('');
		});

		cleanup();
	});

	it('Resets properly after the default delay after multiple changes', () => {
		const cleanup = $effect.root(() => {
			const message = autoResetState('');

			flushSync(() => {
				message.current = 'test';
			});
			vi.advanceTimersByTime(CUSTOM_CHECK_AFTER / 2);
			expect(message.current).toBe('test');

			message.current = 'test2';
			vi.advanceTimersByTime(CUSTOM_CHECK_AFTER / 2);
			expect(message.current).toBe('test2');

			vi.advanceTimersByTime(DEFAULT_CHECK_AFTER);
			expect(message.current).toBe('');
		});

		cleanup();
	});

	it('Resets properly after a custom delay after multiple changes', () => {
		const cleanup = $effect.root(() => {
			const message = autoResetState('', CUSTOM_DELAY);

			flushSync(() => {
				message.current = 'test';
			});
			vi.advanceTimersByTime(CUSTOM_CHECK_AFTER / 2);
			expect(message.current).toBe('test');

			flushSync(() => {
				message.current = 'test2';
			});
			vi.advanceTimersByTime(CUSTOM_CHECK_AFTER / 2);
			expect(message.current).toBe('test2');

			vi.advanceTimersByTime(CUSTOM_CHECK_AFTER);
			expect(message.current).toBe('');
		});

		cleanup();
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
		const cleanup = $effect.root(() => {
			const message = autoResetState({ value: '' });

			flushSync(() => {
				message.current = { value: 'test' };
			});
			expect(message.current).toStrictEqual({ value: 'test' });

			vi.advanceTimersByTime(DEFAULT_CHECK_AFTER / 2);
			expect(message.current).toStrictEqual({ value: 'test' });

			vi.advanceTimersByTime(DEFAULT_CHECK_AFTER);
			expect(message.current).toStrictEqual({ value: '' });
		});

		cleanup();
	});

	it('Resets properly after a custom delay', () => {
		const cleanup = $effect.root(() => {
			const message = autoResetState({ value: '' }, CUSTOM_DELAY);

			flushSync(() => {
				message.current = { value: 'test' };
			});
			expect(message.current).toStrictEqual({ value: 'test' });

			vi.advanceTimersByTime(CUSTOM_CHECK_AFTER / 2);
			expect(message.current).toStrictEqual({ value: 'test' });

			vi.advanceTimersByTime(CUSTOM_CHECK_AFTER);
			expect(message.current).toStrictEqual({ value: '' });
		});

		cleanup();
	});

	it('Resets properly after the default delay after multiple changes', () => {
		const cleanup = $effect.root(() => {
			const message = autoResetState({ value: '' });

			flushSync(() => {
				message.current = { value: 'test' };
			});
			vi.advanceTimersByTime(CUSTOM_CHECK_AFTER / 2);
			expect(message.current).toStrictEqual({ value: 'test' });

			flushSync(() => {
				message.current = { value: 'test2' };
			});
			vi.advanceTimersByTime(CUSTOM_CHECK_AFTER / 2);
			expect(message.current).toStrictEqual({ value: 'test2' });

			vi.advanceTimersByTime(DEFAULT_CHECK_AFTER);
			expect(message.current).toStrictEqual({ value: '' });
		});

		cleanup();
	});

	it('Resets properly after a custom delay after multiple changes', () => {
		const cleanup = $effect.root(() => {
			const message = autoResetState({ value: '' }, CUSTOM_DELAY);

			flushSync(() => {
				message.current = { value: 'test' };
			});
			vi.advanceTimersByTime(CUSTOM_CHECK_AFTER / 2);
			expect(message.current).toStrictEqual({ value: 'test' });

			flushSync(() => {
				message.current = { value: 'test2' };
			});
			vi.advanceTimersByTime(CUSTOM_CHECK_AFTER / 2);
			expect(message.current).toStrictEqual({ value: 'test2' });

			vi.advanceTimersByTime(CUSTOM_CHECK_AFTER);
			expect(message.current).toStrictEqual({ value: '' });
		});

		cleanup();
	});
});

describe('Works with property assignment on objects', () => {
	beforeEach(() => {
		vi.useFakeTimers();
	});

	afterEach(() => {
		vi.restoreAllMocks();
	});

	it('Resets properly after the default delay', () => {
		const cleanup = $effect.root(() => {
			const message = autoResetState({ value: '' });

			flushSync(() => {
				message.current.value = 'test';
			});
			expect(message.current).toStrictEqual({ value: 'test' });

			vi.advanceTimersByTime(DEFAULT_CHECK_AFTER / 2);
			expect(message.current).toStrictEqual({ value: 'test' });

			vi.advanceTimersByTime(DEFAULT_CHECK_AFTER);
			expect(message.current).toStrictEqual({ value: '' });
		});

		cleanup();
	});

	it('Resets properly after a custom delay', () => {
		const cleanup = $effect.root(() => {
			const message = autoResetState({ value: '' }, CUSTOM_DELAY);

			flushSync(() => {
				message.current.value = 'test';
			});
			expect(message.current).toStrictEqual({ value: 'test' });

			vi.advanceTimersByTime(CUSTOM_CHECK_AFTER / 2);
			expect(message.current).toStrictEqual({ value: 'test' });

			vi.advanceTimersByTime(CUSTOM_CHECK_AFTER);
			expect(message.current).toStrictEqual({ value: '' });
		});

		cleanup();
	});

	it('Resets properly after the default delay after multiple changes', () => {
		const cleanup = $effect.root(() => {
			const message = autoResetState({ value: '' });

			flushSync(() => {
				message.current.value = 'test';
			});
			vi.advanceTimersByTime(CUSTOM_CHECK_AFTER / 2);
			expect(message.current).toStrictEqual({ value: 'test' });

			flushSync(() => {
				message.current.value = 'test2';
			});
			vi.advanceTimersByTime(CUSTOM_CHECK_AFTER / 2);
			expect(message.current).toStrictEqual({ value: 'test2' });

			vi.advanceTimersByTime(DEFAULT_CHECK_AFTER);
			expect(message.current).toStrictEqual({ value: '' });
		});

		cleanup();
	});

	it('Resets properly after a custom delay after multiple changes', () => {
		const cleanup = $effect.root(() => {
			const message = autoResetState({ value: '' }, CUSTOM_DELAY);

			flushSync(() => {
				message.current.value = 'test';
			});
			vi.advanceTimersByTime(CUSTOM_CHECK_AFTER / 2);
			expect(message.current).toStrictEqual({ value: 'test' });

			flushSync(() => {
				message.current.value = 'test2';
			});
			vi.advanceTimersByTime(CUSTOM_CHECK_AFTER / 2);
			expect(message.current).toStrictEqual({ value: 'test2' });

			vi.advanceTimersByTime(CUSTOM_CHECK_AFTER);
			expect(message.current).toStrictEqual({ value: '' });
		});

		cleanup();
	});
});
