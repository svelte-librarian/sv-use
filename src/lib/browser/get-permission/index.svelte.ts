import { onMount } from 'svelte';

type ExtendedPermissionName =
	| PermissionName
	| 'accelerometer'
	| 'accessibility-events'
	| 'ambient-light-sensor'
	| 'background-sync'
	| 'camera'
	| 'clipboard-read'
	| 'clipboard-write'
	| 'gyroscope'
	| 'magnetometer'
	| 'microphone'
	| 'payment-handler'
	| 'speaker'
	| 'local-fonts';

export type ExtendedPermissionDescriptor = PermissionDescriptor | { name: ExtendedPermissionName };

type GetPermissionReturn = {
	readonly isSupported: boolean;
	readonly current: PermissionState;
	query: () => Promise<PermissionStatus>;
};

export function getPermission(name: ExtendedPermissionName): GetPermissionReturn;
export function getPermission(desc: ExtendedPermissionDescriptor): GetPermissionReturn;

/** Retrieves the status of a given permission. */
export function getPermission(nameOrDesc: ExtendedPermissionName | ExtendedPermissionDescriptor) {
	const _descriptor = typeof nameOrDesc === 'string' ? { name: nameOrDesc } : nameOrDesc;
	let _current = $state<PermissionState>('prompt');
	let _isSupported = $state<boolean>(false);

	function query(): Promise<PermissionStatus> {
		return navigator.permissions.query(_descriptor as PermissionDescriptor);
	}

	onMount(async () => {
		if (!('permissions' in navigator)) return;

		try {
			const status = await query();
			_isSupported = true;
			_current = status.state;

			status.onchange = async () => {
				_current = (await query()).state;
			};
		} catch {
			/* empty */
		}
	});

	return {
		get isSupported() {
			return _isSupported;
		},
		get current() {
			return _current;
		},
		query
	};
}
