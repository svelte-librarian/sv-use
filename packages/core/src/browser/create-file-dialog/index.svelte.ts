import { onDestroy } from 'svelte';
import { BROWSER } from 'esm-env';
import { handleEventListener } from '../handle-event-listener/index.svelte.js';
import type { CleanupFunction } from '../../__internal__/types.js';

type CreateFileDialogOptions = {
	/**
	 * Whether to automatically clean up the event listeners or not.
	 * @note If set to `true`, you must call `createFileDialog` in the component initialization lifecycle.
	 * @default true
	 */
	autoCleanup?: boolean;
	/** @default '*' */
	accept?: string;
	/** @default false */
	multiple?: boolean;
	/**
	 * Triggers when the file selection changes.
	 * @default () => {}
	 */
	onChange?: (files: File[]) => void;
	/**
	 * Triggers when the dialog is closed.
	 * @default () => {}
	 */
	onCancel?: () => void;
};

type CreateFileDialogReturn = {
	/**
	 * A list of selected files.
	 * @reactive
	 */
	readonly files: File[];
	/** Opens the file dialog. */
	open: () => void;
	/** Resets the file dialog. */
	reset: () => void;
	/** Cleans up the input node and the event listeners. */
	cleanup: CleanupFunction;
};

/**
 * Creates a file dialog to interact with programatically.
 * @param options Additional options to customize the behavior.
 * @see https://svelte-librarian.github.io/sv-use/docs/core/browser/create-file-dialog
 */
export function createFileDialog(options: CreateFileDialogOptions = {}): CreateFileDialogReturn {
	const {
		autoCleanup = true,
		accept = '*',
		multiple = false,
		onChange = () => {},
		onCancel = () => {}
	} = options;

	let _files = $state<File[]>([]);
	let _input = $state<HTMLInputElement>();

	const cleanups: CleanupFunction[] = [];

	if (BROWSER) {
		_input = document.createElement('input');
		_input.type = 'file';
		_input.accept = accept;
		_input.multiple = multiple;

		cleanups.push(
			handleEventListener(_input, 'change', (event) => {
				_files = Array.from((event.currentTarget as EventTarget & HTMLInputElement).files ?? []);
				onChange(_files);
			}),
			handleEventListener(_input, 'cancel', () => {
				onCancel();
			})
		);
	}

	if (autoCleanup) {
		onDestroy(() => {
			cleanup();
		});
	}

	function open() {
		if (!_input) return;

		_input.click();
	}

	function reset() {
		_files = [];

		if (_input) {
			_input.value = '';
		}
	}

	function cleanup() {
		cleanups.forEach((fn) => fn());
		_input?.remove();
	}

	return {
		get files() {
			return _files;
		},
		open,
		reset,
		cleanup
	};
}
