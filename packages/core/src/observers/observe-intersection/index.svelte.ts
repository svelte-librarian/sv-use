import { watch } from '../../reactivity/watch/index.svelte.js';
import { isSupported } from '../../__internal__/is.svelte.js';
import {
	defaultDocument,
	defaultWindow,
	type ConfigurableWindow
} from '../../__internal__/configurable.js';
import { noop, normalizeValue, notNullish, toArray } from '../../__internal__/utils.js';
import type { Arrayable, CleanupFunction, Getter } from '../../__internal__/types.js';

export interface ObserveIntersectionOptions extends ConfigurableWindow {
	/**
	 * Whether to start the IntersectionObserver on creation or not.
	 * @default true
	 */
	immediate?: boolean;
	/**
	 * The element or document whose bounds are used as the bounding box when testing for intersection.
	 * @default document
	 */
	root?: HTMLElement | Getter<HTMLElement> | Document;
	/**
	 * A string which specifies a set of offsets to add to the root's bounding box when calculating intersections.
	 * @default '0px'
	 */
	rootMargin?: string;
	/**
	 * Either a single number or an array of numbers between 0.0 and 1.
	 * @default 0
	 */
	threshold?: number | number[];
}

export interface ObserveIntersectionReturn {
	/** Whether the {@link https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API | `Intersection Observer API`} is supported or not. */
	readonly isSupported: boolean;
	/** Whether the function is currently observing the targets or not. */
	readonly isActive: boolean;
	/** Resumes the observer. */
	resume: () => void;
	/** Pauses the observer. It can also be used to cleanup the observer. */
	pause: () => void;
}

/**
 * Runs a callback when the targets are visible on the screen.
 * @param targets The target(s) to observe.
 * @param callback The callback to run when the targets are visible on screen.
 * @param options Additional options to customize the behavior.
 * @see https://svelte-librarian.github.io/sv-use/docs/core/observers/observe-intersection
 */
export function observeIntersection(
	targets: Arrayable<Getter<HTMLElement | null | undefined>>,
	callback: IntersectionObserverCallback,
	options: ObserveIntersectionOptions = {}
): ObserveIntersectionReturn {
	const {
		root = defaultDocument,
		rootMargin = '0px',
		threshold = 0,
		window = defaultWindow,
		immediate = true
	} = options;

	const _isSupported = isSupported(() => window !== undefined && 'IntersectionObserver' in window);
	const _targets = $derived(toArray(targets).map(normalizeValue).filter(notNullish));

	let cleanup: CleanupFunction = noop;
	let _isActive = $state<boolean>(immediate);

	if (_isSupported.current) {
		watch(
			[() => _targets, () => normalizeValue(root), () => _isActive],
			([targets, root]) => {
				cleanup();

				if (!_isActive) return;
				if (!targets.length) return;

				const observer = new IntersectionObserver(callback, {
					root: root,
					rootMargin,
					threshold
				});

				targets.forEach((el) => el && observer.observe(el));

				cleanup = () => {
					observer.disconnect();
					cleanup = noop;
				};
			},
			{ runOnMounted: immediate }
		);
	}

	return {
		get isSupported() {
			return _isSupported.current;
		},
		get isActive() {
			return _isActive;
		},
		pause() {
			cleanup();
			_isActive = false;
		},
		resume() {
			_isActive = true;
		}
	};
}
