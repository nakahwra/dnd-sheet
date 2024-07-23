<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import { Checkbox } from '$lib/components/ui/checkbox';
	import { Switch } from '$lib/components/ui/switch';

	import AbilityScoreIcon from '~icons/material-symbols/cognition-outline';
	import Ability from './components/Ability.svelte';

	import { sheet, type AbilityScoresKeys, type SkillType } from '$lib/stores/sheet';

	let abilityTypes = Object.keys($sheet.abilityScores) as Array<AbilityScoresKeys>;
	let edit = false;

	function getTotalModifier(abilityScore: number, proficiencyBonus: number, skill: SkillType) {
		let modifier = Math.floor((abilityScore - 10) / 2);

		if (skill.expertise) modifier += proficiencyBonus;
		if (skill.proficiency) modifier += proficiencyBonus;

		return modifier >= 0 ? `+${modifier}` : `${modifier}`;
	}
</script>

<Card.Root class="w-[310px]">
	<Card.Header class="flex flex-row items-end justify-between gap-4">
		<Card.Title class="flex flex-row gap-2">
			<AbilityScoreIcon />
			Ability Scores
		</Card.Title>
		<Switch bind:checked={edit} />
	</Card.Header>

	<Card.Content>
		<ul class="flex flex-col gap-4">
			{#each abilityTypes as t}
				{#if t === 'proficiency'}
					<li>
						<Ability abilityType="prof." bind:value={$sheet.abilityScores.proficiency} />
					</li>
				{:else}
					<li class="flex gap-4">
						<Ability abilityType={t.slice(0, 3)} bind:value={$sheet.abilityScores[t].score} />

						<div class="mt-4 flex flex-col justify-center">
							{#each Object.keys($sheet.abilityScores[t].skills) as s}
								<div class="flex items-center gap-2">
									{#if edit}
										<Checkbox
											class={`${edit ? 'visible' : 'invisible'} `}
											bind:checked={$sheet.abilityScores[t].skills[s].proficiency}
										/>
										<Checkbox
											class={`${edit ? 'visible' : 'invisible'} `}
											bind:checked={$sheet.abilityScores[t].skills[s].expertise}
											disabled={!$sheet.abilityScores[t].skills[s].proficiency}
										/>
									{/if}

									<span
										>{getTotalModifier(
											$sheet.abilityScores[t].score,
											$sheet.abilityScores['proficiency'],
											$sheet.abilityScores[t].skills[s]
										)}</span
									>

									<span>{s}</span>
								</div>
							{/each}
						</div>
					</li>
				{/if}
			{/each}
		</ul>
	</Card.Content>
</Card.Root>
