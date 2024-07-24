<script lang="ts">
	import type { AbilityScoresKeys, AbilityScoreType } from '$lib/stores/sheet';
	import { getModifier, getSignedModifier } from '$lib/utils';

	import { Input } from '$lib';
	import { Separator } from '$lib/components/ui/separator';
	import { sheet } from '$lib/stores/sheet';

	export let id: string;
	export let name: string;
	export let damage: string;
	export let ability: AbilityScoresKeys;
	export let proficiency: boolean;
	export let edit: boolean = false;

	const abilityOptions = (Object.keys($sheet.abilityScores) as AbilityScoresKeys[]).filter(
		(a) => a !== 'proficiency'
	);

	let modifier: number;
	let abilityMod: number;

	$: {
		const profBonus = proficiency ? Number($sheet.abilityScores.proficiency) : 0;

		abilityMod = getModifier(($sheet.abilityScores[ability] as AbilityScoreType).score);
		modifier = abilityMod + profBonus;
	}
</script>

{#if edit}
	<div class="flex flex-col gap-2">
		<Input id={name} label={'Attack Name'} type="text" bind:value={name} />
		<Input
			id={ability}
			label={'Attack Modifier'}
			type="select"
			options={abilityOptions}
			bind:value={ability}
		/>
		<Input id={`${id}-prof`} label="Proficiency" type="checkbox" bind:value={proficiency} />
		<Input id={damage} label={'Attack Damage'} type="text" bind:value={damage} />
		<Separator class="mb-5 mt-6" />
	</div>
{:else}
	<div class="grid grid-cols-3 justify-items-center">
		<span>{name}</span>
		<span>{getSignedModifier(modifier)}</span>
		<span>{damage} {getSignedModifier(abilityMod)}</span>
	</div>
{/if}
