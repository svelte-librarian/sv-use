import { handleEventListener } from '../../browser/index.js';
import { noop, normalizeValue, toArray } from '../../__internal__/utils.js';
import type { CleanupFunction, MaybeGetter } from '../../__internal__/types.js';
import { untrack } from 'svelte';

type CreateDropZoneOptions = {
	/**
	 * The allowed data types in the format `xxx/xxx`.
	 *
	 * Supports `*` and `xxx/*` wildcards.
	 * * If set to `*`, it accepts any data type.
	 * * If set to `xxx/*`, it accepts any data type that starts with `xxx`.
	 * @default '*'
	 */
	allowedDataTypes?: MaybeGetter<string> | MaybeGetter<string[]> | ((types: string[]) => boolean);
	/**
	 * Whether to allow multiple files to be dropped.
	 * @default true
	 */
	multiple?: boolean;
	/**
	 * Whether to prevent default behavior for unhandled events or not.
	 * @default false
	 */
	preventDefaultForUnhandled?: boolean;
	onDrop?(files: File[] | null, event: DragEvent): void;
	onEnter?(event: DragEvent): void;
	onLeave?(event: DragEvent): void;
	onOver?(event: DragEvent): void;
};

type CreateDropZoneReturn = {
	readonly isOver: boolean;
	files: File[] | null;
	cleanup: CleanupFunction;
};

/**
 * Creates a zone where files can be dropped.
 * @param target The element that acts as the drop zone.
 * @param options Additional options to customize the behavior.
 * @see https://svelte-librarian.github.io/sv-use/docs/core/elements/create-drop-zone
 */
export function createDropZone(
	target: MaybeGetter<HTMLElement | null | undefined>,
	options: CreateDropZoneOptions = {}
): CreateDropZoneReturn {
	const {
		allowedDataTypes = '*',
		multiple = true,
		preventDefaultForUnhandled = false,
		onDrop = noop,
		onEnter = noop,
		onLeave = noop,
		onOver = noop
	} = options;

	let cleanups: CleanupFunction[] = [];
	let counter = 0;
	let isValid = true;

	const _target = $derived(normalizeValue(target));
	let isOver = $state(false);
	let files = $state<File[] | null>(null);

	$effect(() => {
		if (_target) {
			untrack(() => {
				cleanups.push(
					handleEventListener<DragEvent>(_target, 'dragenter', (event) =>
						handleDragEvent(event, 'enter')
					),
					handleEventListener<DragEvent>(_target, 'dragover', (event) =>
						handleDragEvent(event, 'over')
					),
					handleEventListener<DragEvent>(_target, 'dragleave', (event) =>
						handleDragEvent(event, 'leave')
					),
					handleEventListener<DragEvent>(_target, 'drop', (event) => handleDragEvent(event, 'drop'))
				);
			});
		}

		return () => {
			cleanup();
			cleanups = [];
		};
	});

	function getFiles(event: DragEvent) {
		const list = Array.from(event.dataTransfer?.files ?? []);
		return list.length === 0 ? null : multiple ? list : [list[0]];
	}

	function checkDataTypes(types: string[]): boolean {
		if (types.length === 0) return false;
		if (allowedDataTypes instanceof Function && allowedDataTypes.length > 0) {
			return allowedDataTypes(types) as boolean;
		}
		if (allowedDataTypes === '*') return true;

		const _allowedTypes = allowedDataTypes as MaybeGetter<string> | MaybeGetter<string[]>;

		return types.every((type) => {
			return toArray(normalizeValue(_allowedTypes)).some((allowedType) => {
				if (allowedType.split('/')[1] === '*') {
					return type.startsWith(allowedType.split('/')[0]);
				}

				return type === allowedType;
			});
		});
	}

	function checkValidity(items: DataTransferItemList) {
		const types = Array.from(items ?? []).map((item) => item.type);

		const dataTypesValid = checkDataTypes(types);
		const multipleFilesValid = multiple || items.length <= 1;

		return dataTypesValid && multipleFilesValid;
	}

	function isSafari() {
		return /^(?:(?!chrome|android).)*safari/i.test(navigator.userAgent) && !('chrome' in window);
	}

	function handleDragEvent(event: DragEvent, eventType: 'enter' | 'over' | 'leave' | 'drop') {
		const dataTransferItemList = event.dataTransfer?.items;
		isValid = (dataTransferItemList && checkValidity(dataTransferItemList)) ?? false;

		if (preventDefaultForUnhandled) {
			event.preventDefault();
		}

		if (!isSafari() && !isValid) {
			if (event.dataTransfer) {
				event.dataTransfer.dropEffect = 'none';
			}

			return;
		}

		event.preventDefault();
		if (event.dataTransfer) {
			event.dataTransfer.dropEffect = 'copy';
		}

		const currentFiles = getFiles(event);

		switch (eventType) {
			case 'enter':
				console.log(event);
				counter += 1;
				isOver = true;
				onEnter(event);
				break;
			case 'over':
				onOver(event);
				break;
			case 'leave':
				counter -= 1;

				if (counter === 0) {
					isOver = false;
				}

				onLeave(event);
				break;
			case 'drop':
				counter = 0;
				isOver = false;

				if (isValid) {
					files = currentFiles;
					onDrop(currentFiles, event);
				}

				break;
		}
	}

	function cleanup() {
		cleanups.map((fn) => fn());
	}

	return {
		get files() {
			return files;
		},
		set files(v) {
			files = v;
		},
		get isOver() {
			return isOver;
		},
		cleanup
	};
}
