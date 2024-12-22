type AsyncStateOptions<Data = unknown> = {
	/**
	 * Whether to run the promise immediately or not.
	 *
	 * Set this to `false` if your promise is a function that depends on arguments.
	 */
	immediate?: boolean;
	/** Whether to reset the state to the initial value when the promise is executed. */
	resetOnExecute?: boolean;
	/** A callback for when the promise resolves successfully. */
	onSuccess?: (data: Data) => void;
	/** A callback for when the promise rejects. */
	onError?: (error: unknown) => void;
};

type AsyncStateReturn<Data = unknown, Parameters extends unknown[] = unknown[]> = {
	readonly isReady: boolean;
	readonly isLoading: boolean;
	current: Data;
	error: unknown | null;
	execute: (...args: Parameters) => Promise<void>;
};

/**
 * A reactive state that handles the loading and error states of a promise.
 * @param promise The promise to handle.
 * @param initial The initial value of the state.
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
