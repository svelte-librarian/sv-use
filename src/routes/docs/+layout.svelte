<script lang="ts">
	import Navigation from './Navigation.svelte';

	let { children, data } = $props();
</script>

<div class="relative flex h-full w-full flex-col lg:flex-row">
	<Navigation utilityGroups={data.utilityGroups} />
	<div class="relative h-full w-full">
		<div class="relative mx-auto w-full max-w-[720px] p-5">
			{@render children()}
		</div>
	</div>
</div>
