<script lang="ts">
	import AbilityScoreIcon from '~icons/material-symbols/cognition-outline';
	import Ability from './components/Ability.svelte';

	import { sheet, type AbilityScoresKeys, type SkillType } from '$lib/stores/sheet';

	let abilityTypes = Object.keys($sheet.abilityScores) as Array<AbilityScoresKeys>;

	function getTotalModifier(abilityScore: number, proficiencyBonus: number, skill: SkillType) {
		let modifier = Math.floor((abilityScore - 10) / 2);

		if (skill.expertise) modifier += proficiencyBonus;
		if (skill.proficiency) modifier += proficiencyBonus;

		return modifier >= 0 ? `+${modifier}` : `${modifier}`;
	}
</script>

<div class="rounded-md border-2 border-slate-400 bg-slate-100 p-2">
	<div class="mb-2 flex items-center gap-2">
		<AbilityScoreIcon class="text-slate-400" />
		<h1 class=" font-bold text-slate-400">Ability Scores</h1>
	</div>

	<ul class="flex flex-col gap-4">
		{#each abilityTypes as t}
			{#if t === 'proficiency'}
				<li>
					<Ability abilityType="prof." bind:value={$sheet.abilityScores.proficiency} />
				</li>
			{:else}
				<li class="flex gap-2">
					<Ability abilityType={t.slice(0, 3)} bind:value={$sheet.abilityScores[t].score} />

					<div class="texsla flex flex-col justify-start">
						{#each Object.keys($sheet.abilityScores[t].skills) as s}
							<div class="flex gap-2">
								<input
									type="checkbox"
									bind:checked={$sheet.abilityScores[t].skills[s].proficiency}
								/>
								<input
									type="checkbox"
									bind:checked={$sheet.abilityScores[t].skills[s].expertise}
									disabled={!$sheet.abilityScores[t].skills[s].proficiency}
								/>

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
</div>
