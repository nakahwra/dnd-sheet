<script>
	import IconAccessibility from '~icons/material-symbols/info-outline';
	import Input from './components/Input.svelte';

	import { sheet } from '$lib/stores/sheet';

	let { info } = $sheet;
	console.log('info', info);
</script>

<header class="rounded-md border-2 border-slate-400 bg-slate-100 p-2">
	<div class="mb-2 flex items-center gap-2">
		<IconAccessibility class="text-slate-400" />
		<h1 class=" font-bold text-slate-400">Info</h1>
	</div>

	<div class="grid grid-cols-3 gap-2">
		<Input label="Character Name" value={info.characterName} />
		<Input label="Class" value={info.class} />
		<Input label="Race" value={info.race} />
		<Input label="Background" value={info.background} />
		<Input label="Alignment" value={info.alignment} />
		<Input label="Player Name" value={info.playerName} />
	</div>
</header>
