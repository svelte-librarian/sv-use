import { onMount } from 'svelte';

type NetworkInformation = {
	/** The effective bandwidth estimate in megabits per second, rounded to the nearest multiple of 25 kilobits per seconds. */
	readonly downlink: number;
	/** The maximum downlink speed, in megabits per second (Mbps), for the underlying connection technology. */
	readonly downlinkMax: number;
	/** @see https://developer.mozilla.org/en-US/docs/Glossary/Effective_connection_type */
	readonly effectiveType: 'slow-2g' | '2g' | '3g' | '4g';
	/** The estimated effective round-trip time of the current connection, rounded to the nearest multiple of 25 milliseconds. */
	readonly rtt: number;
	/** Whether the user has set a reduced data usage option on the user agent or not. */
	readonly saveData: boolean;
	/** The type of connection a device is using to communicate with the network. */
	readonly type:
		| 'bluetooth'
		| 'cellular'
		| 'ethernet'
		| 'none'
		| 'wifi'
		| 'wimax'
		| 'other'
		| 'unknown';
};

type GetNetworkReturn = {
	readonly isSupported: boolean;
	readonly current: NetworkInformation;
};

/**
 * Provides information about the connection a device is using to communicate with the network.
 * @see https://developer.mozilla.org/en-US/docs/Web/API/NetworkInformation
 */
export function getNetwork(): GetNetworkReturn {
	let _isSupported = $state<boolean>(false);
	let _current = $state<NetworkInformation>({
		downlink: 0,
		downlinkMax: 0,
		effectiveType: 'slow-2g',
		rtt: 0,
		saveData: false,
		type: 'unknown'
	});

	onMount(() => {
		if (!('navigator' in window)) return;
		if (!('connection' in navigator)) return;

		_isSupported = true;
		_current = { ..._current, ...(navigator.connection as NetworkInformation) };
	});

	return {
		get isSupported() {
			return _isSupported;
		},
		get current() {
			return _current;
		}
	};
}
