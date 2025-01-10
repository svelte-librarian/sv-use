<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';

	interface Props extends HTMLAttributes<HTMLPreElement> {
		/** The code to render. */
		code?: string | number | boolean | Record<string | number | symbol, unknown> | unknown[];
		/**
		 * Adds indentation, white space, and line break characters to the return-value JSON text to make it easier to read.
		 * @default 2
		 */
		space?: Parameters<typeof JSON.stringify>['2'];
	}

	let { class: className, code, space = 2, ...rest }: Props = $props();
</script>

<pre class="dark:text-zinc-50">
    {JSON.stringify(code, null, space)}
</pre>
