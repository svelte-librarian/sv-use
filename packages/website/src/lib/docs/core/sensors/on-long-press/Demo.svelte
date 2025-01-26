<script lang="ts">
	import { onLongPress } from '$sv-use/core';

	let element500Ms = $state<HTMLButtonElement>();
	let element1000Ms = $state<HTMLButtonElement>();
	let elementClickOr1000Ms = $state<HTMLButtonElement>();

	let isLongPress = $state(false);
	let isClick = $state(false);

	onLongPress(
		() => element500Ms,
		() => {
			isLongPress = true;
		}
	);

	onLongPress(
		() => element1000Ms,
		() => {
			isLongPress = true;
		},
		{
			delay: 1000
		}
	);

	onLongPress(
		() => elementClickOr1000Ms,
		() => {
			isLongPress = true;
		},
		{
			delay: 1000,
			onMouseUp(duration, distance, isLongPress) {
				if (!isLongPress) {
					isClick = true;
				}
			}
		}
	);

	function reset() {
		isLongPress = false;
		isClick = false;
	}
</script>

<div class="relative flex w-full flex-col gap-2">
	<span>Is long press ? {isLongPress}</span>
	<span>Is click ? {isClick}</span>
	<div class="relative flex w-full flex-wrap gap-3">
		<button bind:this={element500Ms} class="bg-svelte rounded-md px-3 py-1 text-white">
			Long press (500ms)
		</button>
		<button bind:this={element1000Ms} class="bg-svelte rounded-md px-3 py-1 text-white">
			Long press (1000ms)
		</button>
		<button bind:this={elementClickOr1000Ms} class="bg-svelte rounded-md px-3 py-1 text-white">
			Long press (1000ms) or click
		</button>
		<button onclick={reset} class="bg-svelte rounded-md px-3 py-1 text-white">Reset</button>
	</div>
</div>
