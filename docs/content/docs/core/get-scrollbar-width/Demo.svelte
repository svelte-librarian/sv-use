<script lang="ts">
	import { TextArea } from '$lib/components/atoms/index.js';
	import { getScrollbarWidth } from '@sv-use/core';
	import { cn } from '$utils/cn.js';

	type ScrollbarThickness = 'auto' | 'thin' | 'none';

	let el = $state<HTMLTextAreaElement>();
	const scrollbarWidth = getScrollbarWidth(() => el);

	let scrollbarThickness = $state<ScrollbarThickness>('auto');
	let overflowAxis = $state<'x' | 'y'>('y');

	const content =
		'Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta itaque repudiandae vel sint iure pariatur illum nesciunt iste, voluptate atque unde illo mollitia expedita dolor veniam magnam minus, cum rem non deleniti officiis laudantium ut minima. Ipsum corrupti, inventore, earum tempora accusantium quasi commodi, ducimus illum eum nam harum voluptates est? Facilis ullam, adipisci maiores, veniam tempora animi voluptatum quae, repudiandae corrupti cum dolorum. Odio, iste. Cupiditate assumenda, quae quasi quia eum autem exercitationem, culpa adipisci laborum reiciendis est aspernatur delectus minima ad harum veritatis. Fuga et magnam recusandae asperiores similique aspernatur, officia quibusdam esse impedit neque animi veniam earum.';

	function changeThickness(event: Event & { currentTarget: EventTarget & HTMLSelectElement }) {
		scrollbarThickness = event.currentTarget.value as ScrollbarThickness;
	}
</script>

<div
	id="get-scrollbar-width-container"
	class="relative flex w-full flex-col items-start justify-center gap-5 overflow-hidden"
>
	<p class="dark:text-zinc-200">
		Current Width : X = {scrollbarWidth.x}px | Y = {scrollbarWidth.y}px
	</p>
	<div class="flex items-center gap-5 dark:text-zinc-200">
		Scrollbar thickness ?
		<select onchange={changeThickness} class="rounded-md px-3 py-2 text-sm dark:bg-zinc-800">
			<option value="auto">Auto</option>
			<option value="thin">Thin</option>
			<option value="none">None</option>
		</select>
	</div>
	<div class="flex items-center gap-5 dark:text-zinc-200">
		Overflow axis ?
		<label>
			X
			<input type="radio" checked={overflowAxis === 'x'} onclick={() => (overflowAxis = 'x')} />
		</label>
		<label>
			Y
			<input type="radio" checked={overflowAxis === 'y'} onclick={() => (overflowAxis = 'y')} />
		</label>
	</div>
	<TextArea
		bind:el
		value={content}
		style="scrollbar-width: {scrollbarThickness};"
		class={cn(
			'relative h-40 w-40 resize dark:text-zinc-200',
			overflowAxis === 'y' ? '' : 'whitespace-pre'
		)}
	/>
</div>
