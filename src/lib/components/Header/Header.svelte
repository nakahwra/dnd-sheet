<script>
	import * as Card from '$lib/components/ui/card';
	import InfoIcon from '~icons/material-symbols/info-outline';
	import Input from './components/Input.svelte';

	import { sheet } from '$lib/stores/sheet';

	let { info } = $sheet;
</script>

<Card.Root>
	<Card.Header>
		<Card.Title class="flex flex-row gap-2">
			<InfoIcon />
			Info
		</Card.Title>
	</Card.Header>

	<Card.Content class="grid grid-cols-3 gap-2">
		<Input label="Character Name" value={info.characterName} />
		<Input label="Class" value={info.class} />
		<Input label="Race" value={info.race} />
		<Input label="Background" value={info.background} />
		<Input label="Alignment" value={info.alignment} />
		<Input label="Player Name" value={info.playerName} />
	</Card.Content>
</Card.Root>
