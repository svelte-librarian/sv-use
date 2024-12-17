<script lang="ts">
	import Navigation from './Navigation.svelte';

	let { children } = $props();
</script>

<div class="relative w-full h-full flex divide-x divide-zinc-300">
	<Navigation />
	<div class="relative w-full h-full p-5">
		{@render children()}
	</div>
</div>
