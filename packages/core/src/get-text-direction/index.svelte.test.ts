import { describe, expect, it } from 'vitest';
import { getTextDirection } from './index.svelte.js';
import { flushSync } from 'svelte';

describe('getTextDirection', () => {
	it("has a default value of 'ltr'", () => {
		const cleanup = $effect.root(() => {
			const dir = getTextDirection({ autoCleanup: false });

			expect(dir.current).toBe('ltr');
		});

		cleanup();
	});

	it("takes 'initial' as default value if passed", () => {
		const cleanup = $effect.root(() => {
			const dir = getTextDirection({ initial: 'rtl', autoCleanup: false });

			expect(dir.current).toBe('rtl');
		});

		cleanup();
	});

	it('reflects the changes on the dom when current is set', () => {
		const cleanup = $effect.root(() => {
			const element = $state(document.createElement('div'));
			const dir = getTextDirection({ element: () => element, autoCleanup: false });

			expect(element.getAttribute('dir')).toBeNull();

			dir.current = 'rtl';

			expect(element.getAttribute('dir')).toBe('rtl');
		});

		cleanup();
	});

	it('observes the changes in the dom', () => {
		const cleanup = $effect.root(() => {
			const element = $state(document.createElement('div'));
			const dir = getTextDirection({ element: () => element, observe: true, autoCleanup: false });

			expect(dir.current).toBe('ltr');
			expect(element.getAttribute('dir')).toBeNull();

			element.setAttribute('dir', 'rtl');

			flushSync();

			expect(dir.current).toBe('rtl');
			expect(element.getAttribute('dir')).toBe('rtl');
		});

		cleanup();
	});
});
