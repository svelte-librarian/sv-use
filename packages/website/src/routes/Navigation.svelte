<script lang="ts">
	import { base } from '$app/paths';
</script>

<nav
	class="relative flex w-full items-center justify-between border-b border-zinc-300 bg-[#fafafa] px-5 py-5 lg:hidden"
>
	<a href={base} class="flex items-center gap-5">
		<span class="text-svelte text-sm font-semibold">SvelteUse</span>
	</a>
	<a href="https://github.com/svelte-librarian/sv-use" target="_blank">
		<img src="/sv-use/logos/github/dark.svg" alt="SvelteUse's Github Repository" class="h-6" />
	</a>
</nav>

<!-- DESKTOP -->

<div class="sticky left-0 top-0 z-10 hidden w-full border-b border-zinc-300 bg-[#fafafa] lg:flex">
	<nav
		class="relative mx-auto flex h-full w-full max-w-[900px] items-center justify-between px-5 py-5"
	>
		<a href={base} class="flex items-center gap-5">
			<span class="text-svelte font-semibold">SvelteUse</span>
		</a>
		<a href="https://github.com/svelte-librarian/sv-use" target="_blank">
			<img src="{base}/logos/github/dark.svg" alt="SvelteUse's Github Repository" class="h-6" />
		</a>
	</nav>
</div>
