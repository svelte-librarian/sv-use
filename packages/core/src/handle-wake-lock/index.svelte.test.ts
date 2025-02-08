import { describe, expect, it, vi } from 'vitest';
import { tick } from 'svelte';
import { handleWakeLock } from './index.svelte.js';
import { asyncEffectRoot } from '../__internal__/utils.svelte.js';

class MockWakeLockSentinel extends EventTarget {
	released = false;

	release() {
		this.released = true;
		return Promise.resolve();
	}
}

function defineWakeLockAPI() {
	const sentinel = new MockWakeLockSentinel();

	Object.defineProperty(navigator, 'wakeLock', {
		value: { request: async () => sentinel as WakeLockSentinel },
		writable: true
	});

	return sentinel;
}

class MockDocument extends EventTarget {
	visibilityState = 'hidden';
}

describe('Wake Lock API is not supported', () => {
	it("doesn't change isActive if it isn't supported", async () => {
		const cleanup = asyncEffectRoot(async () => {
			const wakeLock = handleWakeLock({ autoCleanup: false, navigator: {} as Navigator });

			expect(wakeLock.isActive).toBeFalsy();

			await wakeLock.request('screen');

			expect(wakeLock.isActive).toBeFalsy();

			await wakeLock.release();

			expect(wakeLock.isActive).toBeFalsy();

			wakeLock.cleanup();
		});

		await cleanup();
	});
});

describe('Wake Lock API is supported', () => {
	it('changes isActive if it is supported', async () => {
		const cleanup = asyncEffectRoot(async () => {
			defineWakeLockAPI();

			const wakeLock = handleWakeLock({ autoCleanup: false });

			expect(wakeLock.isActive).toBeFalsy();

			await wakeLock.forceRequest('screen');

			expect(wakeLock.isActive).toBeTruthy();

			await wakeLock.release();

			expect(wakeLock.isActive).toBeFalsy();

			wakeLock.cleanup();
		});

		await cleanup();
	});

	it('changes isActive if show other tabs or minimize window', async () => {
		const cleanup = asyncEffectRoot(async () => {
			vi.useFakeTimers();
			defineWakeLockAPI();

			const wakeLock = handleWakeLock({ autoCleanup: false });

			expect(wakeLock.isActive).toBeFalsy();

			await wakeLock.request('screen');
			await vi.advanceTimersByTimeAsync(10);

			expect(wakeLock.isActive).toBeTruthy();

			document.dispatchEvent(new window.Event('visibilitychange'));

			expect(wakeLock.isActive).toBeTruthy();

			wakeLock.cleanup();
		});

		await cleanup();
	});

	it('delays requesting if the document is hidden', async () => {
		const cleanup = asyncEffectRoot(async () => {
			defineWakeLockAPI();
			const mockDocument = new MockDocument();

			const wakeLock = handleWakeLock({ autoCleanup: false, document: mockDocument as Document });

			await wakeLock.request('screen');

			expect(wakeLock.isActive).toBeFalsy();

			mockDocument.visibilityState = 'visible';
			mockDocument.dispatchEvent(new Event('visibilitychange'));

			await tick();
			await tick();

			expect(wakeLock.isActive).toBeTruthy();

			wakeLock.cleanup();
		});

		await cleanup();
	});

	it('cancels requesting if release is called before the document becomes visible', async () => {
		const cleanup = asyncEffectRoot(async () => {
			defineWakeLockAPI();
			const mockDocument = new MockDocument();

			const wakeLock = handleWakeLock({ autoCleanup: false, document: mockDocument as Document });

			await wakeLock.request('screen');

			expect(wakeLock.isActive).toBeFalsy();

			await wakeLock.release();

			expect(wakeLock.isActive).toBeFalsy();

			mockDocument.visibilityState = 'visible';
			mockDocument.dispatchEvent(new Event('visibilitychange'));

			expect(wakeLock.isActive).toBeFalsy();

			wakeLock.cleanup();
		});

		await cleanup();
	});

	it('becomes inactive if wake lock is released', async () => {
		const cleanup = asyncEffectRoot(async () => {
			const sentinel = defineWakeLockAPI();
			const mockDocument = new MockDocument();
			mockDocument.visibilityState = 'visible';

			const wakeLock = handleWakeLock({ autoCleanup: false, document: mockDocument as Document });

			await wakeLock.request('screen');

			expect(wakeLock.isActive).toBeTruthy();

			mockDocument.visibilityState = 'hidden';
			mockDocument.dispatchEvent(new Event('visibilitychange'));
			sentinel.dispatchEvent(new Event('release'));

			expect(wakeLock.isActive).toBeFalsy();

			mockDocument.visibilityState = 'visible';
			mockDocument.dispatchEvent(new Event('visibilitychange'));
			await wakeLock.request('screen');

			expect(wakeLock.isActive).toBeTruthy();

			wakeLock.cleanup();
		});

		await cleanup();
	});
});
