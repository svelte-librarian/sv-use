import { describe, expect, it, vi } from 'vitest';
import { watch } from './index.svelte.js';
import { flushSync } from 'svelte';

describe('Runs on mount', () => {
	describe('Works with primitives', () => {
		it('Triggers after one change', () => {
			const cleanup = $effect.root(() => {
				const callback = vi.fn(() => {});
				let counter = $state(0);

				watch(
					() => counter,
					() => callback()
				);

				flushSync();
				counter = 1;

				flushSync();

				expect(callback).toHaveBeenCalledTimes(2);
			});

			cleanup();
		});

		it('Triggers after multiple changes', () => {
			const cleanup = $effect.root(() => {
				const callback = vi.fn(() => {});
				let counter = $state(0);

				watch(
					() => counter,
					() => callback()
				);

				flushSync();
				counter = 1;

				flushSync();
				counter = 2;

				flushSync();

				expect(callback).toHaveBeenCalledTimes(3);
			});

			cleanup();
		});
	});

	describe('Works with objects', () => {
		it('Triggers after one change', () => {
			const cleanup = $effect.root(() => {
				const callback = vi.fn(() => {});
				let counter = $state({ value: 0 });

				watch(
					() => counter,
					() => callback()
				);

				flushSync();
				counter = { value: 1 };

				flushSync();

				expect(callback).toHaveBeenCalledTimes(2);
			});

			cleanup();
		});

		it('Triggers after multiple changes', () => {
			const cleanup = $effect.root(() => {
				const callback = vi.fn(() => {});
				let counter = $state({ value: 0 });

				watch(
					() => counter,
					() => callback()
				);

				flushSync();
				counter = { value: 1 };

				flushSync();
				counter = { value: 2 };

				flushSync();

				expect(callback).toHaveBeenCalledTimes(3);
			});

			cleanup();
		});
	});

	describe('Works with property assignment on objects', () => {
		it('Triggers after one change', () => {
			const cleanup = $effect.root(() => {
				const callback = vi.fn(() => {});
				const counter = $state({ value: 0 });

				watch(
					() => counter,
					() => callback()
				);

				flushSync();
				counter.value = 1;

				flushSync();

				expect(callback).toHaveBeenCalledTimes(2);
			});

			cleanup();
		});

		it('Triggers after multiple changes', () => {
			const cleanup = $effect.root(() => {
				const callback = vi.fn(() => {});
				const counter = $state({ value: 0 });

				watch(
					() => counter,
					() => callback()
				);

				flushSync();
				counter.value = 1;

				flushSync();
				counter.value = 2;

				flushSync();

				expect(callback).toHaveBeenCalledTimes(3);
			});

			cleanup();
		});
	});

	describe('Works with arrays', () => {
		it('Triggers after one change', () => {
			const cleanup = $effect.root(() => {
				const callback = vi.fn(() => {});
				let counter = $state([0]);

				watch(
					() => counter,
					() => callback()
				);

				flushSync();
				counter = [1];

				flushSync();

				expect(callback).toHaveBeenCalledTimes(2);
			});

			cleanup();
		});

		it('Triggers after multiple changes', () => {
			const cleanup = $effect.root(() => {
				const callback = vi.fn(() => {});
				let counter = $state([0]);

				watch(
					() => counter,
					() => callback()
				);

				flushSync();
				counter = [1];

				flushSync();
				counter = [2];

				flushSync();

				expect(callback).toHaveBeenCalledTimes(3);
			});

			cleanup();
		});
	});

	describe('Works with array methods', () => {
		it('Triggers after one change', () => {
			const cleanup = $effect.root(() => {
				const callback = vi.fn(() => {});
				const counter = $state([0]);

				watch(
					() => counter,
					() => callback()
				);

				flushSync();
				counter.push(1);

				flushSync();

				expect(callback).toHaveBeenCalledTimes(2);
			});

			cleanup();
		});

		it('Triggers after multiple changes', () => {
			const cleanup = $effect.root(() => {
				const callback = vi.fn(() => {});
				const counter = $state([0]);

				watch(
					() => counter,
					() => callback()
				);

				flushSync();
				counter.push(1);

				flushSync();
				counter.push(2);

				flushSync();

				expect(callback).toHaveBeenCalledTimes(3);
			});

			cleanup();
		});
	});
});
