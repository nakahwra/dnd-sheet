<script>
	import * as Card from '$lib/components/ui/card';
	import InfoIcon from '~icons/material-symbols/info-outline';
	import Input from './components/Input.svelte';

	import { info } from '$lib/stores/sheet';
</script>

<Card.Root>
	<Card.Header>
		<Card.Title class="flex flex-row gap-2">
			<InfoIcon />
			Info
		</Card.Title>
	</Card.Header>

	<Card.Content class="xs:grid-cols-3 grid grid-cols-1 gap-2">
		<Input label="Character Name" bind:value={$info.characterName} />
		<Input label="Class" bind:value={$info.class} />
		<Input label="Race" bind:value={$info.race} />
		<Input label="Background" bind:value={$info.background} />
		<Input label="Alignment" bind:value={$info.alignment} />
		<Input label="Player Name" bind:value={$info.playerName} />
	</Card.Content>
</Card.Root>
