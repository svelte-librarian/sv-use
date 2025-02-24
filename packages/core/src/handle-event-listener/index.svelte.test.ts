import { flushSync } from 'svelte';
import { beforeEach, describe, expect, it, vi, type MockInstance } from 'vitest';
import { handleEventListener } from './index.svelte.js';

describe('One target, one event, one listener', () => {
	const event = 'click';
	const options = { capture: true };
	const listener = vi.fn();

	let target: HTMLDivElement;
	let addEventListenerSpy: MockInstance;
	let removeEventListenerSpy: MockInstance;

	beforeEach(() => {
		target = document.createElement('div');
		addEventListenerSpy = vi.spyOn(target, 'addEventListener');
		removeEventListenerSpy = vi.spyOn(target, 'removeEventListener');

		listener.mockReset();
	});

	it('Adds the listener on the target', () => {
		const cleanup = $effect.root(() => {
			handleEventListener(target, event, listener, options);

			flushSync();

			expect(addEventListenerSpy).toBeCalledTimes(1);
		});

		cleanup();
	});

	it('Triggers the listener when an event is dispatched', () => {
		const cleanup = $effect.root(() => {
			handleEventListener(target, event, listener, options);

			flushSync();

			expect(listener).not.toHaveBeenCalled();

			target.dispatchEvent(new MouseEvent(event));

			expect(listener).toHaveBeenCalledOnce();
		});

		cleanup();
	});

	it('Removes the listener on unmount', () => {
		const cleanup = $effect.root(() => {
			handleEventListener(target, event, listener, options);

			flushSync();
		});

		expect(removeEventListenerSpy).not.toHaveBeenCalled();

		cleanup();

		expect(removeEventListenerSpy).toHaveBeenCalledOnce();
	});
});

describe('One target, multiple events, one listener', () => {
	const events = ['click', 'scroll', 'blur', 'resize'];
	const options = { capture: true };
	const listener = vi.fn();

	let target: HTMLDivElement;
	let addEventListenerSpy: MockInstance;
	let removeEventListenerSpy: MockInstance;

	beforeEach(() => {
		target = document.createElement('div');
		addEventListenerSpy = vi.spyOn(target, 'addEventListener');
		removeEventListenerSpy = vi.spyOn(target, 'removeEventListener');

		listener.mockReset();
	});

	it('Adds the listener on the target for each event', () => {
		const cleanup = $effect.root(() => {
			handleEventListener(target, events, listener, options);

			flushSync();

			events.forEach((event) => {
				expect(addEventListenerSpy).toBeCalledWith(event, listener, options);
			});
		});

		cleanup();
	});

	it('Triggers the listener when an event is dispatched for each event', () => {
		const cleanup = $effect.root(() => {
			handleEventListener(target, events, listener, options);

			flushSync();

			expect(listener).not.toHaveBeenCalled();

			events.forEach((event, index) => {
				target.dispatchEvent(new Event(event));

				expect(listener).toBeCalledTimes(index + 1);
			});
		});

		cleanup();
	});

	it('Removes the listener for each event on unmount', () => {
		const cleanup = $effect.root(() => {
			handleEventListener(target, events, listener, options);

			flushSync();
		});

		expect(removeEventListenerSpy).not.toBeCalled();

		cleanup();

		expect(removeEventListenerSpy).toBeCalledTimes(events.length);
	});
});

describe('One target, one event, multiple listeners', () => {
	const event = 'click';
	const listeners = [vi.fn(), vi.fn(), vi.fn()];
	const options = { capture: true };

	let target: HTMLDivElement;
	let addEventListenerSpy: MockInstance;
	let removeEventListenerSpy: MockInstance;

	beforeEach(() => {
		target = document.createElement('div');
		addEventListenerSpy = vi.spyOn(target, 'addEventListener');
		removeEventListenerSpy = vi.spyOn(target, 'removeEventListener');

		listeners.forEach((listener) => listener.mockReset());
	});

	it('Adds each listener on the target', () => {
		const cleanup = $effect.root(() => {
			handleEventListener(target, event, listeners, options);

			flushSync();

			listeners.forEach((listener) => {
				expect(addEventListenerSpy).toBeCalledWith(event, listener, options);
			});
		});

		cleanup();
	});

	it('Triggers each listener when an event is dispatched', () => {
		const cleanup = $effect.root(() => {
			handleEventListener(target, event, listeners, options);

			flushSync();

			listeners.forEach((listener) => expect(listener).not.toHaveBeenCalled());

			target.dispatchEvent(new Event(event));

			listeners.forEach((listener) => expect(listener).toBeCalledTimes(1));
		});

		cleanup();
	});

	it('Removes each listener on unmount', () => {
		const cleanup = $effect.root(() => {
			handleEventListener(target, event, listeners, options);

			flushSync();
		});

		expect(removeEventListenerSpy).not.toBeCalled();

		cleanup();

		expect(removeEventListenerSpy).toBeCalledTimes(listeners.length);
	});
});

describe('One target, multiple events, multiple listeners', () => {
	const listeners = [vi.fn(), vi.fn(), vi.fn()];
	const events = ['click', 'scroll', 'blur', 'resize', 'custom-event'];
	const options = { capture: true };

	let target: HTMLDivElement;
	let addEventListenerSpy: MockInstance;
	let removeEventListenerSpy: MockInstance;

	beforeEach(() => {
		target = document.createElement('div');
		addEventListenerSpy = vi.spyOn(target, 'addEventListener');
		removeEventListenerSpy = vi.spyOn(target, 'removeEventListener');

		listeners.forEach((listener) => listener.mockReset());
	});

	it('Adds each listener for each event on the target', () => {
		const cleanup = $effect.root(() => {
			handleEventListener(target, events, listeners, options);

			flushSync();

			listeners.forEach((listener) => {
				events.forEach((event) => {
					expect(addEventListenerSpy).toBeCalledWith(event, listener, options);
				});
			});
		});

		cleanup();
	});

	it('Triggers each listener for each event that is dispatched', () => {
		const cleanup = $effect.root(() => {
			handleEventListener(target, events, listeners, options);

			flushSync();

			events.forEach((event, index) => {
				target.dispatchEvent(new Event(event));
				listeners.forEach((listener) => {
					expect(listener).toHaveBeenCalledTimes(index + 1);
				});
			});
		});

		cleanup();
	});

	it('Removes each listener for each event on unmount', () => {
		const cleanup = $effect.root(() => {
			handleEventListener(target, events, listeners, options);

			flushSync();
		});

		expect(removeEventListenerSpy).not.toBeCalled();

		cleanup();

		expect(removeEventListenerSpy).toBeCalledTimes(events.length * listeners.length);
	});
});

describe('Target(s)', () => {
	const event = 'click';
	const listener = vi.fn();
	const options = { capture: true };

	let target = $state<HTMLDivElement>()!;
	let addEventListenerSpy: MockInstance;

	beforeEach(() => {
		target = document.createElement('div');
		addEventListenerSpy = vi.spyOn(target, 'addEventListener');

		listener.mockReset();
	});

	it('Accept an array of targets', async () => {
		const el1 = document.createElement('div');
		const el2 = document.createElement('div');
		const el3 = document.createElement('div');

		const targets = [el1, el2, el3];

		const cleanup = $effect.root(() => {
			handleEventListener(targets, event, listener, options);

			flushSync();

			targets.forEach((target) => {
				target.dispatchEvent(new Event(event));
			});

			expect(listener).toHaveBeenCalledTimes(targets.length);
		});

		cleanup();
	});

	it('Attaches the listener again if the target changes', () => {
		const cleanup = $effect.root(() => {
			handleEventListener(() => target, event, listener, options);

			flushSync();

			target.dispatchEvent(new Event(event));

			expect(addEventListenerSpy).toHaveBeenCalledOnce();

			target = document.createElement('div');
			addEventListenerSpy = vi.spyOn(target, 'addEventListener');

			flushSync();

			target.dispatchEvent(new Event(event));

			expect(addEventListenerSpy).toHaveBeenCalledOnce();
		});

		cleanup();
	});
});
