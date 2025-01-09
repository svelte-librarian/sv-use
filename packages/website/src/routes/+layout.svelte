<script lang="ts">
	import { page } from '$app/stores';
	import '../app.css';
	import Navigation from './Navigation.svelte';

	let { children } = $props();

	let pathname = $derived($page.url.pathname);
</script>

<div
	class="relative flex min-h-full w-full flex-col bg-white dark:bg-zinc-900 {pathname === '/'
		? 'h-full'
		: ''}"
>
	<Navigation />
	<div class="relative w-full {pathname === '/' ? 'h-full' : ''}">
		{@render children()}
	</div>
</div>

<style lang="postcss">
	:global(html.dark h1) {
		@apply text-zinc-50;
	}

	:global(html.dark h2) {
		@apply text-zinc-50;
	}

	:global(html.dark h3) {
		@apply text-zinc-50;
	}

	:global(html.dark p) {
		@apply text-zinc-50;
	}

	:global(html.dark span) {
		@apply text-zinc-50;
	}

	:global(html.dark li) {
		@apply text-zinc-50;
	}
</style>
