import { onMount } from 'svelte';
import { defaultWindow } from '../__internal__/configurable.js';
import { normalizeValue } from '../__internal__/utils.svelte.js';
import { observeResize, type ObserveResizeOptions } from '../observe-resize/index.svelte.js';
import type { MaybeGetter } from '../__internal__/types.js';

export interface ElementSize {
	width: number;
	height: number;
}

interface GetElementSizeOptions extends Omit<ObserveResizeOptions, 'autoCleanup'> {
	/**
	 * The initial size of the element.
	 * @default { width: 0, height: 0 }
	 */
	initialSize?: ElementSize;
}

type GetElementSizeReturn = {
	readonly width: number;
	readonly height: number;
};

/**
 * Tracks the size of an element.
 * @param element The element to track.
 * @param options Additional options to customize the behavior.
 * @see https://svelte-librarian.github.io/sv-use/docs/core/elements/get-element-size
 */
export function getElementSize(
	element: MaybeGetter<HTMLElement | undefined>,
	options: GetElementSizeOptions = {}
): GetElementSizeReturn {
	const {
		box = 'content-box',
		initialSize = { width: 0, height: 0 },
		window = defaultWindow
	} = options;

	let width = $state(initialSize.width);
	let height = $state(initialSize.height);

	const _element = $derived(normalizeValue(element));
	const isSVG = $derived(_element?.namespaceURI?.includes('svg'));

	onMount(() => {
		if (_element) {
			width = 'offsetWidth' in _element ? _element.offsetWidth : initialSize.width;
			height = 'offsetHeight' in _element ? _element.offsetHeight : initialSize.height;
		}
	});

	$effect(() => {
		width = _element ? initialSize.width : 0;
		height = _element ? initialSize.height : 0;
	});

	observeResize(
		element,
		([entry]) => {
			const boxSize =
				box === 'border-box'
					? entry.borderBoxSize
					: box === 'content-box'
						? entry.contentBoxSize
						: entry.devicePixelContentBoxSize;

			if (window && isSVG && _element) {
				const rect = _element.getBoundingClientRect();
				width = rect.width;
				height = rect.height;
			} else {
				if (boxSize) {
					console.log(boxSize);
					width = boxSize.reduce((acc, { inlineSize }) => acc + inlineSize, 0);
					height = boxSize.reduce((acc, { blockSize }) => acc + blockSize, 0);

					console.log(width);
				} else {
					width = entry.contentRect.width;
					height = entry.contentRect.height;
				}
			}
		},
		options
	);

	return {
		get width() {
			return width;
		},
		get height() {
			return height;
		}
	};
}
