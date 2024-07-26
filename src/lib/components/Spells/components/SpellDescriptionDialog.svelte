<script lang="ts">
	import * as Dialog from '$lib/components/ui/dialog';
	import DescriptionText from './DescriptionText.svelte';

	import type { Spell } from '$lib/stores/sheet';
	import { replaceFootToMeter } from '$lib/utils';

	export let isOpen = false;
	export let spell: Spell;

	const diceNotationRegex = /\b\d+d\d+(?:\s*\+\s*\d+)?(?:\s+\w+\s+damage)?\b/g;
	const savingThrowRegex =
		/\b(Intelligence|Dexterity|Strength|Charisma|Constitution|Wisdom)\s+saving throw\b/gi;

	const rolls = new Set<string>();
	const st = new Set<string>();

	let match;
	while ((match = diceNotationRegex.exec(spell.description)) !== null) {
		rolls.add(match[0]);
	}

	while ((match = savingThrowRegex.exec(spell.description)) !== null) {
		st.add(match[1]);
	}

	const diceNotation = Array.from(rolls).join(', ');
	const savingThrows = Array.from(st).join(', ');

	function getComponents(spell: Spell) {
		const components = [];

		if (spell.S) components.push('S');
		if (spell.V) components.push('V');
		if (spell.M) components.push('M: ' + spell.M);

		return components.join(', ');
	}
</script>

<Dialog.Root bind:open={isOpen}>
	<Dialog.Content>
		<Dialog.Header>
			<Dialog.Title>{spell.name}</Dialog.Title>

			<DescriptionText label="Level" value={String(spell.level)} />
			<DescriptionText label="Casting Time" value={spell.casting_time} />
			<DescriptionText label="Range" value={replaceFootToMeter(spell.range)} />
			<DescriptionText label="Components" value={getComponents(spell)} />
			<DescriptionText label="Duration" value={spell.duration} />
		</Dialog.Header>

		{replaceFootToMeter(spell?.description)}

		{#if diceNotation}
			<DescriptionText label="Dice notations" value={diceNotation} />
		{/if}

		{#if savingThrows}
			<DescriptionText label="Saving Throws" value={savingThrows} />
		{/if}
	</Dialog.Content>
</Dialog.Root>
