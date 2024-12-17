import { onMount } from 'svelte';
import { BROWSER } from 'esm-env';

type CreateDraggableOptions = {
	/** The axis on which the draggable element can be dragged. */
	axis?: 'x' | 'y' | 'both';
	/** The initial position of the draggable element. */
	initial?: { x: number; y: number };
	/** Whether the draggable element is disabled or not. */
	disabled?: boolean;
	/** A callback for when the draggable element starts being dragged. */
	onDragStart?: () => void;
	/** A callback for when the draggable element is being dragged. */
	onDragMove?: () => void;
	/** A callback for when the draggable element stops being dragged. */
	onDragEnd?: () => void;
};

type CreateDraggableReturn<T extends HTMLElement> = {
	/** The draggable element. */
	current: T;
	/** The x position of the draggable element. */
	x: number;
	/** The y position of the draggable element. */
	y: number;
	/** Whether the draggable element is disabled or not. */
	disabled: boolean;
	/** The axis on which the draggable element can be dragged. */
	axis: 'x' | 'y' | 'both';
	/** Whether the draggable element is being dragged or not. */
	isDragged: boolean;
	/** A style helper for the draggable element. */
	readonly style: `top: ${number}px; left: ${number}px;`;
};

const DEFAULT_INITIAL = { x: 0, y: 0 };
const DEFAULT_DISABLED = false;
const DEFAULT_AXIS = 'both';

/**
 * Creates a draggable element.
 * @example
 * ```svelte
 * <script lang="ts">
 *     const draggable = createDraggable<HTMLDivElement>();
 * </script>
 *
 * <div bind:this={draggable.current} style={draggable.style}>
 *     ...
 * </div>
 * ```
 */
export function createDraggable<T extends HTMLElement>(): CreateDraggableReturn<T>;
/**
 * Creates a draggable element.
 * @param options Additional options to customize the behavior.
 * @example
 * ```svelte
 * <script lang="ts">
 *     const draggable = createDraggable<HTMLDivElement>();
 * </script>
 *
 * <div bind:this={draggable.current} style={draggable.style}>
 *     ...
 * </div>
 * ```
 */
export function createDraggable<T extends HTMLElement>(
	options: CreateDraggableOptions
): CreateDraggableReturn<T>;
/**
 * Creates a draggable element.
 * @param element The element that acts as the draggable element.
 * @example
 * ```svelte
 * <script lang="ts">
 *     const draggable = createDraggable<HTMLDivElement>();
 * </script>
 *
 * <div bind:this={draggable.current} style={draggable.style}>
 *     ...
 * </div>
 * ```
 */
export function createDraggable<T extends HTMLElement>(element: T): CreateDraggableReturn<T>;
/**
 * Creates a draggable element.
 * @param element The element that acts as the draggable element.
 * @param options Additional options to customize the behavior.
 * @example
 * ```svelte
 * <script lang="ts">
 *     const draggable = createDraggable<HTMLDivElement>();
 * </script>
 *
 * <div bind:this={draggable.current} style={draggable.style}>
 *     ...
 * </div>
 * ```
 */
export function createDraggable<T extends HTMLElement>(
	element: T,
	options: CreateDraggableOptions
): CreateDraggableReturn<T>;

export function createDraggable<T extends HTMLElement>(
	elementOrOptions?: T | CreateDraggableOptions,
	options?: CreateDraggableOptions
): CreateDraggableReturn<T> {
	const DEFAULT_ON_DRAG_START = (event: DragEvent) => {
		_isDragged = true;
		event.dataTransfer?.setData('text/plain', '');
	};

	const DEFAULT_ON_DRAG_MOVE = (event: DragEvent) => {
		event.preventDefault();

		// TODO : Make the dragging work while moving the element
	};

	const DEFAULT_ON_DRAG_END = (event: DragEvent) => {
		event.preventDefault();
		_isDragged = false;

		if (_axis === 'x' || _axis === 'both') {
			_x = event.clientX;
		}

		if (_axis === 'y' || _axis === 'both') {
			_y = event.clientY;
		}
	};

	let element: T | undefined;
	if (BROWSER && elementOrOptions instanceof HTMLElement) {
		element = elementOrOptions as T;
	} else {
		options = elementOrOptions as CreateDraggableOptions;
	}

	const axis = options?.axis ?? DEFAULT_AXIS;
	const initial = options?.initial ?? DEFAULT_INITIAL;
	const disabled = options?.disabled ?? DEFAULT_DISABLED;
	const onDragStart = options?.onDragStart ?? DEFAULT_ON_DRAG_START;
	const onDragMove = options?.onDragMove ?? DEFAULT_ON_DRAG_MOVE;
	const onDragEnd = options?.onDragEnd ?? DEFAULT_ON_DRAG_END;

	let _current = $state<T | undefined>(element);
	let _x = $state<number>(initial.x);
	let _y = $state<number>(initial.y);
	let _axis = $state<'x' | 'y' | 'both'>(axis);
	let _disabled = $state<boolean>(disabled);
	let _isDragged = $state<boolean>(false);

	onMount(() => {
		document.addEventListener('dragstart', onDragStart);
		document.addEventListener('drag', onDragMove);
		document.addEventListener('dragend', onDragEnd);

		return () => {
			document.removeEventListener('dragstart', onDragStart);
			document.removeEventListener('drag', onDragMove);
			document.removeEventListener('dragend', onDragEnd);
		};
	});

	return {
		get current() {
			return _current!;
		},
		set current(v: T) {
			_current = v;
		},
		get x() {
			return _x;
		},
		set x(v: number) {
			_x = v;
		},
		get y() {
			return _y;
		},
		set y(v: number) {
			_y = v;
		},
		get disabled() {
			return _disabled;
		},
		set disabled(v: boolean) {
			_disabled = v;
		},
		get axis() {
			return _axis;
		},
		set axis(v: 'x' | 'y' | 'both') {
			_axis = v;
		},
		get isDragged() {
			return _isDragged;
		},
		set isDragged(v: boolean) {
			_isDragged = v;
		},
		get style() {
			return `top: ${_y}px; left: ${_x}px;` as const;
		}
	};
}
