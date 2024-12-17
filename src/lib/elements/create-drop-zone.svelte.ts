import { onMount } from 'svelte';

type CreateDropZoneOptions = {
	/** A callback for when something is being dragged over the drop zone. */
	onDragOver?: (event: DragEvent) => void;
	/** A callback for when nothing is being dragged over the drop zone. */
	onDragLeave?: (event: DragEvent) => void;
	/** A callback for when files are dropped in the drop zone. */
	onDrop?: (event: DragEvent) => void;
};

type CreateDropZoneReturn<T> = {
	/** The element that acts as the drop zone. */
	current: T;
	/** Clears the files that are held in the drop zone. */
	clearFiles: () => void;
	/** Whether the drop zone is being dragged over or not. */
	readonly isOver: boolean;
	/** The files that are held in the drop zone. */
	readonly files: File[];
};

/**
 * Creates a new drop zone.
 * @example
 * ```svelte
 * <script lang="ts">
 *     const dropZone = createDropZone<HTMLDivElement>();
 * </script>
 *
 * <div bind:this={dropZone.current}>
 *     ...
 * </div>
 * ```
 */
export function createDropZone<T extends HTMLElement>(): CreateDropZoneReturn<T>;
/**
 * Creates a new drop zone.
 * @param element The element that acts as the drop zone.
 * @example
 * ```svelte
 * <script lang="ts">
 *     const dropZone = createDropZone<HTMLDivElement>();
 * </script>
 *
 * <div bind:this={dropZone.current}>
 *     ...
 * </div>
 * ```
 */
export function createDropZone<T extends HTMLElement>(element: T): CreateDropZoneReturn<T>;
/**
 * Creates a new drop zone.
 * @param options Additional options to customize the behavior.
 * @example
 * ```svelte
 * <script lang="ts">
 *     const dropZone = createDropZone<HTMLDivElement>();
 * </script>
 *
 * <div bind:this={dropZone.current}>
 *     ...
 * </div>
 * ```
 */
export function createDropZone<T extends HTMLElement>(
	options: CreateDropZoneOptions
): CreateDropZoneReturn<T>;
/**
 * Creates a new drop zone.
 * @param element The element that acts as the drop zone.
 * @param options Additional options to customize the behavior.
 * @example
 * ```svelte
 * <script lang="ts">
 *     const dropZone = createDropZone<HTMLDivElement>();
 * </script>
 *
 * <div bind:this={dropZone.current}>
 *     ...
 * </div>
 * ```
 */
export function createDropZone<T extends HTMLElement>(
	element: T,
	options: CreateDropZoneOptions
): CreateDropZoneReturn<T>;

export function createDropZone<T extends HTMLElement>(
	element?: T,
	options?: CreateDropZoneOptions
): CreateDropZoneReturn<T> {
	const DEFAULT_ON_DRAG_OVER = (event: DragEvent) => {
		event.preventDefault();
		_isOver = true;
	};

	const DEFAULT_ON_DRAG_LEAVE = (event: DragEvent) => {
		event.preventDefault();
		_isOver = false;
	};

	const DEFAULT_ON_DROP = (event: DragEvent) => {
		event.preventDefault();
		_isOver = false;
		_files = Array.from(event.dataTransfer?.files ?? []);
	};

	const onDragOver = options?.onDragOver ?? DEFAULT_ON_DRAG_OVER;
	const onDragLeave = options?.onDragLeave ?? DEFAULT_ON_DRAG_LEAVE;
	const onDrop = options?.onDrop ?? DEFAULT_ON_DROP;

	let _current = $state<T | undefined>(element);
	let _isOver = $state(false);
	let _files = $state<File[]>([]);

	onMount(() => {
		_current?.addEventListener('dragover', onDragOver);
		_current?.addEventListener('dragleave', onDragLeave);
		_current?.addEventListener('drop', onDrop);

		return () => {
			_current?.removeEventListener('dragover', onDragOver);
			_current?.removeEventListener('dragleave', onDragLeave);
			_current?.removeEventListener('drop', onDrop);
		};
	});

	return {
		get current() {
			return _current!;
		},
		set current(v: T) {
			_current = v;
		},
		get isOver() {
			return _isOver;
		},
		get files() {
			return _files;
		},
		clearFiles() {
			_files = [];

			if (_current instanceof HTMLInputElement) {
				_current.value = '';
			}
		}
	};
}
