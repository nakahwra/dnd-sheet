<script lang="ts">
	import type { AbilityScoresKeys } from '$lib/stores/sheet';

	export let abilityType: AbilityScoresKeys;
	export let value: number;

	$: modifier = Math.floor((value - 10) / 2);
</script>

<div class="flex flex-col items-center">
	<label class="font-bold text-slate-600" for={abilityType}
		>{abilityType.toUpperCase().slice(0, 3)}</label
	>
	<div class="rounded-full border-8 border-solid border-slate-300 bg-slate-300">
		<input class="max-w-[35px] bg-inherit text-center" type="number" id={abilityType} bind:value />
	</div>
	<span>{modifier > 0 ? `+${modifier}` : modifier}</span>
</div>
