<script lang="ts">
	import { createObjectUrl } from '@sv-use/core';

	let file = $state<File | null>(null);
	const url = createObjectUrl(() => file);

	function onFileChange(event: Event & { currentTarget: EventTarget & HTMLInputElement }) {
		file = event.currentTarget.files?.[0] ?? null;
	}
</script>

<div class="relative flex w-full flex-col gap-2">
	<p class="text-sm text-zinc-500 dark:text-zinc-400">Select file :</p>
	<input type="file" onchange={onFileChange} class="dark:text-zinc-200" />
	<p class="text-sm text-zinc-500 dark:text-zinc-400">Object URL :</p>
	<code>
		{#if url.current}
			<a href={url.current} target="_blank" class="text-svelte dark:text-darksvelte underline">
				{url.current}
			</a>
		{:else}
			<p class="dark:text-zinc-200">none</p>
		{/if}
	</code>
</div>
