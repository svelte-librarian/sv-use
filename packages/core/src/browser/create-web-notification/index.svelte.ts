import { onMount } from 'svelte';

type CreateWebNotificationData = {
	/** @default '' */
	title?: string;
	/** @default '' */
	body?: string;
	/**
	 * The text direction of the notification.
	 * @default 'auto'
	 */
	dir?: NotificationDirection;
	/**
	 * The language of the notification.
	 * @default DOMString
	 */
	lang?: string;
	/**
	 * The tag ID of the notification.
	 * @default ''
	 */
	tag?: string;
	/**
	 * The URL of the image to display in the notification.
	 * @default ''
	 */
	icon?: string;
	/**
	 * Whether the notification should remain active until the user interacts with it or not.
	 * @default false
	 */
	requireInteraction?: boolean;
	/**
	 * Whether the notification should be silent or not, regardless of the device's settings.
	 * @default false
	 */
	silent?: boolean;
};

type CreateWebNotificationOptions = {
	/**
	 * Whether to automatically request permission to show notifications or not.
	 * @default true
	 */
	autoRequestPermission?: boolean;
	/**
	 * A callback for when the notification is shown.
	 * @default () => {}
	 */
	onShow?: () => void;
	/**
	 * A callback for when the notification is clicked.
	 * @default () => {}
	 */
	onClick?: () => void;
	/**
	 * A callback for when the notification is closed.
	 * @default () => {}
	 */
	onClose?: () => void;
	/**
	 * A callback for when the notification has an error.
	 * @default () => {}
	 */
	onError?: () => void;
};

type CreateWebNotificationReturn = {
	readonly isSupported: boolean;
	readonly isPermissionGranted: boolean;
	readonly notification: Notification | null;
	show: () => Promise<Notification | null>;
	close: () => void;
};

/**
 * Configure and display desktop notifications to the user.
 * @warning Cannot be used in a lifecycle hook as it relies on `onMount`.
 * @see https://svelte-librarian.github.io/sv-use/docs/core/browser/create-web-notification
 */
export function createWebNotification(
	data: CreateWebNotificationData = {},
	options: CreateWebNotificationOptions = {}
): CreateWebNotificationReturn {
	const {
		title = '',
		body = '',
		dir = 'auto',
		lang = '',
		tag = '',
		icon = '',
		requireInteraction = false,
		silent = false
	} = data;

	const {
		autoRequestPermission = true,
		onShow = () => {},
		onClick = () => {},
		onClose = () => {},
		onError = () => {}
	} = options;

	let _isSupported = $state<boolean>(false);
	let _isPermissionGranted = $state(
		_isSupported && 'permission' in Notification && Notification.permission === 'granted'
	);
	let _notification = $state<Notification | null>(null);

	onMount(() => {
		if (!window || !('Notification' in window)) {
			_isSupported = false;
			return;
		}

		if (Notification.permission === 'granted') {
			_isSupported = true;
			return;
		}

		// https://stackoverflow.com/questions/29774836/failed-to-construct-notification-illegal-constructor/29895431
		// https://issues.chromium.org/issues/40415865
		try {
			const notification = new Notification('');
			notification.onshow = () => {
				notification.close();
			};
		} catch (e) {
			// Android Chrome: Uncaught TypeError: Failed to construct 'Notification': Illegal constructor. Use ServiceWorkerRegistration.showNotification() instead.
			// @ts-expect-error catch TypeError
			if (e.name === 'TypeError') {
				_isSupported = false;
				return;
			}
		}

		_isSupported = true;
	});

	onMount(async () => {
		if (!autoRequestPermission) return;

		await ensurePermissions();
	});

	async function ensurePermissions() {
		if (!_isSupported) return null;

		if (!_isPermissionGranted && Notification.permission !== 'denied') {
			const result = await Notification.requestPermission();

			if (result === 'granted') {
				_isPermissionGranted = true;
			}
		}

		return _isPermissionGranted;
	}

	async function show() {
		if (!_isSupported || !_isPermissionGranted) return null;

		_notification = new Notification(title, {
			body,
			dir,
			lang,
			tag,
			icon,
			requireInteraction,
			silent
		});

		_notification.onshow = onShow;
		_notification.onclick = onClick;
		_notification.onclose = onClose;
		_notification.onerror = onError;

		return _notification;
	}

	function close() {
		if (_notification) {
			_notification.close();
		}

		_notification = null;
	}

	return {
		get isSupported() {
			return _isSupported;
		},
		get isPermissionGranted() {
			return _isPermissionGranted;
		},
		get notification() {
			return _notification;
		},
		show,
		close
	};
}
