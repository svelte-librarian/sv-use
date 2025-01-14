import { onMount } from 'svelte';
import { handleEventListener } from '../handle-event-listener/index.svelte.js';

type CreateFileDialogOptions = {
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
};

/**
 * Creates a file dialog to interact with programatically.
 * @param options Additional options to customize the behavior.
 * @see https://svelte-librarian.github.io/sv-use/docs/core/browser/create-file-dialog
 */
export function createFileDialog(options: CreateFileDialogOptions = {}): CreateFileDialogReturn {
	const { accept = '*', multiple = false, onChange = () => {}, onCancel = () => {} } = options;

	let _files = $state<File[]>([]);
	let _input = $state<HTMLInputElement>();

	onMount(() => {
		_input = document.createElement('input');
		_input.type = 'file';
		_input.accept = accept;
		_input.multiple = multiple;

		const changeCleanup = handleEventListener(_input, 'change', (event) => {
			_files = Array.from((event.currentTarget as EventTarget & HTMLInputElement).files ?? []);
			onChange(_files);
		});

		const cancelCleanup = handleEventListener(_input, 'cancel', () => {
			onCancel();
		});

		return () => {
			changeCleanup();
			cancelCleanup();
		};
	});

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

	return {
		get files() {
			return _files;
		},
		open,
		reset
	};
}
