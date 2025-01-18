import { isSupported } from '../../__internal__/is.svelte.js';
import { defaultWindow, type ConfigurableWindow } from '../../__internal__/configurable.js';

type SRGBHex = `#${string}`;

interface EyeDropperOpenOptions {
	/** @see https://developer.mozilla.org/en-US/docs/Web/API/AbortSignal */
	signal?: AbortSignal;
}

export interface EyeDropper {
	// eslint-disable-next-line @typescript-eslint/no-misused-new
	new (): EyeDropper;
	open: (options?: EyeDropperOpenOptions) => Promise<{ sRGBHex: SRGBHex }>;
	[Symbol.toStringTag]: 'EyeDropper';
}

type WindowWithEyeDropper = Window & {
	EyeDropper: EyeDropper;
};

interface CreateEyeDropperOptions extends ConfigurableWindow {
	/**
	 * Initial sRGBHex value of the eye dropper.
	 * @default undefined
	 */
	initialValue?: SRGBHex;
}

type CreateEyeDropperReturn = {
	/** Whether the {@link https://developer.mozilla.org/en-US/docs/Web/API/EyeDropper_API | `Eye Dropper API`} is supported or not. */
	readonly isSupported: boolean;
	/** The current value selected in the eye dropper tool. */
	readonly current: SRGBHex | undefined;
	/** A callback to open the eye dropper tool. */
	open: (options?: EyeDropperOpenOptions) => Promise<{ sRGBHex: SRGBHex } | undefined>;
};

/**
 * Provides a mechanism for creating an eye dropper tool.
 * @see https://svelte-librarian.github.io/sv-use/docs/core/browser/create-eye-dropper
 */
export function createEyeDropper(options: CreateEyeDropperOptions = {}): CreateEyeDropperReturn {
	const { initialValue = undefined, window = defaultWindow } = options;

	const _isSupported = isSupported(() => !!window && 'EyeDropper' in window);
	let _current = $state(initialValue);

	async function open(openOptions?: EyeDropperOpenOptions) {
		if (!_isSupported.current || !window) return;

		const eyeDropper: EyeDropper = new (window as WindowWithEyeDropper).EyeDropper();
		const result = await eyeDropper.open(openOptions);

		_current = result.sRGBHex;

		return result;
	}

	return {
		get isSupported() {
			return _isSupported.current;
		},
		get current() {
			return _current;
		},
		open
	};
}
