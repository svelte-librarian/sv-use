import { describe, expect, it, vi } from 'vitest';
import { whenever } from './index.svelte.js';
import { flushSync } from 'svelte';

describe("Tests 'whenever'", () => {
	it('Works with booleans', () => {
		const cleanup = $effect.root(() => {
			const callback = vi.fn(() => {});

			let isActive = $state(false);

			whenever(() => isActive, callback);

			expect(callback).not.toHaveBeenCalled();

			flushSync(() => {
				isActive = true;
			});

			expect(callback).toHaveBeenCalledOnce();
		});

		cleanup();
	});

	it('Works with comparisons', () => {
		const cleanup = $effect.root(() => {
			const callback = vi.fn(() => {});

			let counter = $state(1);

			whenever(() => counter % 2 === 0, callback);

			expect(callback).not.toHaveBeenCalled();

			flushSync(() => {
				counter = 2;
			});

			expect(callback).toHaveBeenCalledOnce();
		});

		cleanup();
	});
});
