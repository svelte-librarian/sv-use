interface GetGeolocationOptions extends Partial<PositionOptions> {
	startImmediately?: boolean;
}

type GetGeolocationReturn = {
	/** Whether the Geolocation API is supported or not. */
	readonly isSupported: boolean;
	/** The position and altitude of the device on Earth, as well as the accuracy with which these properties are calculated. */
	readonly coords: Omit<GeolocationCoordinates, 'toJSON'>;
	readonly timestamp: number;
	/** The reason of an error occurring when using the geolocating device. */
	readonly error: GeolocationPositionError | null;
	/** Resumes the geolocation service. */
	resume: () => void;
	/** Pauses the geolocation service. */
	pause: () => void;
};

/**
 * It allows the user to provide their location to web applications if they so desire.
 *
 * For privacy reasons, the user is asked for permission to report location information.
 * @param options Additional options to customize the behavior.
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Geolocation_API
 */
export function getGeolocation(options: GetGeolocationOptions = {}): GetGeolocationReturn {
	const {
		enableHighAccuracy = true,
		maximumAge = 30000,
		timeout = 27000,
		startImmediately = true
	} = options;

	const _isSupported = $derived.by(() => navigator && 'geolocation' in navigator);
	let _watcherId = $state<number>();
	let _coords = $state<Omit<GeolocationCoordinates, 'toJSON'>>({
		accuracy: 0,
		latitude: Number.POSITIVE_INFINITY,
		longitude: Number.POSITIVE_INFINITY,
		altitude: null,
		altitudeAccuracy: null,
		heading: null,
		speed: null
	});
	let _timestamp = $state<number>(0);
	let _error = $state<GeolocationPositionError | null>(null);

	function resume() {
		if (_isSupported) {
			_watcherId = navigator.geolocation.watchPosition(
				(position) => {
					_coords = position.coords;
					_timestamp = Date.now();
				},
				(error) => {
					_error = error;
				},
				{
					enableHighAccuracy: enableHighAccuracy,
					maximumAge: maximumAge,
					timeout: timeout
				}
			);
		}
	}

	function pause() {
		if (_isSupported && _watcherId) {
			navigator.geolocation.clearWatch(_watcherId);
		}
	}

	if (startImmediately) {
		resume();
	}

	return {
		get isSupported() {
			return _isSupported;
		},
		get coords() {
			return _coords;
		},
		get timestamp() {
			return _timestamp;
		},
		get error() {
			return _error;
		},
		resume,
		pause
	};
}
