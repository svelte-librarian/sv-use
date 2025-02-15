<script lang="ts">
	import { Button } from '$lib/components/atoms/index.js';
	import { createDropZone } from '@sv-use/core';
	import { cn } from '$utils/cn.js';

	let genericContainer = $state<HTMLElement>();
	let imageContainer = $state<HTMLElement>();

	const genericDropZone = createDropZone(() => genericContainer);
	const imageDropZone = createDropZone(() => imageContainer, { allowedDataTypes: 'image/*' });

	function round(num: number, fractionDigits: number) {
		const m = 10 * fractionDigits;
		return Math.floor(num * m) / m;
	}

	function fileSizeToString(size: number) {
		const SIZES = ['B', 'KB', 'MB', 'GB'];

		let index = 0;
		while (size >= 1024) {
			size /= 1024;
			index++;
		}

		return `${round(size, 2)} ${SIZES[index]}`;
	}
</script>

<div class="relative flex w-full flex-col gap-5 dark:text-zinc-200">
	<p>Drop files from your computer on to one of the drop zones.</p>
	<div class="relative flex w-full flex-col gap-5 md:flex-row">
		<div class="relative flex w-full flex-col gap-2">
			<div
				bind:this={genericContainer}
				class={cn(
					'rounded-m relative flex h-[200px] w-full flex-col items-center justify-center gap-2 rounded-md',
					genericDropZone.isOver ? 'bg-svelte text-zinc-50' : 'bg-zinc-200 dark:bg-zinc-800'
				)}
			>
				<span class="font-semibold">General Drop Zone</span>
				<span>Is Over ? {genericDropZone.isOver}</span>
			</div>
			<div class="relative flex w-full flex-col items-start gap-2">
				<div class="relative flex w-full items-center justify-between">
					<span>Files</span>
					<Button onclick={() => (genericDropZone.files = [])}>Clear</Button>
				</div>
				{#if genericDropZone.files !== null}
					<div class="relative flex w-full flex-col divide-y divide-zinc-200">
						{#each genericDropZone.files as file}
							{@render attachment(file)}
						{/each}
					</div>
				{/if}
			</div>
		</div>
		<div class="relative flex w-full flex-col gap-2">
			<div
				bind:this={imageContainer}
				class={cn(
					'rounded-m relative flex h-[200px] w-full flex-col items-center justify-center gap-2 rounded-md',
					imageDropZone.isOver ? 'bg-svelte text-zinc-50' : 'bg-zinc-200 dark:bg-zinc-800'
				)}
			>
				<span class="font-semibold">Image Drop Zone</span>
				<span>Is Over ? {imageDropZone.isOver}</span>
			</div>
			<div class="relative flex w-full flex-col items-start gap-2">
				<div class="relative flex w-full items-center justify-between">
					<span>Files</span>
					<Button onclick={() => (imageDropZone.files = [])}>Clear</Button>
				</div>
				{#if imageDropZone.files !== null}
					<div class="relative flex w-full flex-col divide-y divide-zinc-200">
						{#each imageDropZone.files as file}
							{@render attachment(file)}
						{/each}
					</div>
				{/if}
			</div>
		</div>
	</div>
</div>

{#snippet attachment(file: File)}
	<div class="relative flex w-full flex-col items-start gap-1 py-2">
		<span class="text-sm">Name : {file.name}</span>
		<span class="text-sm">Last modified : {new Date(file.lastModified).toLocaleString()}</span>
		<span class="text-sm">Size : {fileSizeToString(file.size)}</span>
	</div>
{/snippet}
