import { afterAll, beforeAll, beforeEach, describe, expect, it, vi } from 'vitest';
import { onLongPress } from './index.svelte.js';
import { flushSync } from 'svelte';

describe('onLongPress', () => {
	let pointerDownEvent: PointerEvent;
	let pointerUpEvent: PointerEvent;
	let element = $state({} as HTMLElement);
	let childElement = $state({} as HTMLElement);

	beforeAll(() => {
		vi.useFakeTimers();
	});

	afterAll(() => {
		vi.useRealTimers();
	});

	beforeEach(() => {
		pointerDownEvent = new PointerEvent('pointerdown', { cancelable: true, bubbles: true });
		pointerUpEvent = new PointerEvent('pointerup', { cancelable: true, bubbles: true });
		element = document.createElement('div');
		childElement = document.createElement('div');

		element.appendChild(childElement);
	});

	it("Doesn't trigger the callback if the element was clicked", () => {
		const cleanup = $effect.root(() => {
			const delay = 500;
			const callback = vi.fn();

			onLongPress(() => element, callback, {
				autoCleanup: false,
				delay
			});

			element.dispatchEvent(pointerDownEvent);
			expect(callback).not.toHaveBeenCalled();
		});

		cleanup();
	});

	it('Triggers the callback after the default delay', () => {
		const cleanup = $effect.root(() => {
			const delay = 500;
			const callback = vi.fn();

			onLongPress(() => element, callback, {
				autoCleanup: false,
				delay
			});

			flushSync();

			element.dispatchEvent(pointerDownEvent);
			expect(callback).not.toHaveBeenCalled();

			vi.advanceTimersByTime(delay + 100);
			expect(callback).toHaveBeenCalledOnce();
		});

		cleanup();
	});

	it('Triggers the callback after a custom delay', () => {
		const cleanup = $effect.root(() => {
			const delay = 1000;
			const callback = vi.fn();

			onLongPress(() => element, callback, {
				autoCleanup: false,
				delay
			});

			flushSync();

			element.dispatchEvent(pointerDownEvent);
			expect(callback).not.toHaveBeenCalled();

			vi.advanceTimersByTime(delay + 100);
			expect(callback).toHaveBeenCalledOnce();
		});

		cleanup();
	});

	it("Doesn't trigger the callback if a child element was long pressed", () => {
		const cleanup = $effect.root(() => {
			const delay = 500;
			const callback = vi.fn();

			onLongPress(() => element, callback, {
				autoCleanup: false,
				delay,
				modifiers: {
					self: true
				}
			});

			flushSync();

			childElement.dispatchEvent(pointerDownEvent);

			vi.advanceTimersByTime(delay + 100);

			expect(callback).not.toHaveBeenCalled();
		});

		cleanup();
	});

	it('Triggers onMouseUp after a click with the correct arguments', () => {
		const cleanup = $effect.root(() => {
			const onMouseUp = vi.fn();

			onLongPress(
				() => element,
				() => {},
				{
					autoCleanup: false,
					onMouseUp
				}
			);

			flushSync();

			element.dispatchEvent(pointerDownEvent);
			element.dispatchEvent(pointerUpEvent);

			expect(onMouseUp).toHaveBeenCalledOnce();
			expect(onMouseUp).toHaveBeenCalledWith(0, 0, false);
		});

		cleanup();
	});

	it('Triggers onMouseUp after a long press with the correct arguments', () => {
		const cleanup = $effect.root(() => {
			const delay = 500;
			const onMouseUp = vi.fn();

			onLongPress(
				() => element,
				() => {},
				{
					autoCleanup: false,
					delay,
					onMouseUp
				}
			);

			flushSync();

			element.dispatchEvent(pointerDownEvent);
			vi.advanceTimersByTime(delay + 100);
			element.dispatchEvent(pointerUpEvent);

			expect(onMouseUp).toHaveBeenCalledOnce();

			// Because of the fake timers, the duration is
			// always 0 instead of delay + 100
			expect(onMouseUp).toHaveBeenCalledWith(0, 0, true);
		});

		cleanup();
	});
});
