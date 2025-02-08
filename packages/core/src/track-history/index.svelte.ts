import { untrack } from 'svelte';
import { watch } from '../watch/index.svelte.js';
import type { Getter, Setter } from '../__internal__/types.js';

type HistorySnapshot<T> = { snapshot: T; timestamp: number };

export type TrackHistoryOptions = {
	/**
	 * Whether to include the current value in the history.
	 * @default false
	 */
	includeCurrent?: boolean;
};

export type TrackHistoryReturn<T> = {
	readonly canUndo: boolean;
	readonly canRedo: boolean;
	readonly history: HistorySnapshot<T>[];
	/** @note It gets cleared if the original value changes unless it was changed via {@link TrackHistoryReturn.undo | `undo`} or {@link TrackHistoryReturn.redo | `redo`}. */
	readonly redoHistory: HistorySnapshot<T>[];
	/** @note It doesn't do anything if {@link TrackHistoryReturn.canUndo | `canUndo`} is `false`. */
	undo(): void;
	/** @note It doesn't do anything if {@link TrackHistoryReturn.redo | `redo`} is `false`. */
	redo(): void;
};

/**
 * Tracks the change history of a reactive value.
 * @param value The value to track.
 * @param set The setter function to update the value.
 * @param options Additional options to customize the behavior.
 * @see https://svelte-librarian.github.io/sv-use/docs/core/track-history
 */
export function trackHistory<T>(
	value: Getter<T>,
	set: Setter<T>,
	options: TrackHistoryOptions = {}
): TrackHistoryReturn<T> {
	const { includeCurrent = false } = options;

	let _redoHistory = $state<HistorySnapshot<T>[]>([]);
	const _history = $state<HistorySnapshot<T>[]>([]);

	let event: 'change' | 'undo' | 'redo' = 'change';

	watch(
		() => value(),
		(curr, prev) => {
			if (event === 'change') {
				untrack(() => {
					_history.push({ snapshot: includeCurrent ? curr : prev!, timestamp: Date.now() });
					_redoHistory = [];
				});
			} else {
				event = 'change';
			}
		},
		{ runOnMounted: includeCurrent }
	);

	return {
		get canUndo() {
			if (includeCurrent) {
				return _history.length > 1;
			}

			return _history.length > 0;
		},
		get canRedo() {
			return _redoHistory.length > 0;
		},
		get history() {
			return _history;
		},
		get redoHistory() {
			return _redoHistory;
		},
		undo() {
			if (includeCurrent) {
				if (_history.length >= 2) {
					const snapshot = _history.at(-2)!;
					_history.pop();

					event = 'undo';
					_redoHistory.push({ snapshot: value(), timestamp: Date.now() });
					set(snapshot.snapshot);
				}
			} else {
				if (_history.length > 0) {
					const snapshot = _history.pop()!;

					event = 'undo';
					_redoHistory.push({ snapshot: value(), timestamp: Date.now() });
					set(snapshot.snapshot);
				}
			}
		},
		redo() {
			if (_redoHistory.length > 0) {
				const snapshot = _redoHistory.pop()!;

				event = 'redo';
				_history.push({ snapshot: value(), timestamp: Date.now() });
				set(snapshot.snapshot);
			}
		}
	};
}
