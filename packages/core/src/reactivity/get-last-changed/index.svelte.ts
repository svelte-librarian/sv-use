/**
 * Get the last time a state changed.
 * @param value The state to track as a getter function.
 */
export function getLastChanged<T>(value: () => T) {
	let _lastChanged = $state<number>(0);

	$effect(() => {
		value();

		_lastChanged = Date.now();
	});

	return {
		get current() {
			return _lastChanged;
		}
	};
}