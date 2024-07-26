<script lang="ts">
	import spellsList from '$lib/assets/spells.json';

	import Button from '$lib/components/ui/button/button.svelte';
	import * as Command from '$lib/components/ui/command';
	import * as Dialog from '$lib/components/ui/dialog';
	import * as Popover from '$lib/components/ui/popover';

	import SelectedIcon from '~icons/mdi/check';

	import { spells, type Spell } from '$lib/stores/sheet';

	export let isOpen = false;

	let selectedSpell: Spell | null = null;
	let open = false;

	const SPELLS: Spell[] = spellsList;

	function handleSelect(spell: string) {
		const selected = SPELLS.find((s) => s.name === spell);
		selectedSpell = selected as Spell;
		open = false;
	}

	function handleSave() {
		if (!selectedSpell) return;

		const level = selectedSpell.level;

		if ($spells[level].some((s) => s.name === selectedSpell?.name)) return;

		$spells[level] = [...$spells[level], selectedSpell];
	}

	$: if (!isOpen) selectedSpell = null;
</script>

<Dialog.Root bind:open={isOpen}>
	<Dialog.Content>
		<Dialog.Header>
			<Dialog.Title>Add new spell</Dialog.Title>
		</Dialog.Header>

		<Popover.Root bind:open>
			<Popover.Trigger>
				<Button class="flex w-full max-w-[500px] justify-start" variant="outline" role="combobox">
					{#if selectedSpell}
						{selectedSpell.name}
					{:else}
						Select a spell
					{/if}
				</Button>
			</Popover.Trigger>
			<Popover.Content class="w-full max-w-[460px] p-0">
				<Command.Root>
					<Command.Input placeholder="Search spell..." />
					<Command.Empty>No spell found.</Command.Empty>
					<Command.Group class="max-h-72 overflow-y-auto">
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

		<Dialog.Footer>
			<Dialog.Close>
				<Button variant="outline">Cancel</Button>
			</Dialog.Close>

			<Dialog.Close>
				<Button variant="default" disabled={!selectedSpell} on:click={handleSave}>Save</Button>
			</Dialog.Close>
		</Dialog.Footer>
	</Dialog.Content>
</Dialog.Root>
