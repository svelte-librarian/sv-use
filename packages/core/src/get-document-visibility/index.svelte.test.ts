import { beforeEach, describe, expect, it } from 'vitest';
import { getDocumentVisibility } from './index.svelte.js';

class MockDocument extends EventTarget {
	visibilityState = 'hidden';

	dispatchEvent(event: Event): boolean {
		super.dispatchEvent(event);
		return true;
	}
}

describe('getDocumentVisibility', () => {
	let mockDocument: MockDocument;

	beforeEach(() => {
		mockDocument = new MockDocument();
	});

	it("Is 'visible' by default if document is undefined", () => {
		const cleanup = $effect.root(() => {
			const documentVisibility = getDocumentVisibility();

			expect(documentVisibility.current).toBe('visible');
		});

		cleanup();
	});

	it('Matches document.visibilityState if document is defined', () => {
		const cleanup = $effect.root(() => {
			const documentVisibility = getDocumentVisibility({
				document: mockDocument as Document
			});

			expect(documentVisibility.current).toBe('hidden');
		});

		cleanup();
	});

	it("Changes when 'visibilitychange' event is fired", () => {
		const cleanup = $effect.root(() => {
			const documentVisibility = getDocumentVisibility({
				document: mockDocument as Document
			});

			expect(documentVisibility.current).toBe('hidden');

			mockDocument.visibilityState = 'visible';
			mockDocument.dispatchEvent(new Event('visibilitychange'));

			expect(documentVisibility.current).toBe('visible');
		});

		cleanup();
	});
});
