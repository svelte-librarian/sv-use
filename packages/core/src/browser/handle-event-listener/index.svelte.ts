import { onDestroy } from 'svelte';
import { BROWSER } from 'esm-env';
import { defaultWindow } from '../../__internal__/configurable.js';
import type { Arrayable, CleanupFunction } from '../../__internal__/types.js';

interface InferEventTarget<Events> {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	addEventListener: (event: Events, fn?: any, options?: any) => any;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	removeEventListener: (event: Events, fn?: any, options?: any) => any;
}

type GeneralEventListener<EventType extends Event = Event> = (evt: EventType) => void;
type HandleEventListenerOptions = AddEventListenerOptions & {
	/**
	 * Whether to automatically mount and cleanup the event listener by running it in an `onMount` or not.
	 *
	 * Don't use this if you are calling `handleEventListener` outside the component initialization lifecycle. Instead, call it from outside and clean it using the returned function.
	 *
	 * @default false
	 */
	autoMountAndCleanup?: boolean;
};

export function handleEventListener<WindowEvent extends keyof WindowEventMap>(
	event: Arrayable<WindowEvent>,
	listener: Arrayable<(this: Window, ev: WindowEventMap[WindowEvent]) => unknown>,
	options?: HandleEventListenerOptions
): CleanupFunction;

export function handleEventListener<WindowEvent extends keyof WindowEventMap>(
	element: Window,
	event: Arrayable<WindowEvent>,
	listener: Arrayable<(this: Window, ev: WindowEventMap[WindowEvent]) => unknown>,
	options?: HandleEventListenerOptions
): CleanupFunction;

export function handleEventListener<DocumentEvent extends keyof DocumentEventMap>(
	element: Document,
	event: Arrayable<DocumentEvent>,
	listener: Arrayable<(this: Window, ev: DocumentEventMap[DocumentEvent]) => unknown>,
	options?: HandleEventListenerOptions
): CleanupFunction;

export function handleEventListener<
	CustomElement extends HTMLElement,
	ElementEvent extends keyof HTMLElementEventMap
>(
	element: CustomElement,
	event: Arrayable<ElementEvent>,
	listener: Arrayable<(this: CustomElement, ev: HTMLElementEventMap[ElementEvent]) => unknown>,
	options?: HandleEventListenerOptions
): CleanupFunction;

export function handleEventListener<Name extends string, EventType extends Event = Event>(
	element: InferEventTarget<Name>,
	event: Arrayable<Name>,
	listener: Arrayable<GeneralEventListener<EventType>>,
	options?: HandleEventListenerOptions
): CleanupFunction;

export function handleEventListener<EventType extends Event = Event>(
	element: EventTarget,
	event: Arrayable<string>,
	listener: Arrayable<GeneralEventListener<EventType>>,
	options?: HandleEventListenerOptions
): CleanupFunction;

/**
 * Handles the mounting (and, optionally, unmounting via the {@link HandleEventListenerOptions.autoMountAndCleanup | `autoMountAndCleanup`} option) of an event listener.
 * @returns A cleanup function that can be used to remove the event listener.
 * @see https://svelte-librarian.github.io/sv-use/docs/core/browser/handle-event-listener
 */
export function handleEventListener<
	ElementOrEvent extends
		| Window
		| Document
		| HTMLElement
		| InferEventTarget<string>
		| Arrayable<keyof WindowEventMap>
		| Arrayable<keyof DocumentEventMap>
		| Arrayable<keyof HTMLElementEventMap>
		| Arrayable<string>,
	EventOrListener extends
		| Arrayable<keyof WindowEventMap>
		| Arrayable<keyof DocumentEventMap>
		| Arrayable<keyof HTMLElementEventMap>
		| Arrayable<string>
		| Arrayable<GeneralEventListener>,
	ListenerOrOptions extends
		| Arrayable<string>
		| Arrayable<GeneralEventListener>
		| HandleEventListenerOptions,
	OptionsOrNever extends HandleEventListenerOptions | never
>(
	elementOrEvent: ElementOrEvent,
	eventOrListener: EventOrListener,
	listenerOrOptions?: ListenerOrOptions,
	optionsOrNever?: OptionsOrNever
): CleanupFunction {
	let element: Window | Document | HTMLElement | undefined,
		events:
			| Array<keyof WindowEventMap>
			| Array<keyof DocumentEventMap>
			| Array<keyof HTMLElementEventMap>,
		listeners: Array<GeneralEventListener>,
		options: HandleEventListenerOptions,
		autoMountAndCleanup: boolean;

	if (typeof elementOrEvent === 'string' || Array.isArray(elementOrEvent)) {
		element = defaultWindow;
		events = (Array.isArray(elementOrEvent) ? elementOrEvent : [elementOrEvent]) as
			| Array<keyof WindowEventMap>
			| Array<keyof DocumentEventMap>
			| Array<keyof HTMLElementEventMap>;
		listeners = (
			Array.isArray(eventOrListener) ? eventOrListener : [eventOrListener]
		) as Array<GeneralEventListener>;
		const _options = listenerOrOptions as HandleEventListenerOptions | undefined;
		options = {
			signal: _options?.signal ?? undefined,
			capture: _options?.capture ?? undefined,
			once: _options?.once ?? undefined,
			passive: _options?.passive ?? undefined
		};
		autoMountAndCleanup = _options?.autoMountAndCleanup ?? false;
	} else {
		element = elementOrEvent as Window | Document | HTMLElement;
		events = (Array.isArray(eventOrListener) ? eventOrListener : [eventOrListener]) as
			| Array<keyof WindowEventMap>
			| Array<keyof DocumentEventMap>
			| Array<keyof HTMLElementEventMap>;
		listeners = (
			Array.isArray(listenerOrOptions) ? listenerOrOptions : [listenerOrOptions]
		) as Array<GeneralEventListener>;
		options = {
			signal: optionsOrNever?.signal ?? undefined,
			capture: optionsOrNever?.capture ?? undefined,
			once: optionsOrNever?.once ?? undefined,
			passive: optionsOrNever?.passive ?? undefined
		};
		autoMountAndCleanup = optionsOrNever?.autoMountAndCleanup ?? false;
	}

	if (BROWSER && element) {
		events.forEach((evt) => {
			listeners.forEach((listener) => element.addEventListener(evt, listener, options));
		});
	}

	if (autoMountAndCleanup) {
		onDestroy(() => {
			cleanup();
		});
	}

	function cleanup() {
		events.forEach((evt) => {
			listeners.forEach((listener) => element?.removeEventListener(evt, listener, options));
		});
	}

	return cleanup;
}
