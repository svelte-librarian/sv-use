<script>
	import { observeIntersection } from '$sv-use/core';

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
		<label for="is-active">
			<input
				id="is-active"
				type="checkbox"
				checked={observer.isActive}
				onchange={observer.isActive ? observer.pause : observer.resume}
			/>
			Is Active
		</label>
	</div>
	<div
		bind:this={root}
		class="border-svelte/50 relative h-[200px] w-full overflow-y-scroll border-2 border-dashed"
	>
		<div class="relative flex h-[600px] w-full justify-center">
			<span class="mt-5 italic text-zinc-500">Scroll down...</span>
			<div
				bind:this={divNode}
				class="border-svelte absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-dashed p-5"
			>
				i'm the target element
			</div>
		</div>
	</div>
	<div class="grid w-full place-items-center">
		<p>
			Element <span class="text-svelte font-semibold">{isVisible ? 'inside' : 'outside'}</span> the viewport
		</p>
	</div>
</div>
