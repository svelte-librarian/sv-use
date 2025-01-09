<script lang="ts">
	import { base } from '$app/paths';
	import { theme } from '$lib/states/theme.svelte.js';

	function changeTheme() {
		theme.current = theme.current === 'light' ? 'dark' : 'light';
	}
</script>

<nav
	class="relative flex w-full items-center justify-between border-b border-zinc-300 bg-zinc-50 px-5 py-5 lg:hidden dark:border-zinc-700 dark:bg-zinc-900"
>
	<a href={base} class="text-svelte dark:text-svelte-dark text-sm font-semibold"> SvelteUse </a>
	<div class="relative flex items-center gap-5">
		<button onclick={changeTheme} aria-label="Change theme">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="24"
				height="24"
				viewBox="0 0 24 24"
				fill="none"
				stroke-width="2"
				stroke-linecap="round"
				stroke-linejoin="round"
				class="icon icon-tabler icons-tabler-outline icon-tabler-sun pointer-events-none stroke-zinc-900 dark:hidden dark:stroke-zinc-50"
			>
				<path stroke="none" d="M0 0h24v24H0z" fill="none" />
				<path d="M12 12m-4 0a4 4 0 1 0 8 0a4 4 0 1 0 -8 0" />
				<path
					d="M3 12h1m8 -9v1m8 8h1m-9 8v1m-6.4 -15.4l.7 .7m12.1 -.7l-.7 .7m0 11.4l.7 .7m-12.1 -.7l-.7 .7"
				/>
			</svg>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="24"
				height="24"
				viewBox="0 0 24 24"
				fill="none"
				stroke-width="2"
				stroke-linecap="round"
				stroke-linejoin="round"
				class="icon icon-tabler icons-tabler-outline icon-tabler-moon pointer-events-none hidden stroke-zinc-900 dark:block dark:stroke-zinc-50"
			>
				<path stroke="none" d="M0 0h24v24H0z" fill="none" />
				<path d="M12 3c.132 0 .263 0 .393 0a7.5 7.5 0 0 0 7.92 12.446a9 9 0 1 1 -8.313 -12.454z" />
			</svg>
		</button>
		<a href="https://github.com/svelte-librarian/sv-use" target="_blank" class="hidden dark:block">
			<img src="{base}/logos/github/white.svg" alt="SvelteUse's Github Repository" class="h-6" />
		</a>
		<a href="https://github.com/svelte-librarian/sv-use" target="_blank" class="dark:hidden">
			<img src="{base}/logos/github/dark.svg" alt="SvelteUse's Github Repository" class="h-6" />
		</a>
	</div>
</nav>

<!-- DESKTOP -->

<div
	class="sticky left-0 top-0 z-10 hidden w-full border-b border-zinc-300 bg-zinc-50 lg:flex dark:border-zinc-700 dark:bg-zinc-900"
>
	<nav
		class="relative mx-auto flex h-full w-full max-w-[900px] items-center justify-between px-5 py-5"
	>
		<a href={base} class="text-svelte dark:text-svelte-dark font-semibold"> SvelteUse </a>
		<div class="relative flex items-center gap-5">
			<button onclick={changeTheme} aria-label="Change theme">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="24"
					height="24"
					viewBox="0 0 24 24"
					fill="none"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
					class="icon icon-tabler icons-tabler-outline icon-tabler-sun pointer-events-none stroke-zinc-900 dark:hidden dark:stroke-zinc-50"
				>
					<path stroke="none" d="M0 0h24v24H0z" fill="none" />
					<path d="M12 12m-4 0a4 4 0 1 0 8 0a4 4 0 1 0 -8 0" />
					<path
						d="M3 12h1m8 -9v1m8 8h1m-9 8v1m-6.4 -15.4l.7 .7m12.1 -.7l-.7 .7m0 11.4l.7 .7m-12.1 -.7l-.7 .7"
					/>
				</svg>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="24"
					height="24"
					viewBox="0 0 24 24"
					fill="none"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
					class="icon icon-tabler icons-tabler-outline icon-tabler-moon pointer-events-none hidden stroke-zinc-900 dark:block dark:stroke-zinc-50"
				>
					<path stroke="none" d="M0 0h24v24H0z" fill="none" />
					<path
						d="M12 3c.132 0 .263 0 .393 0a7.5 7.5 0 0 0 7.92 12.446a9 9 0 1 1 -8.313 -12.454z"
					/>
				</svg>
			</button>
			<a
				href="https://github.com/svelte-librarian/sv-use"
				target="_blank"
				class="hidden dark:block"
			>
				<img src="{base}/logos/github/white.svg" alt="SvelteUse's Github Repository" class="h-6" />
			</a>
			<a href="https://github.com/svelte-librarian/sv-use" target="_blank" class="dark:hidden">
				<img src="{base}/logos/github/dark.svg" alt="SvelteUse's Github Repository" class="h-6" />
			</a>
		</div>
	</nav>
</div>
