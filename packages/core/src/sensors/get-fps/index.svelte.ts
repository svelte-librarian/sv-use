import { onMount } from 'svelte';

type GetFpsOptions = {
	/** Re-calculate the frames per second every `x` frames. */
	every?: number;
};

type GetFpsReturn = {
	readonly current: number;
};

/**
 * @see https://svelte-librarian.github.io/sv-use/docs/core/sensors/get-fps
 */
export function getFps(options: GetFpsOptions = {}): GetFpsReturn {
	const { every = 10 } = options;

	let _fps = $state<number>(0);

	let last = performance.now();
	let ticks = 0;

	onMount(() => {
		const callback = () => {
			ticks += 1;

			if (ticks >= every) {
				const now = performance.now();
				const delta = now - last;

				_fps = Math.round(1000 / (delta / ticks));

				last = now;
				ticks = 0;
			}

			window.requestAnimationFrame(callback);
		};

		window.requestAnimationFrame(callback);
	});

	return {
		get current() {
			return _fps;
		}
	};
}
