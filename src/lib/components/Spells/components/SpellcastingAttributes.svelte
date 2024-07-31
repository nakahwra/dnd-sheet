<script lang="ts">
	import * as Select from '$lib/components/ui/select/index.js';
	import type { Selected } from 'bits-ui';

	import { abilityScores, spellcastingInfo, type AbilityScoresKeys } from '$lib/stores/sheet';
	import { getModifier, getSignedModifier } from '$lib/utils';

	export let editMode = false;

	let modifier: number, proficiency: number, saveDC: number, attackBonus: number;

	function handleSelectedChange(selected: Selected<AbilityScoresKeys> | undefined): void {
		if (!selected) return;

		$spellcastingInfo.spellAbility = selected.value;
	}

	$: {
		modifier = Number(getModifier($abilityScores[selected.value].score));
		proficiency = Number($abilityScores.proficiency);
		saveDC = 8 + modifier + proficiency;
		attackBonus = modifier + proficiency;
	}

	$: selected = {
		value: $spellcastingInfo.spellAbility,
		label: $spellcastingInfo.spellAbility.toUpperCase()
	};
</script>

<div class="gap-6 xs:flex">
	<div class="flex flex-col gap-2">
		<span class="font-semibold">Ability</span>
		{#if editMode}
			<div class="flex items-center gap-2">
				<Select.Root bind:selected onSelectedChange={handleSelectedChange}>
					<Select.Trigger class="flex w-fit bg-zinc-100 px-4 py-5 dark:bg-zinc-900">
						<Select.Value placeholder="Select an ability" />
					</Select.Trigger>

					<Select.Content>
						<Select.Item value="strength">STRENGTH</Select.Item>
						<Select.Item value="dexterity">DEXTERITY</Select.Item>
						<Select.Item value="constitution">CONSTITUTION</Select.Item>
						<Select.Item value="intelligence">INTELLIGENCE</Select.Item>
						<Select.Item value="wisdom">WISDOM</Select.Item>
						<Select.Item value="charisma">CHARISMA</Select.Item>
					</Select.Content>
				</Select.Root>

				{getSignedModifier(modifier)}
			</div>
		{:else}
			<span class="w-fit rounded-md border-[1px] px-4 py-2">
				{selected.label.toUpperCase()}: {getSignedModifier(modifier)}
			</span>
		{/if}
	</div>

	<div class="flex flex-col gap-2">
		<span class="font-semibold">Save DC</span>
		<span class="w-fit rounded-md border-[1px] px-4 py-2">
			{#if editMode}
				8 {modifier >= 0 ? '+' : '-'} {Math.abs(modifier)} + {$abilityScores.proficiency}
			{:else}
				{getSignedModifier(saveDC)}
			{/if}
		</span>
	</div>

	<div class="flex flex-col gap-2">
		<span class="font-semibold">Attack Bonus</span>
		<span class="w-fit rounded-md border-[1px] px-4 py-2">
			{#if editMode}
				{Math.abs(modifier)} + {$abilityScores.proficiency}
			{:else}
				{getSignedModifier(attackBonus)}
			{/if}
		</span>
	</div>
</div>
