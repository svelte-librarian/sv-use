import { describe, expect, it } from 'vitest';
import { trackHistory } from './index.svelte.js';
import { flushSync } from 'svelte';

describe("Doesn't account for the current value in the history", () => {
	describe('Works with primitives', () => {
		it('Tracks the history correctly with one change', () => {
			const cleanup = $effect.root(() => {
				let counter = $state(0);
				const history = trackHistory(
					() => counter,
					(v) => (counter = v)
				);

				expect(history.history.length).toBe(0);
				expect(history.redoHistory.length).toBe(0);
				expect(history.canUndo).toBe(false);
				expect(history.canRedo).toBe(false);

				flushSync(() => {
					counter = 1;
				});

				expect(history.history.length).toBe(1);
				expect(history.redoHistory.length).toBe(0);
				expect(history.canUndo).toBe(true);
				expect(history.canRedo).toBe(false);
			});

			cleanup();
		});

		it('Tracks the history correctly with multiple changes', () => {
			const cleanup = $effect.root(() => {
				let counter = $state(0);
				const history = trackHistory(
					() => counter,
					(v) => (counter = v)
				);

				expect(history.history.length).toBe(0);
				expect(history.redoHistory.length).toBe(0);
				expect(history.canUndo).toBe(false);
				expect(history.canRedo).toBe(false);

				flushSync(() => {
					counter = 1;
				});

				flushSync(() => {
					counter = 2;
				});

				expect(history.history.length).toBe(2);
				expect(history.redoHistory.length).toBe(0);
				expect(history.canUndo).toBe(true);
				expect(history.canRedo).toBe(false);
			});

			cleanup();
		});

		it('Undoes correctly', () => {
			const cleanup = $effect.root(() => {
				let counter = $state(0);
				const history = trackHistory(
					() => counter,
					(v) => (counter = v)
				);

				expect(history.history.length).toBe(0);
				expect(history.redoHistory.length).toBe(0);
				expect(history.canUndo).toBe(false);
				expect(history.canRedo).toBe(false);

				flushSync(() => {
					counter = 1;
				});

				flushSync(() => {
					counter = 2;
				});

				expect(history.history.length).toBe(2);
				expect(history.redoHistory.length).toBe(0);
				expect(history.canUndo).toBe(true);
				expect(history.canRedo).toBe(false);

				history.undo();

				expect(history.history.length).toBe(1);
				expect(history.redoHistory.length).toBe(1);
				expect(history.canUndo).toBe(true);
				expect(history.canRedo).toBe(true);

				history.undo();

				expect(history.history.length).toBe(0);
				expect(history.redoHistory.length).toBe(2);
				expect(history.canUndo).toBe(false);
				expect(history.canRedo).toBe(true);
			});

			cleanup();
		});

		it('Redoes correctly', () => {
			const cleanup = $effect.root(() => {
				let counter = $state(0);
				const history = trackHistory(
					() => counter,
					(v) => (counter = v)
				);

				expect(history.history.length).toBe(0);
				expect(history.redoHistory.length).toBe(0);
				expect(history.canUndo).toBe(false);
				expect(history.canRedo).toBe(false);

				flushSync(() => {
					counter = 1;
				});

				flushSync(() => {
					counter = 2;
				});

				expect(history.history.length).toBe(2);
				expect(history.redoHistory.length).toBe(0);
				expect(history.canUndo).toBe(true);
				expect(history.canRedo).toBe(false);

				history.undo();

				expect(history.history.length).toBe(1);
				expect(history.redoHistory.length).toBe(1);
				expect(history.canUndo).toBe(true);
				expect(history.canRedo).toBe(true);

				history.redo();

				expect(history.history.length).toBe(2);
				expect(history.redoHistory.length).toBe(0);
				expect(history.canUndo).toBe(true);
				expect(history.canRedo).toBe(false);
			});

			cleanup();
		});
	});

	describe('Works with objects', () => {
		it('Tracks the history correctly with one change', () => {
			const cleanup = $effect.root(() => {
				let counter = $state({ value: 0 });
				const history = trackHistory(
					() => counter,
					(v) => (counter = v)
				);

				expect(history.history.length).toBe(0);
				expect(history.redoHistory.length).toBe(0);
				expect(history.canUndo).toBe(false);
				expect(history.canRedo).toBe(false);

				flushSync(() => {
					counter = { value: 1 };
				});

				expect(history.history.length).toBe(1);
				expect(history.redoHistory.length).toBe(0);
				expect(history.canUndo).toBe(true);
				expect(history.canRedo).toBe(false);
			});

			cleanup();
		});

		it('Tracks the history correctly with multiple changes', () => {
			const cleanup = $effect.root(() => {
				let counter = $state({ value: 0 });
				const history = trackHistory(
					() => counter,
					(v) => (counter = v)
				);

				expect(history.history.length).toBe(0);
				expect(history.redoHistory.length).toBe(0);
				expect(history.canUndo).toBe(false);
				expect(history.canRedo).toBe(false);

				flushSync(() => {
					counter = { value: 1 };
				});

				flushSync(() => {
					counter = { value: 2 };
				});

				expect(history.history.length).toBe(2);
				expect(history.redoHistory.length).toBe(0);
				expect(history.canUndo).toBe(true);
				expect(history.canRedo).toBe(false);
			});

			cleanup();
		});

		it('Undoes correctly', () => {
			const cleanup = $effect.root(() => {
				let counter = $state({ value: 0 });
				const history = trackHistory(
					() => counter,
					(v) => (counter = v)
				);

				expect(history.history.length).toBe(0);
				expect(history.redoHistory.length).toBe(0);
				expect(history.canUndo).toBe(false);
				expect(history.canRedo).toBe(false);

				flushSync(() => {
					counter = { value: 1 };
				});

				flushSync(() => {
					counter = { value: 2 };
				});

				expect(history.history.length).toBe(2);
				expect(history.redoHistory.length).toBe(0);
				expect(history.canUndo).toBe(true);
				expect(history.canRedo).toBe(false);

				history.undo();

				expect(history.history.length).toBe(1);
				expect(history.redoHistory.length).toBe(1);
				expect(history.canUndo).toBe(true);
				expect(history.canRedo).toBe(true);

				history.undo();

				expect(history.history.length).toBe(0);
				expect(history.redoHistory.length).toBe(2);
				expect(history.canUndo).toBe(false);
				expect(history.canRedo).toBe(true);
			});

			cleanup();
		});

		it('Redoes correctly', () => {
			const cleanup = $effect.root(() => {
				let counter = $state({ value: 0 });
				const history = trackHistory(
					() => counter,
					(v) => (counter = v)
				);

				expect(history.history.length).toBe(0);
				expect(history.redoHistory.length).toBe(0);
				expect(history.canUndo).toBe(false);
				expect(history.canRedo).toBe(false);

				flushSync(() => {
					counter = { value: 1 };
				});

				flushSync(() => {
					counter = { value: 2 };
				});

				expect(history.history.length).toBe(2);
				expect(history.redoHistory.length).toBe(0);
				expect(history.canUndo).toBe(true);
				expect(history.canRedo).toBe(false);

				history.undo();

				expect(history.history.length).toBe(1);
				expect(history.redoHistory.length).toBe(1);
				expect(history.canUndo).toBe(true);
				expect(history.canRedo).toBe(true);

				history.redo();

				expect(history.history.length).toBe(2);
				expect(history.redoHistory.length).toBe(0);
				expect(history.canUndo).toBe(true);
				expect(history.canRedo).toBe(false);
			});

			cleanup();
		});
	});

	describe('Works with property assignment on objects', () => {
		it('Tracks the history correctly with one change', () => {
			const cleanup = $effect.root(() => {
				let counter = $state({ value: 0 });
				const history = trackHistory(
					() => $state.snapshot(counter),
					(v) => (counter = v)
				);

				expect(history.history.length).toBe(0);
				expect(history.redoHistory.length).toBe(0);
				expect(history.canUndo).toBe(false);
				expect(history.canRedo).toBe(false);

				flushSync(() => {
					counter.value = 1;
				});

				expect(history.history.length).toBe(1);
				expect(history.redoHistory.length).toBe(0);
				expect(history.canUndo).toBe(true);
				expect(history.canRedo).toBe(false);
			});

			cleanup();
		});

		it('Tracks the history correctly with multiple changes', () => {
			const cleanup = $effect.root(() => {
				let counter = $state({ value: 0 });
				const history = trackHistory(
					() => counter,
					(v) => (counter = v)
				);

				expect(history.history.length).toBe(0);
				expect(history.redoHistory.length).toBe(0);
				expect(history.canUndo).toBe(false);
				expect(history.canRedo).toBe(false);

				flushSync(() => {
					counter = { value: 1 };
				});

				flushSync(() => {
					counter = { value: 2 };
				});

				expect(history.history.length).toBe(2);
				expect(history.redoHistory.length).toBe(0);
				expect(history.canUndo).toBe(true);
				expect(history.canRedo).toBe(false);
			});

			cleanup();
		});

		it('Undoes correctly', () => {
			const cleanup = $effect.root(() => {
				let counter = $state({ value: 0 });
				const history = trackHistory(
					() => counter,
					(v) => (counter = v)
				);

				expect(history.history.length).toBe(0);
				expect(history.redoHistory.length).toBe(0);
				expect(history.canUndo).toBe(false);
				expect(history.canRedo).toBe(false);

				flushSync(() => {
					counter = { value: 1 };
				});

				flushSync(() => {
					counter = { value: 2 };
				});

				expect(history.history.length).toBe(2);
				expect(history.redoHistory.length).toBe(0);
				expect(history.canUndo).toBe(true);
				expect(history.canRedo).toBe(false);

				history.undo();

				expect(history.history.length).toBe(1);
				expect(history.redoHistory.length).toBe(1);
				expect(history.canUndo).toBe(true);
				expect(history.canRedo).toBe(true);

				history.undo();

				expect(history.history.length).toBe(0);
				expect(history.redoHistory.length).toBe(2);
				expect(history.canUndo).toBe(false);
				expect(history.canRedo).toBe(true);
			});

			cleanup();
		});

		it('Redoes correctly', () => {
			const cleanup = $effect.root(() => {
				let counter = $state({ value: 0 });
				const history = trackHistory(
					() => counter,
					(v) => (counter = v)
				);

				expect(history.history.length).toBe(0);
				expect(history.redoHistory.length).toBe(0);
				expect(history.canUndo).toBe(false);
				expect(history.canRedo).toBe(false);

				flushSync(() => {
					counter = { value: 1 };
				});

				flushSync(() => {
					counter = { value: 2 };
				});

				expect(history.history.length).toBe(2);
				expect(history.redoHistory.length).toBe(0);
				expect(history.canUndo).toBe(true);
				expect(history.canRedo).toBe(false);

				history.undo();

				expect(history.history.length).toBe(1);
				expect(history.redoHistory.length).toBe(1);
				expect(history.canUndo).toBe(true);
				expect(history.canRedo).toBe(true);

				history.redo();

				expect(history.history.length).toBe(2);
				expect(history.redoHistory.length).toBe(0);
				expect(history.canUndo).toBe(true);
				expect(history.canRedo).toBe(false);
			});

			cleanup();
		});
	});

	describe('Works with arrays', () => {
		it('Tracks the history correctly with one change', () => {
			const cleanup = $effect.root(() => {
				let counter = $state([0]);
				const history = trackHistory(
					() => counter,
					(v) => (counter = v)
				);

				expect(history.history.length).toBe(0);
				expect(history.redoHistory.length).toBe(0);
				expect(history.canUndo).toBe(false);
				expect(history.canRedo).toBe(false);

				flushSync(() => {
					counter = [1];
				});

				expect(history.history.length).toBe(1);
				expect(history.redoHistory.length).toBe(0);
				expect(history.canUndo).toBe(true);
				expect(history.canRedo).toBe(false);
			});

			cleanup();
		});

		it('Tracks the history correctly with multiple changes', () => {
			const cleanup = $effect.root(() => {
				let counter = $state([0]);
				const history = trackHistory(
					() => counter,
					(v) => (counter = v)
				);

				expect(history.history.length).toBe(0);
				expect(history.redoHistory.length).toBe(0);
				expect(history.canUndo).toBe(false);
				expect(history.canRedo).toBe(false);

				flushSync(() => {
					counter = [1];
				});

				flushSync(() => {
					counter = [2];
				});

				expect(history.history.length).toBe(2);
				expect(history.redoHistory.length).toBe(0);
				expect(history.canUndo).toBe(true);
				expect(history.canRedo).toBe(false);
			});

			cleanup();
		});

		it('Undoes correctly', () => {
			const cleanup = $effect.root(() => {
				let counter = $state([0]);
				const history = trackHistory(
					() => counter,
					(v) => (counter = v)
				);

				expect(history.history.length).toBe(0);
				expect(history.redoHistory.length).toBe(0);
				expect(history.canUndo).toBe(false);
				expect(history.canRedo).toBe(false);

				flushSync(() => {
					counter = [1];
				});

				flushSync(() => {
					counter = [2];
				});

				expect(history.history.length).toBe(2);
				expect(history.redoHistory.length).toBe(0);
				expect(history.canUndo).toBe(true);
				expect(history.canRedo).toBe(false);

				history.undo();

				expect(history.history.length).toBe(1);
				expect(history.redoHistory.length).toBe(1);
				expect(history.canUndo).toBe(true);
				expect(history.canRedo).toBe(true);

				history.undo();

				expect(history.history.length).toBe(0);
				expect(history.redoHistory.length).toBe(2);
				expect(history.canUndo).toBe(false);
				expect(history.canRedo).toBe(true);
			});

			cleanup();
		});

		it('Redoes correctly', () => {
			const cleanup = $effect.root(() => {
				let counter = $state([0]);
				const history = trackHistory(
					() => counter,
					(v) => (counter = v)
				);

				expect(history.history.length).toBe(0);
				expect(history.redoHistory.length).toBe(0);
				expect(history.canUndo).toBe(false);
				expect(history.canRedo).toBe(false);

				flushSync(() => {
					counter = [1];
				});

				flushSync(() => {
					counter = [2];
				});

				expect(history.history.length).toBe(2);
				expect(history.redoHistory.length).toBe(0);
				expect(history.canUndo).toBe(true);
				expect(history.canRedo).toBe(false);

				history.undo();

				expect(history.history.length).toBe(1);
				expect(history.redoHistory.length).toBe(1);
				expect(history.canUndo).toBe(true);
				expect(history.canRedo).toBe(true);

				history.redo();

				expect(history.history.length).toBe(2);
				expect(history.redoHistory.length).toBe(0);
				expect(history.canUndo).toBe(true);
				expect(history.canRedo).toBe(false);
			});

			cleanup();
		});
	});

	describe('Works with arrays methods', () => {
		it('Tracks the history correctly with one change', () => {
			const cleanup = $effect.root(() => {
				let counter = $state([0]);
				const history = trackHistory(
					() => $state.snapshot(counter),
					(v) => (counter = v)
				);

				expect(history.history.length).toBe(0);
				expect(history.redoHistory.length).toBe(0);
				expect(history.canUndo).toBe(false);
				expect(history.canRedo).toBe(false);

				flushSync(() => {
					counter.push(1);
				});

				expect(history.history.length).toBe(1);
				expect(history.redoHistory.length).toBe(0);
				expect(history.canUndo).toBe(true);
				expect(history.canRedo).toBe(false);
			});

			cleanup();
		});

		it('Tracks the history correctly with multiple changes', () => {
			const cleanup = $effect.root(() => {
				let counter = $state([0]);
				const history = trackHistory(
					() => $state.snapshot(counter),
					(v) => (counter = v)
				);

				expect(history.history.length).toBe(0);
				expect(history.redoHistory.length).toBe(0);
				expect(history.canUndo).toBe(false);
				expect(history.canRedo).toBe(false);

				flushSync(() => {
					counter.push(1);
				});

				flushSync(() => {
					counter.push(2);
				});

				expect(history.history.length).toBe(2);
				expect(history.redoHistory.length).toBe(0);
				expect(history.canUndo).toBe(true);
				expect(history.canRedo).toBe(false);
			});

			cleanup();
		});

		it('Undoes correctly', () => {
			const cleanup = $effect.root(() => {
				let counter = $state([0]);
				const history = trackHistory(
					() => $state.snapshot(counter),
					(v) => (counter = v)
				);

				expect(history.history.length).toBe(0);
				expect(history.redoHistory.length).toBe(0);
				expect(history.canUndo).toBe(false);
				expect(history.canRedo).toBe(false);

				flushSync(() => {
					counter.push(1);
				});

				flushSync(() => {
					counter.push(2);
				});

				expect(history.history.length).toBe(2);
				expect(history.redoHistory.length).toBe(0);
				expect(history.canUndo).toBe(true);
				expect(history.canRedo).toBe(false);

				history.undo();

				expect(history.history.length).toBe(1);
				expect(history.redoHistory.length).toBe(1);
				expect(history.canUndo).toBe(true);
				expect(history.canRedo).toBe(true);

				history.undo();

				expect(history.history.length).toBe(0);
				expect(history.redoHistory.length).toBe(2);
				expect(history.canUndo).toBe(false);
				expect(history.canRedo).toBe(true);
			});

			cleanup();
		});

		it('Redoes correctly', () => {
			const cleanup = $effect.root(() => {
				let counter = $state([0]);
				const history = trackHistory(
					() => $state.snapshot(counter),
					(v) => (counter = v)
				);

				expect(history.history.length).toBe(0);
				expect(history.redoHistory.length).toBe(0);
				expect(history.canUndo).toBe(false);
				expect(history.canRedo).toBe(false);

				flushSync(() => {
					counter.push(1);
				});

				flushSync(() => {
					counter.push(2);
				});

				expect(history.history.length).toBe(2);
				expect(history.redoHistory.length).toBe(0);
				expect(history.canUndo).toBe(true);
				expect(history.canRedo).toBe(false);

				history.undo();

				expect(history.history.length).toBe(1);
				expect(history.redoHistory.length).toBe(1);
				expect(history.canUndo).toBe(true);
				expect(history.canRedo).toBe(true);

				history.redo();

				expect(history.history.length).toBe(2);
				expect(history.redoHistory.length).toBe(0);
				expect(history.canUndo).toBe(true);
				expect(history.canRedo).toBe(false);
			});

			cleanup();
		});
	});
});

describe('Accounts for the current value in the history', () => {
	describe('Works with primitives', () => {
		it('Tracks the history correctly with one change', () => {
			const cleanup = $effect.root(() => {
				let counter = $state(0);
				const history = trackHistory(
					() => counter,
					(v) => (counter = v),
					{ includeCurrent: true }
				);

				flushSync();

				expect(history.history.length).toBe(1);
				expect(history.redoHistory.length).toBe(0);
				expect(history.canUndo).toBe(false);
				expect(history.canRedo).toBe(false);

				flushSync(() => {
					counter = 1;
				});

				expect(history.history.length).toBe(2);
				expect(history.redoHistory.length).toBe(0);
				expect(history.canUndo).toBe(true);
				expect(history.canRedo).toBe(false);
			});

			cleanup();
		});

		it('Tracks the history correctly with multiple changes', () => {
			const cleanup = $effect.root(() => {
				let counter = $state(0);
				const history = trackHistory(
					() => counter,
					(v) => (counter = v),
					{ includeCurrent: true }
				);

				flushSync();

				expect(history.history.length).toBe(1);
				expect(history.redoHistory.length).toBe(0);
				expect(history.canUndo).toBe(false);
				expect(history.canRedo).toBe(false);

				flushSync(() => {
					counter = 1;
				});

				flushSync(() => {
					counter = 2;
				});

				expect(history.history.length).toBe(3);
				expect(history.redoHistory.length).toBe(0);
				expect(history.canUndo).toBe(true);
				expect(history.canRedo).toBe(false);
			});

			cleanup();
		});

		it('Undoes correctly', () => {
			const cleanup = $effect.root(() => {
				let counter = $state(0);
				const history = trackHistory(
					() => counter,
					(v) => (counter = v),
					{ includeCurrent: true }
				);

				flushSync();

				expect(history.history.length).toBe(1);
				expect(history.redoHistory.length).toBe(0);
				expect(history.canUndo).toBe(false);
				expect(history.canRedo).toBe(false);

				flushSync(() => {
					counter = 1;
				});

				flushSync(() => {
					counter = 2;
				});

				expect(history.history.length).toBe(3);
				expect(history.redoHistory.length).toBe(0);
				expect(history.canUndo).toBe(true);
				expect(history.canRedo).toBe(false);

				history.undo();

				expect(history.history.length).toBe(2);
				expect(history.redoHistory.length).toBe(1);
				expect(history.canUndo).toBe(true);
				expect(history.canRedo).toBe(true);

				history.undo();

				expect(history.history.length).toBe(1);
				expect(history.redoHistory.length).toBe(2);
				expect(history.canUndo).toBe(false);
				expect(history.canRedo).toBe(true);
			});

			cleanup();
		});

		it('Redoes correctly', () => {
			const cleanup = $effect.root(() => {
				let counter = $state(0);
				const history = trackHistory(
					() => counter,
					(v) => (counter = v),
					{ includeCurrent: true }
				);

				flushSync();

				expect(history.history.length).toBe(1);
				expect(history.redoHistory.length).toBe(0);
				expect(history.canUndo).toBe(false);
				expect(history.canRedo).toBe(false);

				flushSync(() => {
					counter = 1;
				});

				flushSync(() => {
					counter = 2;
				});

				expect(history.history.length).toBe(3);
				expect(history.redoHistory.length).toBe(0);
				expect(history.canUndo).toBe(true);
				expect(history.canRedo).toBe(false);

				history.undo();

				expect(history.history.length).toBe(2);
				expect(history.redoHistory.length).toBe(1);
				expect(history.canUndo).toBe(true);
				expect(history.canRedo).toBe(true);

				history.redo();

				expect(history.history.length).toBe(3);
				expect(history.redoHistory.length).toBe(0);
				expect(history.canUndo).toBe(true);
				expect(history.canRedo).toBe(false);
			});

			cleanup();
		});
	});

	describe('Works with objects', () => {
		it('Tracks the history correctly with one change', () => {
			const cleanup = $effect.root(() => {
				let counter = $state({ value: 0 });
				const history = trackHistory(
					() => counter,
					(v) => (counter = v),
					{ includeCurrent: true }
				);

				flushSync();

				expect(history.history.length).toBe(1);
				expect(history.redoHistory.length).toBe(0);
				expect(history.canUndo).toBe(false);
				expect(history.canRedo).toBe(false);

				flushSync(() => {
					counter = { value: 1 };
				});

				expect(history.history.length).toBe(2);
				expect(history.redoHistory.length).toBe(0);
				expect(history.canUndo).toBe(true);
				expect(history.canRedo).toBe(false);
			});

			cleanup();
		});

		it('Tracks the history correctly with multiple changes', () => {
			const cleanup = $effect.root(() => {
				let counter = $state({ value: 0 });
				const history = trackHistory(
					() => counter,
					(v) => (counter = v),
					{ includeCurrent: true }
				);

				flushSync();

				expect(history.history.length).toBe(1);
				expect(history.redoHistory.length).toBe(0);
				expect(history.canUndo).toBe(false);
				expect(history.canRedo).toBe(false);

				flushSync(() => {
					counter = { value: 1 };
				});

				flushSync(() => {
					counter = { value: 2 };
				});

				expect(history.history.length).toBe(3);
				expect(history.redoHistory.length).toBe(0);
				expect(history.canUndo).toBe(true);
				expect(history.canRedo).toBe(false);
			});

			cleanup();
		});

		it('Undoes correctly', () => {
			const cleanup = $effect.root(() => {
				let counter = $state({ value: 0 });
				const history = trackHistory(
					() => counter,
					(v) => (counter = v),
					{ includeCurrent: true }
				);

				flushSync();

				expect(history.history.length).toBe(1);
				expect(history.redoHistory.length).toBe(0);
				expect(history.canUndo).toBe(false);
				expect(history.canRedo).toBe(false);

				flushSync(() => {
					counter = { value: 1 };
				});

				flushSync(() => {
					counter = { value: 2 };
				});

				expect(history.history.length).toBe(3);
				expect(history.redoHistory.length).toBe(0);
				expect(history.canUndo).toBe(true);
				expect(history.canRedo).toBe(false);

				history.undo();

				expect(history.history.length).toBe(2);
				expect(history.redoHistory.length).toBe(1);
				expect(history.canUndo).toBe(true);
				expect(history.canRedo).toBe(true);

				history.undo();

				expect(history.history.length).toBe(1);
				expect(history.redoHistory.length).toBe(2);
				expect(history.canUndo).toBe(false);
				expect(history.canRedo).toBe(true);
			});

			cleanup();
		});

		it('Redoes correctly', () => {
			const cleanup = $effect.root(() => {
				let counter = $state({ value: 0 });
				const history = trackHistory(
					() => counter,
					(v) => (counter = v),
					{ includeCurrent: true }
				);

				flushSync();

				expect(history.history.length).toBe(1);
				expect(history.redoHistory.length).toBe(0);
				expect(history.canUndo).toBe(false);
				expect(history.canRedo).toBe(false);

				flushSync(() => {
					counter = { value: 1 };
				});

				flushSync(() => {
					counter = { value: 2 };
				});

				expect(history.history.length).toBe(3);
				expect(history.redoHistory.length).toBe(0);
				expect(history.canUndo).toBe(true);
				expect(history.canRedo).toBe(false);

				history.undo();

				expect(history.history.length).toBe(2);
				expect(history.redoHistory.length).toBe(1);
				expect(history.canUndo).toBe(true);
				expect(history.canRedo).toBe(true);

				history.redo();

				expect(history.history.length).toBe(3);
				expect(history.redoHistory.length).toBe(0);
				expect(history.canUndo).toBe(true);
				expect(history.canRedo).toBe(false);
			});

			cleanup();
		});
	});

	describe('Works with property assignment on objects', () => {
		it('Tracks the history correctly with one change', () => {
			const cleanup = $effect.root(() => {
				let counter = $state({ value: 0 });
				const history = trackHistory(
					() => $state.snapshot(counter),
					(v) => (counter = v),
					{ includeCurrent: true }
				);

				flushSync();

				expect(history.history.length).toBe(1);
				expect(history.redoHistory.length).toBe(0);
				expect(history.canUndo).toBe(false);
				expect(history.canRedo).toBe(false);

				flushSync(() => {
					counter.value = 1;
				});

				expect(history.history.length).toBe(2);
				expect(history.redoHistory.length).toBe(0);
				expect(history.canUndo).toBe(true);
				expect(history.canRedo).toBe(false);
			});

			cleanup();
		});

		it('Tracks the history correctly with multiple changes', () => {
			const cleanup = $effect.root(() => {
				let counter = $state({ value: 0 });
				const history = trackHistory(
					() => counter,
					(v) => (counter = v),
					{ includeCurrent: true }
				);

				flushSync();

				expect(history.history.length).toBe(1);
				expect(history.redoHistory.length).toBe(0);
				expect(history.canUndo).toBe(false);
				expect(history.canRedo).toBe(false);

				flushSync(() => {
					counter = { value: 1 };
				});

				flushSync(() => {
					counter = { value: 2 };
				});

				expect(history.history.length).toBe(3);
				expect(history.redoHistory.length).toBe(0);
				expect(history.canUndo).toBe(true);
				expect(history.canRedo).toBe(false);
			});

			cleanup();
		});

		it('Undoes correctly', () => {
			const cleanup = $effect.root(() => {
				let counter = $state({ value: 0 });
				const history = trackHistory(
					() => counter,
					(v) => (counter = v),
					{ includeCurrent: true }
				);

				flushSync();

				expect(history.history.length).toBe(1);
				expect(history.redoHistory.length).toBe(0);
				expect(history.canUndo).toBe(false);
				expect(history.canRedo).toBe(false);

				flushSync(() => {
					counter = { value: 1 };
				});

				flushSync(() => {
					counter = { value: 2 };
				});

				expect(history.history.length).toBe(3);
				expect(history.redoHistory.length).toBe(0);
				expect(history.canUndo).toBe(true);
				expect(history.canRedo).toBe(false);

				history.undo();

				expect(history.history.length).toBe(2);
				expect(history.redoHistory.length).toBe(1);
				expect(history.canUndo).toBe(true);
				expect(history.canRedo).toBe(true);

				history.undo();

				expect(history.history.length).toBe(1);
				expect(history.redoHistory.length).toBe(2);
				expect(history.canUndo).toBe(false);
				expect(history.canRedo).toBe(true);
			});

			cleanup();
		});

		it('Redoes correctly', () => {
			const cleanup = $effect.root(() => {
				let counter = $state({ value: 0 });
				const history = trackHistory(
					() => counter,
					(v) => (counter = v),
					{ includeCurrent: true }
				);

				flushSync();

				expect(history.history.length).toBe(1);
				expect(history.redoHistory.length).toBe(0);
				expect(history.canUndo).toBe(false);
				expect(history.canRedo).toBe(false);

				flushSync(() => {
					counter = { value: 1 };
				});

				flushSync(() => {
					counter = { value: 2 };
				});

				expect(history.history.length).toBe(3);
				expect(history.redoHistory.length).toBe(0);
				expect(history.canUndo).toBe(true);
				expect(history.canRedo).toBe(false);

				history.undo();

				expect(history.history.length).toBe(2);
				expect(history.redoHistory.length).toBe(1);
				expect(history.canUndo).toBe(true);
				expect(history.canRedo).toBe(true);

				history.redo();

				expect(history.history.length).toBe(3);
				expect(history.redoHistory.length).toBe(0);
				expect(history.canUndo).toBe(true);
				expect(history.canRedo).toBe(false);
			});

			cleanup();
		});
	});

	describe('Works with arrays', () => {
		it('Tracks the history correctly with one change', () => {
			const cleanup = $effect.root(() => {
				let counter = $state([0]);
				const history = trackHistory(
					() => counter,
					(v) => (counter = v),
					{ includeCurrent: true }
				);

				flushSync();

				expect(history.history.length).toBe(1);
				expect(history.redoHistory.length).toBe(0);
				expect(history.canUndo).toBe(false);
				expect(history.canRedo).toBe(false);

				flushSync(() => {
					counter = [1];
				});

				expect(history.history.length).toBe(2);
				expect(history.redoHistory.length).toBe(0);
				expect(history.canUndo).toBe(true);
				expect(history.canRedo).toBe(false);
			});

			cleanup();
		});

		it('Tracks the history correctly with multiple changes', () => {
			const cleanup = $effect.root(() => {
				let counter = $state([0]);
				const history = trackHistory(
					() => counter,
					(v) => (counter = v),
					{ includeCurrent: true }
				);

				flushSync();

				expect(history.history.length).toBe(1);
				expect(history.redoHistory.length).toBe(0);
				expect(history.canUndo).toBe(false);
				expect(history.canRedo).toBe(false);

				flushSync(() => {
					counter = [1];
				});

				flushSync(() => {
					counter = [2];
				});

				expect(history.history.length).toBe(3);
				expect(history.redoHistory.length).toBe(0);
				expect(history.canUndo).toBe(true);
				expect(history.canRedo).toBe(false);
			});

			cleanup();
		});

		it('Undoes correctly', () => {
			const cleanup = $effect.root(() => {
				let counter = $state([0]);
				const history = trackHistory(
					() => counter,
					(v) => (counter = v),
					{ includeCurrent: true }
				);

				flushSync();

				expect(history.history.length).toBe(1);
				expect(history.redoHistory.length).toBe(0);
				expect(history.canUndo).toBe(false);
				expect(history.canRedo).toBe(false);

				flushSync(() => {
					counter = [1];
				});

				flushSync(() => {
					counter = [2];
				});

				expect(history.history.length).toBe(3);
				expect(history.redoHistory.length).toBe(0);
				expect(history.canUndo).toBe(true);
				expect(history.canRedo).toBe(false);

				history.undo();

				expect(history.history.length).toBe(2);
				expect(history.redoHistory.length).toBe(1);
				expect(history.canUndo).toBe(true);
				expect(history.canRedo).toBe(true);

				history.undo();

				expect(history.history.length).toBe(1);
				expect(history.redoHistory.length).toBe(2);
				expect(history.canUndo).toBe(false);
				expect(history.canRedo).toBe(true);
			});

			cleanup();
		});

		it('Redoes correctly', () => {
			const cleanup = $effect.root(() => {
				let counter = $state([0]);
				const history = trackHistory(
					() => counter,
					(v) => (counter = v),
					{ includeCurrent: true }
				);

				flushSync();

				expect(history.history.length).toBe(1);
				expect(history.redoHistory.length).toBe(0);
				expect(history.canUndo).toBe(false);
				expect(history.canRedo).toBe(false);

				flushSync(() => {
					counter = [1];
				});

				flushSync(() => {
					counter = [2];
				});

				expect(history.history.length).toBe(3);
				expect(history.redoHistory.length).toBe(0);
				expect(history.canUndo).toBe(true);
				expect(history.canRedo).toBe(false);

				history.undo();

				expect(history.history.length).toBe(2);
				expect(history.redoHistory.length).toBe(1);
				expect(history.canUndo).toBe(true);
				expect(history.canRedo).toBe(true);

				history.redo();

				expect(history.history.length).toBe(3);
				expect(history.redoHistory.length).toBe(0);
				expect(history.canUndo).toBe(true);
				expect(history.canRedo).toBe(false);
			});

			cleanup();
		});
	});

	describe('Works with arrays methods', () => {
		it('Tracks the history correctly with one change', () => {
			const cleanup = $effect.root(() => {
				let counter = $state([0]);
				const history = trackHistory(
					() => $state.snapshot(counter),
					(v) => (counter = v),
					{ includeCurrent: true }
				);

				flushSync();

				expect(history.history.length).toBe(1);
				expect(history.redoHistory.length).toBe(0);
				expect(history.canUndo).toBe(false);
				expect(history.canRedo).toBe(false);

				flushSync(() => {
					counter.push(1);
				});

				expect(history.history.length).toBe(2);
				expect(history.redoHistory.length).toBe(0);
				expect(history.canUndo).toBe(true);
				expect(history.canRedo).toBe(false);
			});

			cleanup();
		});

		it('Tracks the history correctly with multiple changes', () => {
			const cleanup = $effect.root(() => {
				let counter = $state([0]);
				const history = trackHistory(
					() => $state.snapshot(counter),
					(v) => (counter = v),
					{ includeCurrent: true }
				);

				flushSync();

				expect(history.history.length).toBe(1);
				expect(history.redoHistory.length).toBe(0);
				expect(history.canUndo).toBe(false);
				expect(history.canRedo).toBe(false);

				flushSync(() => {
					counter.push(1);
				});

				flushSync(() => {
					counter.push(2);
				});

				expect(history.history.length).toBe(3);
				expect(history.redoHistory.length).toBe(0);
				expect(history.canUndo).toBe(true);
				expect(history.canRedo).toBe(false);
			});

			cleanup();
		});

		it('Undoes correctly', () => {
			const cleanup = $effect.root(() => {
				let counter = $state([0]);
				const history = trackHistory(
					() => $state.snapshot(counter),
					(v) => (counter = v),
					{ includeCurrent: true }
				);

				flushSync();

				expect(history.history.length).toBe(1);
				expect(history.redoHistory.length).toBe(0);
				expect(history.canUndo).toBe(false);
				expect(history.canRedo).toBe(false);

				flushSync(() => {
					counter.push(1);
				});

				flushSync(() => {
					counter.push(2);
				});

				expect(history.history.length).toBe(3);
				expect(history.redoHistory.length).toBe(0);
				expect(history.canUndo).toBe(true);
				expect(history.canRedo).toBe(false);

				history.undo();

				expect(history.history.length).toBe(2);
				expect(history.redoHistory.length).toBe(1);
				expect(history.canUndo).toBe(true);
				expect(history.canRedo).toBe(true);

				history.undo();

				expect(history.history.length).toBe(1);
				expect(history.redoHistory.length).toBe(2);
				expect(history.canUndo).toBe(false);
				expect(history.canRedo).toBe(true);
			});

			cleanup();
		});

		it('Redoes correctly', () => {
			const cleanup = $effect.root(() => {
				let counter = $state([0]);
				const history = trackHistory(
					() => $state.snapshot(counter),
					(v) => (counter = v),
					{ includeCurrent: true }
				);

				flushSync();

				expect(history.history.length).toBe(1);
				expect(history.redoHistory.length).toBe(0);
				expect(history.canUndo).toBe(false);
				expect(history.canRedo).toBe(false);

				flushSync(() => {
					counter.push(1);
				});

				flushSync(() => {
					counter.push(2);
				});

				expect(history.history.length).toBe(3);
				expect(history.redoHistory.length).toBe(0);
				expect(history.canUndo).toBe(true);
				expect(history.canRedo).toBe(false);

				history.undo();

				expect(history.history.length).toBe(2);
				expect(history.redoHistory.length).toBe(1);
				expect(history.canUndo).toBe(true);
				expect(history.canRedo).toBe(true);

				history.redo();

				expect(history.history.length).toBe(3);
				expect(history.redoHistory.length).toBe(0);
				expect(history.canUndo).toBe(true);
				expect(history.canRedo).toBe(false);
			});

			cleanup();
		});
	});
});
