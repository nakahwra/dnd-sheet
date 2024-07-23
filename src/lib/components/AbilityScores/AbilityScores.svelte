<script lang="ts">
	import AbilityScoreIcon from '~icons/material-symbols/cognition-outline';
	import Ability from './components/Ability.svelte';

	import { sheet, type AbilityScoresKeys } from '$lib/stores/sheet';

	let abilityTypes = Object.keys($sheet.abilityScores) as Array<AbilityScoresKeys>;
</script>

<div class="rounded-md border-2 border-slate-400 bg-slate-100 p-2">
	<div class="mb-2 flex items-center gap-2">
		<AbilityScoreIcon class="text-slate-400" />
		<h1 class=" font-bold text-slate-400">Ability Scores</h1>
	</div>

	<ul class="flex flex-col gap-4">
		{#each abilityTypes as t}
			<li>
				<Ability abilityType={t} bind:value={$sheet.abilityScores[t]} />
			</li>
		{/each}
	</ul>
</div>
