<script lang="ts">
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
		<p>Loading the recipe with id {id}...</p>
	{:else}
		<div class="flex flex-col">
			{#if 'message' in recipe.current}
				<p>Oops ! {recipe.current.message}</p>
			{:else}
				<span>ID : {recipe.current.id}</span>
				<span>Title : {recipe.current.title}</span>
				<span>Tags : {recipe.current.tags.join(', ')}</span>
			{/if}
		</div>
	{/if}
	<div class="flex gap-5">
		<button onclick={() => id--} class="rounded-md bg-svelte px-3 py-1 text-white">
			Previous recipe
		</button>
		<button onclick={() => id++} class="rounded-md bg-svelte px-3 py-1 text-white">
			Next recipe
		</button>
	</div>
</div>
