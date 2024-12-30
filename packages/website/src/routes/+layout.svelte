<script lang="ts">
	import { page } from '$app/stores';
	import '../app.css';
	import Navigation from './Navigation.svelte';

	let { children } = $props();

	let pathname = $derived($page.url.pathname);
</script>

<div class="relative flex w-full flex-col {pathname === '/' ? 'h-full' : ''}">
	<Navigation />
	<div class="relative w-full {pathname === '/' ? 'h-full' : ''}">
		{@render children()}
	</div>
</div>
