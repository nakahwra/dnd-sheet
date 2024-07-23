<script>
	import IconAccessibility from '~icons/material-symbols/info-outline';
	import Input from './components/Input.svelte';

	export let sheet;
</script>

<header class="rounded-md border-2 border-slate-400 bg-slate-100 p-2">
	<div class="mb-2 flex items-center gap-2">
		<IconAccessibility class="text-slate-400" />
		<h1 class=" font-bold text-slate-400">Info</h1>
	</div>

	<div class="grid grid-cols-3 gap-2">
		<Input label="Character Name" value={sheet.characterName} />
		<Input label="Class" value={sheet.class} />
		<Input label="Race" value={sheet.race} />
		<Input label="Background" value={sheet.background} />
		<Input label="Alignment" value={sheet.alignment} />
		<Input label="Player Name" value={sheet.playerName} />
	</div>
</header>
