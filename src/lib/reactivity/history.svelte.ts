type HistorySnapshot<T> = { snapshot: T; timestamp: number };

export function historyState<T>(initial: T) {
	const _history = $state<HistorySnapshot<T>[]>([]);
	const _undoHistory = $state<HistorySnapshot<T>[]>([]);

	let _current = $state<T>(initial);

	$effect(() => {
		$inspect(_history);
	});

	return {
		get current() {
			return _current;
		},
		set current(v: T) {
			_current = v;
			_history.push({ snapshot: v, timestamp: Date.now() });
		},
		get history() {
			return _history;
		},
		undo() {
			if (_history.length > 0) {
				const snapshot = _history.pop()!;

				_current = snapshot.snapshot;
				_undoHistory.push(snapshot);
			}
		},
		redo() {
			if (_undoHistory.length > 0) {
				const snapshot = _undoHistory.pop()!;

				_current = snapshot.snapshot;
				_history.push(snapshot);
			}
		}
	};
}
