<script lang="ts">
	import '../app.css';
	import { page } from '$app/stores';
	import Navigation from './Navigation.svelte';

	let { children } = $props();
</script>

<div class="relative flex min-h-full w-full flex-col dark:bg-zinc-900">
	<Navigation />
	<div class="relative w-full">
		{@render children()}
	</div>
</div>
