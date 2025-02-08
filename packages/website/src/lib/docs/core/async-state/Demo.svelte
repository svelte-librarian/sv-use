<script lang="ts">
	import { Button } from '$lib/components/atoms/index.js';
	import { asyncState } from '$sv-use/core';

	type Recipe = {
		id: number;
		title: string;
		tags: string[];
	};

	let id = $state(1);
	const recipe = asyncState(
		async (id: number) => {
			const result = await fetch(`https://dummyjson.com/recipes/${id}`);
			return (await result.json()) as Recipe;
		},
		{} as Recipe,
		{
			immediate: false
		}
	);

	$effect(() => {
		recipe.execute(id);
	});
</script>

<div class="flex flex-col items-start gap-5">
	{#if !recipe.isReady}
		<p class="dark:text-zinc-200">Loading the recipe with id {id}...</p>
	{:else}
		<div class="flex flex-col">
			{#if 'message' in recipe.current}
				<p class="dark:text-zinc-200">Oops ! {recipe.current.message}</p>
			{:else}
				<p class="dark:text-zinc-200">ID : {recipe.current.id}</p>
				<p class="dark:text-zinc-200">Title : {recipe.current.title}</p>
				<p class="dark:text-zinc-200">Tags : {recipe.current.tags.join(', ')}</p>
			{/if}
		</div>
	{/if}
	<div class="flex gap-5">
		<Button onclick={() => id--}>Previous recipe</Button>
		<Button onclick={() => id++}>Next recipe</Button>
	</div>
</div>
