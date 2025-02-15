<script lang="ts">
	import { onSwipe } from '@sv-use/core';
	import { cn } from '$utils/cn.js';
	import { Button } from '$lib/components/atoms/index.js';

	let target = $state<HTMLElement>();
	let container = $state<HTMLElement>();

	let left = $state('0');
	let opacity = $state(1);

	const containerWidth = $derived(container?.offsetWidth);

	const swipe = onSwipe(() => target, {
		onMove() {
			if (containerWidth) {
				if (swipe.lengthX < 0) {
					const length = Math.abs(swipe.lengthX);
					left = `${length}px`;
					opacity = 1.1 - length / containerWidth;
				} else {
					left = '0';
					opacity = 1;
				}
			}
		},
		onEnd() {
			if (swipe.lengthX < 0 && containerWidth && Math.abs(swipe.lengthX) / containerWidth >= 0.5) {
				left = '100%';
				opacity = 0;
			} else {
				left = '0';
				opacity = 1;
			}
		}
	});

	function reset() {
		left = '0';
		opacity = 1;
		swipe.reset();
	}
</script>

<div class="relative flex w-full flex-col gap-5">
	<p class="text-sm italic text-zinc-500 dark:text-zinc-400">
		Try dragging the element for half the container.
	</p>
	<div
		bind:this={container}
		class="relative flex h-20 select-none items-center justify-center overflow-hidden border-2 border-dashed border-[#ccc]"
	>
		<div
			bind:this={target}
			style="left: {left}; opacity: {opacity};"
			class={cn(
				'bg-svelte dark:bg-darksvelte relative grid h-full w-full place-items-center',
				swipe.isSwiping && 'duration-200 ease-in-out'
			)}
		>
			<p class="overflow-hidden whitespace-nowrap text-center font-bold dark:text-zinc-200">
				Swipe right
			</p>
		</div>
	</div>
	<Button onclick={reset}>Reset</Button>
	<p class="text-center dark:text-zinc-200">
		Direction: {swipe.direction ? swipe.direction : '-'} <br />
		lengthX: {swipe.lengthX} | lengthY: {swipe.lengthY}
	</p>
</div>
