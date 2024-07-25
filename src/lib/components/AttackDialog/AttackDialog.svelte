<script lang="ts">
	import { Input } from '$lib';
	import { Button } from '$lib/components/ui/button';
	import * as Dialog from '$lib/components/ui/dialog';
	import type { AbilityScoresKeys, AttackType } from '$lib/stores/sheet';

	import { abilityScores } from '$lib/stores/sheet';

	export let attack: AttackType;
	export let isOpen: boolean = false;
	export let onClose: () => void;
	export let onSave: () => void;

	let selected = { value: attack.ability, label: attack.ability };

	const abilityOptions = (Object.keys($abilityScores) as AbilityScoresKeys[]).filter(
		(a) => a !== 'proficiency'
	);

	$: if (attack.ability !== selected.value) attack.ability = selected.value;
</script>

<Dialog.Root open={isOpen} onOpenChange={onClose}>
	<Dialog.Content>
		<Dialog.Header>
			<Dialog.Title>Attack Editor</Dialog.Title>
		</Dialog.Header>

		<Input id="atk-name-input" label={'Name'} type="text" bind:value={attack.name} />

		<div class="flex gap-8">
			<Input
				id={`${attack.id}-prof`}
				label="Proficiency"
				type="checkbox"
				bind:value={attack.proficiency}
			/>
			<Input
				id={attack.ability}
				label={'Modifier'}
				type="select"
				options={abilityOptions}
				bind:selected
			/>
		</div>

		<Input id={attack.damage} label={'Damage'} type="text" bind:value={attack.damage} />

		<Dialog.Footer>
			<Dialog.Close>
				<Button variant="outline">Cancel</Button>
			</Dialog.Close>

			<Dialog.Close>
				<Button
					variant="default"
					disabled={!attack.name || !attack.ability || !attack.damage}
					on:click={onSave}
				>
					Save
				</Button>
			</Dialog.Close>
		</Dialog.Footer>
	</Dialog.Content>
</Dialog.Root>
