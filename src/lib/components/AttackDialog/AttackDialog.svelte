<script lang="ts">
	import { Input } from '$lib';
	import { Button } from '$lib/components/ui/button';
	import * as Dialog from '$lib/components/ui/dialog';
	import type { AbilityScoresKeys, AttackType } from '$lib/stores/sheet';

	import { abilityScores } from '$lib/stores/sheet';

	export let editingAttack: AttackType;
	export let isOpen: boolean = false;
	export let onClose: () => void;
	export let onSave: () => void;

	let selected = { value: editingAttack.ability, label: editingAttack.ability };

	const abilityOptions = (Object.keys($abilityScores) as AbilityScoresKeys[]).filter(
		(a) => a !== 'proficiency'
	);

	function handleSave() {
		editingAttack.ability = selected.value;
		onSave();
	}
</script>

<Dialog.Root open={isOpen} onOpenChange={onClose}>
	<Dialog.Content>
		<Dialog.Header>
			<Dialog.Title>Attack Editor</Dialog.Title>
		</Dialog.Header>

		<Input id="atk-name-input" label={'Name'} type="text" bind:value={editingAttack.name} />

		<div class="flex gap-8">
			<Input
				id={`${editingAttack.id}-prof`}
				label="Proficiency"
				type="checkbox"
				bind:value={editingAttack.proficiency}
			/>
			<Input
				id={editingAttack.ability}
				label={'Modifier'}
				type="select"
				options={abilityOptions}
				bind:selected
			/>
		</div>

		<Input
			id={editingAttack.damage}
			label={'Damage'}
			type="text"
			bind:value={editingAttack.damage}
		/>

		<Dialog.Footer class="flex-col !justify-start gap-4 sm:flex-row sm:gap-2">
			<Dialog.Close class="w-full sm:w-[50%]">
				<Button
					class="w-full"
					variant="default"
					disabled={!editingAttack.name || !editingAttack.ability || !editingAttack.damage}
					on:click={handleSave}
				>
					Save
				</Button>
			</Dialog.Close>
			<Dialog.Close class="w-full sm:w-[50%]">
				<Button class="w-full" variant="outline">Cancel</Button>
			</Dialog.Close>
		</Dialog.Footer>
	</Dialog.Content>
</Dialog.Root>
