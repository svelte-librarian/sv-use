import { normalizeValue } from '../__internal__/utils.svelte.js';
import type { CleanupFunction, MaybeGetter } from '../__internal__/types.js';

type CreateObjectUrlReturn = {
	readonly current: string | null;
	cleanup: CleanupFunction;
};

/**
 * Creates a reactive URL representing the given object.
 * @param object The object to generate the url for.
 * @see https://svelte-librarian.github.io/sv-use/docs/create-object-url
 */
export function createObjectUrl(
	object: MaybeGetter<Blob | MediaSource | null | undefined>
): CreateObjectUrlReturn {
	let current = $state<string | null>(null);
	const _object = $derived(normalizeValue(object));

	$effect(() => {
		if (_object) {
			current = URL.createObjectURL(_object);
		}

		return cleanup;
	});

	function cleanup() {
		if (current) {
			URL.revokeObjectURL(current);
		}

		current = null;
	}

	return {
		get current() {
			return current;
		},
		cleanup
	};
}
