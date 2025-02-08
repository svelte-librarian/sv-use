<script lang="ts">
	import { Button } from '$lib/components/atoms/index.js';
	import { createSpeechRecognition, watch } from '$sv-use/core';
	import { cn } from '$utils/cn.js';

	function sample<T>(arr: T[], size: number) {
		const shuffled = arr.slice(0);

		let i = arr.length;
		let temp: T;
		let index: number;

		while (i--) {
			index = Math.floor((i + 1) * Math.random());
			temp = shuffled[index];
			shuffled[index] = shuffled[i];
			shuffled[i] = temp;
		}

		return shuffled.slice(0, size);
	}

	const colors = [
		'aqua',
		'azure',
		'beige',
		'bisque',
		'black',
		'blue',
		'brown',
		'chocolate',
		'coral',
		'crimson',
		'cyan',
		'fuchsia',
		'ghostwhite',
		'gold',
		'goldenrod',
		'gray',
		'green',
		'indigo',
		'ivory',
		'khaki',
		'lavender',
		'lime',
		'linen',
		'magenta',
		'maroon',
		'moccasin',
		'navy',
		'olive',
		'orange',
		'orchid',
		'peru',
		'pink',
		'plum',
		'purple',
		'red',
		'salmon',
		'sienna',
		'silver',
		'snow',
		'tan',
		'teal',
		'thistle',
		'tomato',
		'turquoise',
		'violet',
		'white',
		'yellow',
		'transparent'
	];

	const grammar = `#JSGF V1.0; grammar colors; public <color> = ${colors.join(' | ')} ;`;

	let sampled = $state<string[]>([]);
	let color = $state('transparent');
	let lang = $state('en-US');

	const speech = createSpeechRecognition({
		lang: () => lang,
		onError(error) {
			console.log(`An error occurred : ${error}`);
		}
	});

	if (speech.isSupported) {
		// @ts-expect-error missing types
		const SpeechGrammarList = window.SpeechGrammarList || window.webkitSpeechGrammarList;
		const speechRecognitionList = new SpeechGrammarList();
		speechRecognitionList.addFromString(grammar, 1);
		speech.recognition!.grammars = speechRecognitionList;

		watch(
			() => speech.result,
			() => {
				for (const i of speech.result.toLowerCase().split(' ').reverse()) {
					if (colors.includes(i)) {
						color = i;
						break;
					}
				}
			}
		);
	}

	function start() {
		color = 'transparent';
		speech.result = '';
		sampled = sample(colors, 5);
		speech.start();
	}

	function changeLanguage(newLang: string) {
		speech.stop();
		lang = newLang;
	}
</script>

<div class="relative flex w-full flex-col gap-2">
	{#if !speech.isSupported}
		<div class="relative flex w-full flex-col items-start gap-2 dark:text-zinc-200">
			<p>Your browser does not support the Speech Recognition API.</p>
			<a
				target="_blank"
				href="https://caniuse.com/speech-recognition"
				class="bg-svelte dark:bg-darksvelte rounded-md px-3 py-1 text-white"
			>
				More details on caniuse.
			</a>
		</div>
	{:else}
		<div class="relative flex w-full flex-col gap-3">
			<div class="space-x-4">
				{@render language('English (US)', 'en-US')}
				{@render language('French', 'fr')}
				{@render language('Spanish', 'es')}
			</div>
			{#if !speech.isListening}
				<Button onclick={start}>Press and talk</Button>
			{:else}
				{@const bgColor = lang === 'en-US' ? `background: ${color}` : ''}
				<Button onclick={() => speech.stop()}>Stop</Button>
				{#if lang === 'en-US'}
					<p class="text-sm italic text-zinc-500 dark:text-zinc-400">
						Speak some english ! Try one of these colors : {sampled.join(', ')}
					</p>
				{:else if lang === 'es'}
					<p class="text-sm italic text-zinc-500 dark:text-zinc-400">Speak some spanish!</p>
				{:else if lang === 'fr'}
					<p class="text-sm italic text-zinc-500 dark:text-zinc-400">Speak some french!</p>
				{/if}
				<p class="dark:text-zinc-200" style={bgColor}>
					{speech.result}
				</p>
			{/if}
		</div>
	{/if}
</div>

{#snippet language(label: string, value: string)}
	<label
		class="my-auto inline-flex cursor-pointer select-none items-center gap-2 dark:text-zinc-200"
	>
		<input
			type="radio"
			checked={lang === value}
			onchange={() => changeLanguage(value)}
			class={cn(
				'relative mr-1 h-4 w-4 select-none rounded-full bg-zinc-500/30 p-0',
				'inline-block shrink-0 select-none appearance-none bg-origin-border',
				'after:checked:bg-svelte dark:after:checked:bg-darksvelte',
				'after:absolute after:inset-[3px] after:rounded-full after:content-[""]'
			)}
		/>
		{label}
	</label>
{/snippet}
