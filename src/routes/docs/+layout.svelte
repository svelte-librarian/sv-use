<script lang="ts">
	import Navigation from './Navigation.svelte';

	let { children } = $props();
</script>

<div class="relative flex h-full w-full flex-col divide-y divide-zinc-300 lg:flex-row lg:divide-x">
	<Navigation />
	<div class="relative h-full w-full p-5">
		{@render children()}
	</div>
</div>
