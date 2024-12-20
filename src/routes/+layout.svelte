<script lang="ts">
	import '../app.css';

	let { children } = $props();
</script>

<div class="relative flex h-full w-full flex-col divide-y divide-zinc-300">
	<nav class="relative flex w-full items-center justify-center gap-5 p-5">
		<a href="/">Home</a>
		<a href="/docs">Docs</a>
	</nav>
	<div class="relative h-full w-full">
		{@render children()}
	</div>
</div>
