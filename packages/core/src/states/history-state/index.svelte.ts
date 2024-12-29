type HistorySnapshot<T> = { snapshot: T; timestamp: number };

type HistoryStateReturn<T> = {
	current: T;
	readonly history: HistorySnapshot<T>[];
	undo(): void;
	redo(): void;
};

/**
 * A reactive state that allows for undo and redo operations by tracking the change history.
 * @param initial The initial value of the state.
 */
export function historyState<T>(initial: T): HistoryStateReturn<T> {
	const _history = $state<HistorySnapshot<T>[]>([]);
	const _undoHistory = $state<HistorySnapshot<T>[]>([]);

	let _current = $state<T>(initial);

	return {
		get current() {
			return _current;
		},
		set current(v: T) {
			_history.push({ snapshot: _current, timestamp: Date.now() });
			_current = v;
		},
		get history() {
			return _history;
		},
		undo() {
			if (_history.length > 0) {
				const snapshot = _history.pop()!;

				_undoHistory.push({ snapshot: _current, timestamp: Date.now() });
				_current = snapshot.snapshot;
			}
		},
		redo() {
			if (_undoHistory.length > 0) {
				const snapshot = _undoHistory.pop()!;

				_history.push({ snapshot: _current, timestamp: Date.now() });
				_current = snapshot.snapshot;
			}
		}
	};
}
