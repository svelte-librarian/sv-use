<script>
	import { observeIntersection } from '$sv-use/core';
	import { cn } from '$utils/cn.js';

	let root = $state();
	let divNode = $state();
	let isVisible = $state(false);

	const observer = observeIntersection(
		() => divNode,
		([entry]) => {
			isVisible = entry?.isIntersecting || false;
		},
		{ root: () => root }
	);
</script>

<div class="relative flex w-full flex-col gap-5">
	<div class="flex w-full items-center justify-center gap-2">
		<label class="dark:text-zinc-200">
			<input
				type="checkbox"
				checked={observer.isActive}
				onchange={observer.isActive ? observer.pause : observer.resume}
			/>
			Is Active
		</label>
	</div>
	<div
		bind:this={root}
		class="border-svelte/50 dark:border-darksvelte/50 relative h-[200px] w-full overflow-y-scroll border-2 border-dashed"
	>
		<div class="relative flex h-[600px] w-full justify-center">
			<span class="mt-5 italic text-zinc-500 dark:text-zinc-400">Scroll down...</span>
			<div
				bind:this={divNode}
				class={cn(
					'absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-dashed p-5',
					'border-svelte dark:border-darksvelte dark:text-zinc-200'
				)}
			>
				i'm the target element
			</div>
		</div>
	</div>
	<p class="mx-auto dark:text-zinc-200">
		Element
		<span class="text-svelte dark:text-darksvelte font-semibold">
			{isVisible ? 'inside' : 'outside'}
		</span> the viewport
	</p>
</div>
