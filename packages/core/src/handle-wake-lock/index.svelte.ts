import { getDocumentVisibility } from '../get-document-visibility/index.svelte.js';
import { whenever } from '../whenever/index.svelte.js';
import { handleEventListener } from '../handle-event-listener/index.svelte.js';
import {
	defaultDocument,
	defaultNavigator,
	type ConfigurableDocument,
	type ConfigurableNavigator
} from '../__internal__/configurable.js';

type WakeLockType = 'screen';

interface WakeLockSentinel extends EventTarget {
	type: WakeLockType;
	released: boolean;
	release: () => Promise<void>;
}

type NavigatorWithWakeLock = Navigator & {
	wakeLock: { request: (type: WakeLockType) => Promise<WakeLockSentinel> };
};

interface HandleWakeLockOptions extends ConfigurableNavigator, ConfigurableDocument {}

type HandleWakeLockReturn = {
	readonly isSupported: boolean | undefined;
	readonly isActive: boolean;
	sentinel: WakeLockSentinel | null;
	request: (type: WakeLockType) => Promise<void>;
	forceRequest: (type: WakeLockType) => Promise<void>;
	release: () => Promise<void>;
};

/**
 * Provides a way to prevent devices from dimming or locking the screen when an application needs to keep running.
 * @param options Additional options to customize the behavior.
 * @see https://svelte-librarian.github.io/sv-use/docs/core/create-vibration
 */
export function handleWakeLock(options: HandleWakeLockOptions = {}): HandleWakeLockReturn {
	const { navigator = defaultNavigator, document = defaultDocument } = options;

	let requestedType = $state<WakeLockType | false>(false);
	let sentinel = $state<WakeLockSentinel | null>(null);

	const documentVisibility = getDocumentVisibility({ document });
	const isSupported = $derived.by(() => !!navigator && 'wakeLock' in navigator);
	const isActive = $derived.by(() => !!sentinel && documentVisibility.current === 'visible');

	if (isSupported) {
		handleEventListener(sentinel!, 'release', onRelease, { passive: true });

		whenever(
			() => documentVisibility.current === 'visible' && !!requestedType,
			() => {
				requestedType = false;
				forceRequest('screen');
			}
		);
	}

	function onRelease() {
		requestedType = sentinel?.type ?? false;
	}

	async function forceRequest(type: WakeLockType): Promise<void> {
		await sentinel?.release();
		sentinel = isSupported
			? await (navigator as NavigatorWithWakeLock).wakeLock.request(type)
			: null;
	}

	async function request(type: WakeLockType): Promise<void> {
		if (documentVisibility.current === 'visible') {
			await forceRequest(type);
		} else {
			requestedType = type;
		}
	}

	async function release(): Promise<void> {
		requestedType = false;
		sentinel?.release().then(() => {
			sentinel = null;
		});
	}

	return {
		get isSupported() {
			return isSupported;
		},
		get isActive() {
			return isActive;
		},
		sentinel,
		request,
		forceRequest,
		release
	};
}
