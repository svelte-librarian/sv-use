<script lang="ts">
	import { toggleTheme } from '$lib/contexts/theme.svelte.js';
	import { cn } from '$utils/cn.js';
</script>

<button
	onclick={toggleTheme}
	title="Switch theme"
	aria-label="Switch theme"
	class="border-svelte dark:border-darksvelte relative h-6 w-12 rounded-full border"
>
	<span
		class={cn(
			'absolute top-1/2 inline-flex aspect-square h-[18px] -translate-y-1/2 items-center justify-center rounded-full duration-150 ease-in-out',
			'bg-svelte dark:bg-darksvelte left-[3px] dark:left-full dark:-translate-x-[calc(100%+3px)]'
		)}
	>
		<!-- Sun -->
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="13"
			height="13"
			viewBox="0 0 24 24"
			fill="none"
			stroke="white"
			stroke-width="1"
			stroke-linecap="round"
			stroke-linejoin="round"
			class="icon icon-tabler icons-tabler-outline icon-tabler-sun dark:hidden"
		>
			<path stroke="none" d="M0 0h24v24H0z" fill="none" />
			<path d="M12 12m-4 0a4 4 0 1 0 8 0a4 4 0 1 0 -8 0" />
			<path
				d="M3 12h1m8 -9v1m8 8h1m-9 8v1m-6.4 -15.4l.7 .7m12.1 -.7l-.7 .7m0 11.4l.7 .7m-12.1 -.7l-.7 .7"
			/>
		</svg>
		<!-- Moon -->
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="13"
			height="13"
			viewBox="0 0 24 24"
			fill="none"
			stroke="white"
			stroke-width="1"
			stroke-linecap="round"
			stroke-linejoin="round"
			class="icon icon-tabler icons-tabler-outline icon-tabler-moon hidden dark:block"
		>
			<path stroke="none" d="M0 0h24v24H0z" fill="none" />
			<path d="M12 3c.132 0 .263 0 .393 0a7.5 7.5 0 0 0 7.92 12.446a9 9 0 1 1 -8.313 -12.454z" />
		</svg>
	</span>
</button>
