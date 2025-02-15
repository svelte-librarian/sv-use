<script lang="ts">
	import { Button } from '$lib/components/atoms/index.js';
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
	<p class="dark:text-zinc-200">Is long press ? {isLongPress}</p>
	<p class="dark:text-zinc-200">Is click ? {isClick}</p>
	<div class="relative flex w-full flex-wrap gap-3">
		<Button bind:el={element500Ms} class="bg-svelte rounded-md px-3 py-1 text-white">
			Long press (500ms)
		</Button>
		<Button bind:el={element1000Ms} class="bg-svelte rounded-md px-3 py-1 text-white">
			Long press (1000ms)
		</Button>
		<Button bind:el={elementClickOr1000Ms} class="bg-svelte rounded-md px-3 py-1 text-white">
			Long press (1000ms) or click
		</Button>
		<Button onclick={reset} class="bg-svelte rounded-md px-3 py-1 text-white">Reset</Button>
	</div>
</div>
