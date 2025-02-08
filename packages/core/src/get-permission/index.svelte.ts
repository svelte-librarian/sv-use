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

type GetPermissionOptions<ExposeControls extends boolean> = {
	exposeControls?: ExposeControls;
};

type GetPermissionReturn = Readonly<PermissionState>;

type GetPermissionReturnWithControls = {
	readonly isSupported: boolean;
	readonly current: PermissionState;
	query: () => Promise<PermissionStatus>;
};

export function getPermission(
	nameOrDesc: ExtendedPermissionName | ExtendedPermissionDescriptor
): GetPermissionReturn;

export function getPermission<ExposeControls extends boolean = false>(
	nameOrDesc: ExtendedPermissionName | ExtendedPermissionDescriptor,
	options: GetPermissionOptions<ExposeControls>
): ExposeControls extends true ? GetPermissionReturnWithControls : GetPermissionReturn;

/**
 * Retrieves the status of a given permission.
 * @see https://svelte-librarian.github.io/sv-use/docs/core/get-permission
 */
export function getPermission<ExposeControls extends boolean>(
	nameOrDesc: ExtendedPermissionName | ExtendedPermissionDescriptor,
	options: GetPermissionOptions<ExposeControls> = {}
): GetPermissionReturn | GetPermissionReturnWithControls {
	const { exposeControls = false } = options;

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

	if (exposeControls) {
		return {
			get isSupported() {
				return _isSupported;
			},
			get current() {
				return _current;
			},
			query
		};
	} else {
		return _current;
	}
}
