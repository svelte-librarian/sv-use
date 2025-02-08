type AsyncStateOptions<Data = unknown> = {
	/**
	 * Whether to run the promise immediately or not.
	 *
	 * Set this to `false` if your promise is a function that depends on arguments.
	 * @default true
	 */
	immediate?: boolean;
	/**
	 * Whether to reset the state to the initial value when the promise is executed.
	 * @default false
	 */
	resetOnExecute?: boolean;
	/**
	 * A callback for when the promise resolves successfully.
	 * @param data The data returned by the promise.
	 * @default () => {}
	 */
	onSuccess?: (data: Data) => void;
	/**
	 * A callback for when the promise rejects.
	 * @param error The error returned by the promise.
	 * @default () => {}
	 */
	onError?: (error: unknown) => void;
};

type AsyncStateReturn<Data = unknown, Parameters extends unknown[] = unknown[]> = {
	/** Whether the state is ready or not. */
	readonly isReady: boolean;
	/** Whether the state is loading or not. */
	readonly isLoading: boolean;
	/** The current value of the state. */
	current: Data;
	/** The error of the state if any. */
	error: unknown | null;
	/**
	 * Executes the promise programatically.
	 *
	 * Useful when
	 *  * the promise is a function that depends on arguments.
	 *  * you want to poll data at intervals.
	 */
	execute: (...args: Parameters) => Promise<void>;
};

/**
 * A reactive state that handles the loading and error states of a promise.
 * @param promise The promise to handle.
 * @param initial The initial value of the state.
 * @param options Additional options to customize the behavior.
 * @see https://svelte-librarian.github.io/sv-use/docs/core/states/async-state
 */
export function asyncState<Data = unknown, Parameters extends unknown[] = unknown[]>(
	promise: Promise<Data> | ((...args: Parameters) => Promise<Data>),
	initial: Data,
	options: AsyncStateOptions<Data> = {}
): AsyncStateReturn<Data, Parameters> {
	const {
		immediate = true,
		resetOnExecute = false,
		onSuccess = () => {},
		onError = () => {}
	} = options;

	let _isLoading = $state<boolean>(false);
	let _isReady = $state<boolean>(false);
	let _error = $state<unknown | null>(null);
	let _current = $state<Data>(initial);

	async function execute(...args: Parameters) {
		if (resetOnExecute) {
			_current = initial;
		}

		_isReady = false;
		_isLoading = true;

		const _promise = typeof promise === 'function' ? promise(...args) : promise;

		try {
			const result = await _promise;
			_current = result;
			_isReady = true;
			onSuccess(result);
		} catch (error) {
			_error = error;
			onError(error);
		} finally {
			_isLoading = false;
		}
	}

	if (immediate) {
		// @ts-expect-error Types are not resolved properly
		execute();
	}

	return {
		get current() {
			return _current;
		},
		set current(v: Data) {
			_current = v;
		},
		get isReady() {
			return _isReady;
		},
		get isLoading() {
			return _isLoading;
		},
		get error() {
			return _error;
		},
		set error(v: unknown) {
			_error = v;
		},
		execute
	};
}
