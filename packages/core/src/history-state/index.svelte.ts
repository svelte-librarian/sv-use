import {
	trackHistory,
	type TrackHistoryOptions,
	type TrackHistoryReturn
} from '../track-history/index.svelte.js';

type HistoryStateOptions = TrackHistoryOptions;
type HistoryStateReturn<T> = TrackHistoryReturn<T> & {
	current: T;
};

/**
 * A reactive state that allows for undo and redo operations by tracking the change history.
 * @param initial The initial value of the state.
 * @see https://svelte-librarian.github.io/sv-use/docs/core/history-state
 */
export function historyState<T>(
	initial: T,
	options: HistoryStateOptions = {}
): HistoryStateReturn<T> {
	const { includeCurrent = false } = options;

	const _state = $state({ current: initial });
	const _history = trackHistory(
		() => $state.snapshot(_state.current) as T,
		(v) => (_state.current = v),
		{ includeCurrent }
	);

	const handler: ProxyHandler<{ current: T }> = {
		get(target: Record<string, unknown>, key: string) {
			if (
				target &&
				typeof target === 'object' &&
				typeof target[key] === 'object' &&
				target[key] !== null
			) {
				return new Proxy(target[key], handler);
			} else {
				return target[key];
			}
		},
		set(target: Record<string, unknown>, key: string, value: unknown) {
			target[key] = value;

			return true;
		}
	};

	return {
		get current() {
			return new Proxy(_state, handler).current;
		},
		set current(v: T) {
			_state.current = v;
		},
		get canUndo() {
			return _history.canUndo;
		},
		get canRedo() {
			return _history.canRedo;
		},
		get history() {
			return _history.history;
		},
		get redoHistory() {
			return _history.redoHistory;
		},
		undo() {
			return _history.undo();
		},
		redo() {
			return _history.redo();
		}
	};
}
