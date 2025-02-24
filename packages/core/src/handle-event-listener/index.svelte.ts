import { normalizeValue, toArray } from '../__internal__/utils.svelte.js';
import type { Arrayable, MaybeGetter } from '../__internal__/types.js';

interface InferEventTarget<Events> {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	addEventListener: (event: Events, fn?: any, options?: any) => any;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	removeEventListener: (event: Events, fn?: any, options?: any) => any;
}

type GeneralEventListener<EventType extends Event = Event> = (evt: EventType) => void;
type HandleEventListenerOptions = AddEventListenerOptions | boolean;

export function handleEventListener<WindowEvent extends keyof WindowEventMap>(
	element: Arrayable<MaybeGetter<Window | null | undefined>>,
	event: Arrayable<WindowEvent>,
	listener: Arrayable<(this: Window, ev: WindowEventMap[WindowEvent]) => unknown>,
	options?: HandleEventListenerOptions
): void;

export function handleEventListener<DocumentEvent extends keyof DocumentEventMap>(
	element: Arrayable<MaybeGetter<Document | null | undefined>>,
	event: Arrayable<DocumentEvent>,
	listener: Arrayable<(this: Window, ev: DocumentEventMap[DocumentEvent]) => unknown>,
	options?: HandleEventListenerOptions
): void;

export function handleEventListener<
	CustomElement extends HTMLElement,
	ElementEvent extends keyof HTMLElementEventMap
>(
	element: Arrayable<MaybeGetter<CustomElement | null | undefined>>,
	event: Arrayable<ElementEvent>,
	listener: Arrayable<(this: CustomElement, ev: HTMLElementEventMap[ElementEvent]) => unknown>,
	options?: HandleEventListenerOptions
): void;

export function handleEventListener<Name extends string, EventType extends Event = Event>(
	element: Arrayable<MaybeGetter<InferEventTarget<Name> | null | undefined>>,
	event: Arrayable<Name>,
	listener: Arrayable<GeneralEventListener<EventType>>,
	options?: HandleEventListenerOptions
): void;

export function handleEventListener<EventType extends Event = Event>(
	element: Arrayable<MaybeGetter<EventTarget | null | undefined>>,
	event: Arrayable<string>,
	listener: Arrayable<GeneralEventListener<EventType>>,
	options?: HandleEventListenerOptions
): void;

/**
 * Handles the mounting and unmounting of an event listener.
 * @see https://svelte-librarian.github.io/sv-use/docs/core/handle-event-listener
 */
export function handleEventListener<
	Element extends MaybeGetter<Window | Document | HTMLElement | EventTarget | null | undefined>,
	Event extends keyof WindowEventMap | keyof DocumentEventMap | keyof HTMLElementEventMap | string
>(
	elements: Arrayable<Element>,
	events: Arrayable<Event>,
	listeners: Arrayable<GeneralEventListener>,
	options?: HandleEventListenerOptions
): void {
	const _elements = $derived(toArray(elements).map(normalizeValue));
	const _events = $derived(toArray(events));
	const _listeners = $derived(toArray(listeners));

	$effect(() => {
		_elements.forEach((element) => {
			_events.forEach((event) => {
				_listeners.forEach((listener) => element?.addEventListener(event, listener, options));
			});
		});

		return () => {
			_elements.forEach((element) => {
				_events.forEach((event) => {
					_listeners.forEach((listener) => element?.removeEventListener(event, listener, options));
				});
			});
		};
	});
}
