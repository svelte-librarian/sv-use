import { handleEventListener } from '../../browser/index.js';
import { defaultWindow, type ConfigurableWindow } from '../../__internal__/configurable.js';
import type { CleanupFunction } from '../../__internal__/types.js';

interface HasLeftPageOptions<AutoCleanup extends boolean> extends ConfigurableWindow {
	/**
	 * Whether to automatically clean up the event listener or not.
	 * @note If set to `true`, you must call {@link hasLeftPage | `hasLeftPage`} in the component initialization lifecycle.
	 * @default true
	 */
	autoCleanup?: AutoCleanup;
}

type HasLeftPageReturn = {
	readonly current: boolean;
};

type HasLeftPageReturnWithCleanup = HasLeftPageReturn & {
	cleanup: CleanupFunction;
};

/**
 * Whether the mouse has left the page or not.
 * @note You can only run this in the component initialization lifecycle, unless you set {@link HasLeftPageOptions.autoCleanup | `autoCleanup`} to `false`.
 */
export function hasLeftPage(): HasLeftPageReturn;

/**
 * Whether the mouse has left the page or not.
 * @note You can only run this in the component initialization lifecycle, unless you set {@link HasLeftPageOptions.autoCleanup | `autoCleanup`} to `false`.
 * @param options Additional options to customize the behavior.
 */
export function hasLeftPage<AutoCleanup extends boolean>(
	options: HasLeftPageOptions<AutoCleanup>
): AutoCleanup extends true ? HasLeftPageReturn : HasLeftPageReturnWithCleanup;

export function hasLeftPage<AutoCleanup extends boolean>(
	options: HasLeftPageOptions<AutoCleanup> = {}
): HasLeftPageReturn | HasLeftPageReturnWithCleanup {
	const { autoCleanup = true, window = defaultWindow } = options;

	const cleanups: CleanupFunction[] = [];
	const _hasLeft = $state({ current: false });

	const handler = (event: MouseEvent) => {
		if (!window) return;

		event = event || (window.event as unknown);
		// @ts-expect-error missing types
		const from = event.relatedTarget || event.toElement;

		_hasLeft.current = !from;
	};

	if (window) {
		cleanups.push(
			handleEventListener(window, 'mouseout', handler, {
				passive: true,
				autoMountAndCleanup: autoCleanup
			}),
			handleEventListener(document, ['mouseleave', 'mouseenter'], handler, {
				passive: true,
				autoMountAndCleanup: autoCleanup
			})
		);
	}

	if (autoCleanup) {
		return {
			get current() {
				return _hasLeft.current;
			}
		};
	} else {
		return {
			get current() {
				return _hasLeft.current;
			},
			cleanup() {
				cleanups.forEach((cleanup) => cleanup());
			}
		};
	}
}
