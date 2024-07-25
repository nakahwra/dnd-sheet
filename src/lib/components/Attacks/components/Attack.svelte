<script lang="ts">
	import type { AbilityScoresKeys, AbilityScoreType, AttackType } from '$lib/stores/sheet';
	import { getModifier, getSignedModifier } from '$lib/utils';

	import { Button } from '$lib/components/ui/button';
	import { abilityScores } from '$lib/stores/sheet';

	import EditIcon from '~icons/mdi/pencil-outline';
	import DeleteIcon from '~icons/mdi/trash-outline';

	export let id: string = Math.random().toString(36).substr(2, 9);
	export let name: string;
	export let damage: string;
	export let ability: AbilityScoresKeys;
	export let proficiency: boolean;

	export let handleEdit: (atk: AttackType) => void;
	export let handleDelete: (id: string) => void;

	let modifier: number;
	let abilityMod: number;

	$: {
		const profBonus = proficiency ? Number($abilityScores.proficiency) : 0;

		abilityMod = getModifier(($abilityScores[ability] as AbilityScoreType).score);
		modifier = abilityMod + profBonus;
	}
</script>

<div class="grid grid-cols-4">
	<span>{name}</span>
	<span>{getSignedModifier(modifier)}</span>
	<span>{damage} {getSignedModifier(abilityMod)}</span>

	<div class="flex justify-end gap-2">
		<Button
			class="p-2"
			variant="ghost"
			on:click={() => handleEdit({ id, name, damage, ability, proficiency })}
		>
			<EditIcon />
		</Button>
		<Button class="p-2" variant="ghost" on:click={() => handleDelete(id)}>
			<DeleteIcon />
		</Button>
	</div>
</div>
