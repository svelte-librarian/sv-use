<script lang="ts">
	import { browser } from '$app/environment';
	import { createShare } from '@sv-use/core';
	import { Button, Input } from '$lib/components/atoms/index.js';

	let text = $state('A collection of Svelte 5 utilities.');
	const data = $state({
		title: () => 'SvelteUse',
		text: () => text,
		url: browser ? location.href : ''
	});

	const share = createShare(data);

	async function startShare() {
		try {
			await share.share();
		} catch (err) {
			console.error(err);
		}
	}
</script>

<div class="relative flex w-full flex-col gap-2">
	{#if share.isSupported}
		<Input bind:value={text} placeholder="Note" />
		<Button onclick={startShare}>Share</Button>
	{:else}
		<p class="dark:text-zinc-200">Web share is not supported in your browser :(</p>
	{/if}
</div>
