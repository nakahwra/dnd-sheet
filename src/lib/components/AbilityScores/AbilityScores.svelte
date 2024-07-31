<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import { Checkbox } from '$lib/components/ui/checkbox';
	import { Switch } from '$lib/components/ui/switch';

	import AbilityScoreIcon from '~icons/material-symbols/cognition-outline';
	import Ability from './components/Ability.svelte';

	import { abilityScores, type AbilityScoresKeys, type SkillType } from '$lib/stores/sheet';
	import { getModifier } from '$lib/utils';

	let abilityTypes = Object.keys($abilityScores) as Array<AbilityScoresKeys>;
	let edit = false;

	function getTotalModifier(abilityScore: number, proficiencyBonus: number, skill: SkillType) {
		const profBonusNumber = Number(proficiencyBonus);
		let modifier = getModifier(abilityScore);

		if (skill.expertise) modifier += profBonusNumber;
		if (skill.proficiency) modifier += profBonusNumber;

		return modifier >= 0 ? `+${modifier}` : `${modifier}`;
	}
</script>

<Card.Root class="md:w-[310px]">
	<Card.Header class="flex flex-row items-start justify-between gap-4">
		<Card.Title class="flex flex-row gap-2">
			<AbilityScoreIcon />
			Ability Scores
		</Card.Title>
		<Switch class="!mt-0" bind:checked={edit} />
	</Card.Header>

	<Card.Content>
		<ul class="flex flex-col gap-4">
			<li>
				<Ability abilityType="prof." bind:value={$abilityScores.proficiency} />
			</li>
			<div
				class="grid w-full flex-wrap justify-between gap-4 gap-x-2 xs:grid-cols-2 xs:gap-y-10 md:flex md:gap-4"
			>
				{#each abilityTypes as t}
					{#if t !== 'proficiency'}
						<li class="flex gap-4">
							<Ability abilityType={t.slice(0, 3)} bind:value={$abilityScores[t].score} />

							<div class="mt-4 flex flex-col md:justify-center">
								{#each Object.keys($abilityScores[t].skills) as s}
									<div class="flex items-center gap-2">
										{#if edit}
											<Checkbox
												class={`${edit ? 'visible' : 'invisible'} `}
												bind:checked={$abilityScores[t].skills[s].proficiency}
											/>
											<Checkbox
												class={`${edit ? 'visible' : 'invisible'} `}
												bind:checked={$abilityScores[t].skills[s].expertise}
												disabled={!$abilityScores[t].skills[s].proficiency}
											/>
										{/if}

										<span
											>{getTotalModifier(
												$abilityScores[t].score,
												$abilityScores['proficiency'],
												$abilityScores[t].skills[s]
											)}</span
										>

										<span>{s}</span>
									</div>
								{/each}
							</div>
						</li>
					{/if}
				{/each}
			</div>
		</ul>
	</Card.Content>
</Card.Root>
