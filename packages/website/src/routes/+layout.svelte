<script lang="ts">
	import '../app.css';
	import { page } from '$app/stores';
	import Navigation from './Navigation.svelte';
	import { base } from '$app/paths';

	let { children } = $props();

	let pathname = $derived($page.url.pathname);
</script>

<div
	class="relative flex w-full flex-col {pathname === `${base}/` ? 'h-full' : ''} dark:bg-zinc-900"
>
	<Navigation />
	<div class="relative w-full dark:bg-zinc-900">
		{@render children()}
	</div>
</div>
