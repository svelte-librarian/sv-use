<script lang="ts">
	import '../app.css';

	let { children } = $props();
</script>

<div class="relative w-full h-full flex flex-col divide-y divide-zinc-300">
	<nav class="relative w-full flex justify-center items-center gap-5 p-5">
		<a href="/">Home</a>
		<a href="/docs">Docs</a>
	</nav>
	<div class="relative w-full h-full">
		{@render children()}
	</div>
</div>
