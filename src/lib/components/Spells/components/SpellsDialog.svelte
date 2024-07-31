<script lang="ts">
	import spellsList from '$lib/assets/spells.json';

	import Button from '$lib/components/ui/button/button.svelte';
	import { Label } from '$lib/components/ui/label';

	import { Checkbox } from '$lib/components/ui/checkbox';
	import * as Command from '$lib/components/ui/command';
	import * as Dialog from '$lib/components/ui/dialog';
	import * as Popover from '$lib/components/ui/popover';

	import SelectedIcon from '~icons/mdi/check';

	import { spellcastingInfo, type Spell } from '$lib/stores/sheet';

	export let isOpen = false;

	let selectedSpell: Spell | null = null;
	let open = false;
	let prepared = true;

	const SPELLS: Spell[] = spellsList;

	function handleSelect(spell: string) {
		const selected = SPELLS.find((s) => s.name === spell);
		selectedSpell = { ...selected } as Spell;
		open = false;
	}

	function handleSave() {
		if (!selectedSpell) return;

		const level = selectedSpell.level;

		if ($spellcastingInfo.spellList[level].spells.some((s) => s.name === selectedSpell?.name))
			return;

		$spellcastingInfo.spellList[level].spells = [
			...$spellcastingInfo.spellList[level].spells,
			{ ...selectedSpell, prepared }
		];
	}

	$: if (!isOpen) selectedSpell = null;
</script>

<Dialog.Root bind:open={isOpen}>
	<Dialog.Content>
		<Dialog.Header>
			<Dialog.Title>Add new spell</Dialog.Title>
		</Dialog.Header>

		<div class="flex flex-col gap-2">
			<Label for="prepared">Prepared:</Label>
			<Checkbox id="prepared" bind:checked={prepared} />
		</div>

		<Popover.Root bind:open>
			<Popover.Trigger>
				<Button
					class="flex w-full justify-start sm:max-w-[500px]"
					variant="outline"
					role="combobox"
				>
					{#if selectedSpell}
						{selectedSpell.name}
					{:else}
						Select a spell
					{/if}
				</Button>
			</Popover.Trigger>
			<Popover.Content class="w-full max-w-[305px] p-0 sm:max-w-[460px]">
				<Command.Root>
					<Command.Input placeholder="Search spell..." />
					<Command.Empty>No spell found.</Command.Empty>
					<Command.Group class="max-h-36 overflow-y-auto sm:max-h-72">
						{#each SPELLS as s}
							<Command.Item class="flex gap-2" value={String(s.name)} onSelect={handleSelect}>
								{s.name}
								{#if selectedSpell && selectedSpell.name === s.name}
									<SelectedIcon />
								{/if}
							</Command.Item>
						{/each}
					</Command.Group>
				</Command.Root>
			</Popover.Content>
		</Popover.Root>

		<Dialog.Footer class="flex-col !justify-start gap-4 sm:flex-row sm:gap-2">
			<Dialog.Close class="w-full sm:w-[50%]">
				<Button class="w-full" variant="default" disabled={!selectedSpell} on:click={handleSave}>
					Save
				</Button>
			</Dialog.Close>
			<Dialog.Close class="w-full sm:w-[50%]">
				<Button class="w-full" variant="outline">Cancel</Button>
			</Dialog.Close>
		</Dialog.Footer>
	</Dialog.Content>
</Dialog.Root>
