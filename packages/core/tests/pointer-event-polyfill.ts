/**
 * JSDom hasn't implemented the constructor for PointerEvent
 */

if (!globalThis.PointerEvent) {
	globalThis.PointerEvent = class PointerEvent extends MouseEvent {
		constructor(type: string, eventInitDict: PointerEventInit = {}) {
			super(type, eventInitDict);
		}
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
	} as any;
}

export {};
