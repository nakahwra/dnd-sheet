<script lang="ts">
	import { Input } from '$lib';
	import { Button } from '$lib/components/ui/button';
	import * as Card from '$lib/components/ui/card';
	import * as Dialog from '$lib/components/ui/dialog';
	import { Switch } from '$lib/components/ui/switch';

	import AddIcon from '~icons/mdi/plus';
	import AtkIcon from '~icons/mdi/sword';

	import { sheet, type AbilityScoresKeys, type AttackType } from '$lib/stores/sheet';
	import Attack from './components/Attack.svelte';

	let attacks: AttackType[] = [];
	let edit = false;

	let id: string = '';
	let name: string = '';
	let damage: string = '';
	let ability: AbilityScoresKeys = 'strength';
	let proficiency: boolean = true;

	const abilityOptions = (Object.keys($sheet.abilityScores) as AbilityScoresKeys[]).filter(
		(a) => a !== 'proficiency'
	);

	const handleSave = () => {
		$sheet = {
			...$sheet,
			attacks: [
				...attacks,
				{
					id: Math.random().toString(36).substr(2, 9),
					name,
					damage,
					ability,
					proficiency
				}
			]
		};

		handleClear();
	};

	const handleClear = () => {
		id = '';
		name = '';
		damage = '';
		ability = 'strength';
		proficiency = true;
	};

	$: attacks = $sheet.attacks;
</script>

<Card.Root>
	<Card.Header class="flex flex-row items-center justify-between">
		<Card.Title class="flex flex-row gap-2">
			<AtkIcon />
			Attacks
		</Card.Title>
		<div class="flex items-center gap-4">
			<Switch bind:checked={edit} />

			<Dialog.Root>
				<Dialog.Trigger>
					<Button class="p-2" variant="outline" size="sm">
						<AddIcon />
					</Button>
				</Dialog.Trigger>
				<Dialog.Content>
					<Dialog.Header>
						<Dialog.Title>Add new attack</Dialog.Title>
					</Dialog.Header>
					<Input id="atk-name-input" label={'Attack Name'} type="text" bind:value={name} />
					<div class="flex gap-8">
						<Input id={`${id}-prof`} label="Proficiency" type="checkbox" bind:value={proficiency} />
						<Input
							id={ability}
							label={'Attack Modifier'}
							type="select"
							options={abilityOptions}
							bind:value={ability}
						/>
					</div>
					<Input id={damage} label={'Attack Damage'} type="text" bind:value={damage} />
					<Dialog.Footer>
						<Dialog.Close>
							<Button variant="outline" on:click={handleClear}>Cancel</Button>
						</Dialog.Close>
						<Dialog.Close>
							<Button
								variant="default"
								disabled={!name || !ability || !damage}
								on:click={handleSave}>Save</Button
							>
						</Dialog.Close>
					</Dialog.Footer>
				</Dialog.Content>
			</Dialog.Root>
		</div>
	</Card.Header>
	<Card.Content>
		{#each attacks as atk}
			<Attack
				id={atk.id}
				name={atk.name}
				ability={atk.ability}
				damage={atk.damage}
				proficiency={atk.proficiency}
				{edit}
			/>
		{/each}
	</Card.Content>
</Card.Root>
