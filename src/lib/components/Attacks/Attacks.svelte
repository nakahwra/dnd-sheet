<script lang="ts">
	import { AttackDialog } from '$lib';
	import { Button } from '$lib/components/ui/button';
	import * as Card from '$lib/components/ui/card';

	import AddIcon from '~icons/mdi/plus';
	import AtkIcon from '~icons/mdi/sword';

	import { attacks, type AttackType } from '$lib/stores/sheet';
	import Attack from './components/Attack.svelte';

	const DEFAULT_ATTACK: AttackType = {
		id: '',
		name: '',
		damage: '',
		ability: 'strength',
		proficiency: true
	};

	let attackTypes: AttackType[] = [];
	let editingAttack: AttackType = { ...DEFAULT_ATTACK };
	let isOpen = false;

	function handleClose() {
		isOpen = false;
		handleClear();
	}

	function handleEdit(atk: AttackType) {
		editingAttack = atk;
		isOpen = true;
	}

	function handleSave() {
		const isEditing = $attacks.some((a) => a.id === editingAttack.id);
		const { id, name, ability, proficiency, damage } = editingAttack;

		if (isEditing) {
			$attacks = $attacks.map((a) => (a.id === id ? { ...editingAttack } : a));
		} else {
			const newId = $attacks.length.toString();
			$attacks = [...$attacks, { id: newId, name, ability, proficiency, damage }];
		}

		handleClear();
	}

	function handleClear() {
		editingAttack = { ...DEFAULT_ATTACK };
		isOpen = false;
	}

	function handleDelete(id: string) {
		$attacks = $attacks.filter((a) => a.id !== id);
	}

	$: attackTypes = $attacks;
</script>

<Card.Root>
	<Card.Header class="flex flex-row items-center justify-between">
		<Card.Title class="flex flex-row gap-2">
			<AtkIcon />
			Attacks
		</Card.Title>
		<div class="!mt-0 flex items-center gap-4">
			<Button class="p-2" variant="outline" on:click={() => (isOpen = true)}>
				<AddIcon />
			</Button>
		</div>
	</Card.Header>
	<Card.Content>
		{#if $attacks.length === 0}
			<span>No attacks added.</span>
		{/if}

		{#each attackTypes as atk}
			<Attack {...atk} {handleEdit} {handleDelete} />
		{/each}
	</Card.Content>
</Card.Root>

<AttackDialog bind:attack={editingAttack} {isOpen} onClose={handleClose} onSave={handleSave} />
