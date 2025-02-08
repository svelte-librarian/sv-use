import { whenever } from '../whenever/index.svelte.js';
import { isSupported } from '../__internal__/is.svelte.js';
import { noop, normalizeValue } from '../__internal__/utils.svelte.js';
import { defaultWindow, type ConfigurableWindow } from '../__internal__/configurable.js';
import type { SpeechRecognition, SpeechRecognitionErrorEvent } from './types.js';
import type { MaybeGetter } from '../__internal__/types.js';

interface CreateSpeechRecognitionOptions extends ConfigurableWindow {
	/**
	 * Whether continuous results are returned for each recognition, or only a single result.
	 * @default true
	 */
	continuous?: boolean;
	/**
	 * Whether interim results should be returned or not.
	 *
	 * Interim results are results that are not yet final.
	 * @default true
	 */
	interimResults?: boolean;
	/**
	 * The language used for the speech recognition.
	 *
	 * Note that if you pass in a getter and change the language, the service must be stopped first for the change to take effect.
	 * @default 'en-US'
	 */
	lang?: MaybeGetter<string>;
	/**
	 * A number representing the maximum returned alternatives for each result.
	 * @default 1
	 */
	maxAlternatives?: number;
	/**
	 * A callback for when an error occurs.
	 * @param error The error that occurred.
	 */
	onError?: (error: SpeechRecognitionErrorEvent) => void;
	/**
	 * A callback for when a new result is obtained.
	 * @param transcript The transcript of the result.
	 * @param isFinal Whether the result is final or not.
	 */
	onResult?: (transcript: string, isFinal: boolean) => void;
}

type CreateSpeechRecognitionReturn = {
	readonly isSupported: boolean;
	readonly isListening: boolean;
	readonly isFinal: boolean;
	readonly recognition: SpeechRecognition | undefined;
	result: string;
	error: SpeechRecognitionErrorEvent | null;
	start: () => void;
	stop: () => void;
};

/**
 * Reactive controller interface for the recognition service.
 * @param options Additional options to customize the behavior.
 * @see https://svelte-librarian.github.io/sv-use/docs/core/sensors/create-speech-recognition
 */
export function createSpeechRecognition(
	options: CreateSpeechRecognitionOptions = {}
): CreateSpeechRecognitionReturn {
	const {
		interimResults = true,
		continuous = true,
		maxAlternatives = 1,
		lang = 'en-US',
		onError = noop,
		onResult = noop,
		window = defaultWindow
	} = options;

	let recognition: SpeechRecognition | undefined;

	let isListening = $state(false);
	let isFinal = $state(false);
	let result = $state('');
	let error = $state<SpeechRecognitionErrorEvent | null>(null);

	const _lang = $derived(normalizeValue(lang));

	const SpeechRecognition =
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		window && ((window as any).SpeechRecognition || (window as any).webkitSpeechRecognition);
	const _isSupported = isSupported(() => SpeechRecognition);

	if (_isSupported.current) {
		recognition = new SpeechRecognition() as SpeechRecognition;

		recognition.continuous = continuous;
		recognition.interimResults = interimResults;
		recognition.lang = _lang;
		recognition.maxAlternatives = maxAlternatives;

		recognition.onstart = () => {
			isListening = true;
			isFinal = false;
		};

		recognition.onresult = (event) => {
			const currentResult = event.results[event.resultIndex];
			const { transcript } = currentResult[0];

			isFinal = currentResult.isFinal;
			result = transcript;
			error = null;

			onResult(transcript, isFinal);
		};

		recognition.onerror = (event) => {
			error = event;

			onError(event);
		};

		recognition.onend = () => {
			isListening = false;
		};

		whenever(
			() => !!_lang && !!recognition && !isListening,
			() => {
				recognition!.lang = _lang;
			}
		);
	}

	function start() {
		if (!isListening) {
			recognition?.start();
		}
	}

	function stop() {
		if (isListening) {
			recognition?.stop();
		}
	}

	return {
		get isSupported() {
			return _isSupported.current;
		},
		get isListening() {
			return isListening;
		},
		get isFinal() {
			return isFinal;
		},
		get recognition() {
			return recognition;
		},
		get result() {
			return result;
		},
		set result(v: string) {
			result = v;
		},
		get error() {
			return error;
		},
		set error(v) {
			error = v;
		},
		start,
		stop
	};
}
