import { onDestroy, untrack } from 'svelte';
import { observeMutation } from '../observe-mutation/index.svelte.js';
import { defaultDocument, type ConfigurableDocument } from '../__internal__/configurable.js';
import { noop, normalizeValue } from '../__internal__/utils.svelte.js';
import type { CleanupFunction, MaybeElement, MaybeGetter } from '../__internal__/types.js';

type GetTextDirectionValue = 'auto' | 'ltr' | 'rtl';

interface GetTextDirectionOptions extends ConfigurableDocument {
	/**
	 * Whether to auto-cleanup the observer or not.
	 *
	 * If set to `true`, it must run in the component initialization lifecycle.
	 * @default true
	 */
	autoCleanup?: boolean;
	/**
	 * The element on which to control the text direction.
	 * @default document.documentElement
	 */
	element?: MaybeGetter<MaybeElement>;
	/**
	 * Whether to observe changes on the element via the `Mutation Observer API`.
	 * @default false
	 */
	observe?: boolean;
	/**
	 * The initial direction of the element.
	 * @note This value is discarded if the `dir` property already exists on the element and `override` is set to `false`.
	 * @default 'ltr'
	 */
	initial?: GetTextDirectionValue | null;
}

type GetTextDirectionReturn = {
	current: GetTextDirectionValue;
	/**
	 * Removes the attribute from the element while not changing the `current` property.
	 * @note If `observe` is `true`, `current` will be set to `initial`.
	 */
	removeAttribute: () => void;
	cleanup: CleanupFunction;
};

/**
 * Indicates the text writing directionality of the content of an element.
 * @param options Additional options to customize the behavior.
 * @see https://svelte-librarian.github.io/sv-use/docs/core/get-text-direction
 */
export function getTextDirection(options: GetTextDirectionOptions = {}): GetTextDirectionReturn {
	const {
		element = undefined,
		observe = false,
		initial = 'ltr',
		autoCleanup = true,
		document = defaultDocument
	} = options;

	let cleanup: CleanupFunction = noop;

	const _element = $derived(element ? normalizeValue(element) : document?.documentElement);
	let current = $state<GetTextDirectionValue>(getValue());

	// Instead of onMount so we can test the utility
	$effect(() => {
		untrack(() => {
			current = getValue();
		});
	});

	if (observe && document) {
		cleanup = observeMutation(
			() => _element,
			() => (current = getValue()),
			{ attributes: true, autoCleanup }
		).cleanup;
	}

	if (autoCleanup) {
		onDestroy(() => cleanup());
	}

	function getValue() {
		return (_element?.getAttribute('dir') ?? initial) as GetTextDirectionValue;
	}

	function removeAttribute() {
		_element?.removeAttribute('dir');
	}

	return {
		get current() {
			return current;
		},
		set current(v) {
			current = v;

			_element?.setAttribute('dir', current);
		},
		removeAttribute,
		cleanup
	};
}
