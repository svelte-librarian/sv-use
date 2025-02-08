import { onDestroy } from 'svelte';
import { getDocumentVisibility } from '../get-document-visibility/index.svelte.js';
import { whenever } from '../whenever/index.svelte.js';
import { handleEventListener } from '../handle-event-listener/index.svelte.js';
import { noop } from '../__internal__/utils.svelte.js';
import {
	defaultDocument,
	defaultNavigator,
	type ConfigurableDocument,
	type ConfigurableNavigator
} from '../__internal__/configurable.js';
import type { AutoCleanup, CleanupFunction } from '../__internal__/types.js';

type WakeLockType = 'screen';

interface WakeLockSentinel extends EventTarget {
	type: WakeLockType;
	released: boolean;
	release: () => Promise<void>;
}

type NavigatorWithWakeLock = Navigator & {
	wakeLock: { request: (type: WakeLockType) => Promise<WakeLockSentinel> };
};

interface HandleWakeLockOptions extends ConfigurableNavigator, ConfigurableDocument, AutoCleanup {}

type HandleWakeLockReturn = {
	readonly isSupported: boolean | undefined;
	readonly isActive: boolean;
	sentinel: WakeLockSentinel | null;
	request: (type: WakeLockType) => Promise<void>;
	forceRequest: (type: WakeLockType) => Promise<void>;
	release: () => Promise<void>;
	cleanup: CleanupFunction;
};

/**
 * Provides a way to prevent devices from dimming or locking the screen when an application needs to keep running.
 * @param options Additional options to customize the behavior.
 */
export function handleWakeLock(options: HandleWakeLockOptions = {}): HandleWakeLockReturn {
	const { autoCleanup = true, navigator = defaultNavigator, document = defaultDocument } = options;

	let eventListenerCleanup: CleanupFunction = noop;

	let requestedType = $state<WakeLockType | false>(false);
	let sentinel = $state<WakeLockSentinel | null>(null);
	const documentVisibility = getDocumentVisibility({ autoCleanup, document });
	const isSupported = $derived.by(() => !!navigator && 'wakeLock' in navigator);
	const isActive = $derived.by(() => !!sentinel && documentVisibility.current === 'visible');

	if (isSupported) {
		eventListenerCleanup = handleEventListener(
			sentinel!,
			'release',
			() => {
				requestedType = sentinel?.type ?? false;
			},
			{ autoCleanup, passive: true }
		);

		whenever(
			() => documentVisibility.current === 'visible' && !!requestedType,
			() => {
				requestedType = false;
				forceRequest('screen');
			}
		);
	}

	if (autoCleanup) {
		onDestroy(() => cleanup());
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

	function cleanup() {
		documentVisibility.cleanup();
		eventListenerCleanup();
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
		release,
		cleanup
	};
}
