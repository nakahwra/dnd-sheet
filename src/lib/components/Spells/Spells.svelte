<script lang="ts">
	import { Label } from '$lib/components/ui/label';

	import { Badge } from '$lib/components/ui/badge/index.js';
	import { Button } from '$lib/components/ui/button';
	import * as Card from '$lib/components/ui/card';
	import { Input } from '$lib/components/ui/input';
	import { Switch } from '$lib/components/ui/switch';

	import { Separator } from '$lib/components/ui/separator/index.js';

	import { spellcastingInfo, type Spell, type SpellListKeys } from '$lib/stores/sheet';

	import AddIcon from '~icons/mdi/plus';
	import SpellsIcon from '~icons/mdi/sparkles-outline';
	import DeleteIcon from '~icons/mdi/trash-outline';

	import { replaceFootToMeter } from '$lib/utils';
	import Checkbox from '../ui/checkbox/checkbox.svelte';
	import SpellcastingAttributes from './components/SpellcastingAttributes.svelte';
	import SpellDescriptionDialog from './components/SpellDescriptionDialog.svelte';
	import SpellsDialog from './components/SpellsDialog.svelte';
	import SpellSlotSlider from './components/SpellSlotSlider.svelte';

	let editMode = false;
	let isOpen = false;
	let isDescriptionOpen = false;
	let selectedSpellDescription: Spell | null = null;

	const levels: SpellListKeys[] = Object.keys($spellcastingInfo.spellList).map(Number);

	function handleDelete(spell: Spell) {
		const level = spell.level as number;
		$spellcastingInfo.spellList[level].spells = $spellcastingInfo.spellList[level].spells.filter(
			(s) => s.name !== spell.name
		);
	}

	function handleDescription(spell: Spell) {
		selectedSpellDescription = spell;
		isDescriptionOpen = true;
	}

	$: isSomeSpellPrepared = levels.some((l) =>
		$spellcastingInfo.spellList[l].spells.some((s) => editMode || s.prepared)
	);
</script>

<Card.Root>
	<Card.Header class="flex flex-row items-center  justify-between">
		<div class="flex flex-row gap-2">
			<SpellsIcon />
			<Card.Title>
				<span>Spells</span>
			</Card.Title>
		</div>
		<div class="!mt-0 flex items-center gap-4">
			<Switch class="!mt-0" bind:checked={editMode} />
			<Button class="!mt-0 p-2" variant="outline" on:click={() => (isOpen = true)}>
				<AddIcon />
			</Button>
		</div>
	</Card.Header>
	<Card.Content>
		<SpellcastingAttributes bind:editMode />

		<ul class="mt-6 flex flex-col gap-4">
			{#if isSomeSpellPrepared}
				{#each levels as l}
					{#if $spellcastingInfo.spellList[l].spells.some((s) => editMode || s.prepared)}
						<li>
							<div class={`flex flex-col gap-2 font-semibold`}>
								{#if l === 0}
									Cantrips
								{:else}
									<span>Level {l}</span>

									{#if editMode}
										<div>
											<Label class="font-semibold">Max slots:</Label>
											<Input
												class="w-fit"
												type="number"
												bind:value={$spellcastingInfo.spellList[l].slots.max}
											/>
										</div>
									{:else}
										<SpellSlotSlider
											bind:value={$spellcastingInfo.spellList[l].slots.used}
											max={$spellcastingInfo.spellList[l].slots.max}
										/>
									{/if}
								{/if}
							</div>

							<Separator class="mb-2 mt-2" />

							<ul class="flex flex-col gap-4">
								{#each $spellcastingInfo.spellList[l].spells.filter((s) => editMode || s.prepared) as spell}
									<div class="flex items-center space-x-4">
										{#if editMode}
											<Checkbox bind:checked={spell.prepared} />
										{/if}

										<button class="w-full cursor-pointer" on:click={() => handleDescription(spell)}>
											<div class="flex items-center justify-between">
												<span class="cursor-pointer font-normal">{spell.name}</span>
												<Button class="p-2" variant="ghost" on:click={() => handleDelete(spell)}>
													<DeleteIcon />
												</Button>
											</div>

											<div
												class="flex flex-col justify-between gap-2 text-zinc-300 xs:flex-row xs:items-center xs:gap-0"
											>
												<div class="flex gap-2">
													<div class="flex items-center gap-1">
														<Badge variant="secondary">{spell.casting_time}</Badge>
													</div>
													•
													<!-- convert ft to m, rounded down -->
													<div class="flex items-center gap-1">
														<Badge variant="secondary">
															<!-- {#if ['Self', 'Touch', 'Special', 'Unlimited', 'Sight'].some( (s) => spell.range.includes(s) )}
															{replaceFootToMeter(spell.range)}
														{:else}
															{convertFeetToMeters(parseInt(spell.range))} m
														{/if} -->

															{replaceFootToMeter(spell.range)}
														</Badge>
													</div>

													{#if spell.V || spell.S || spell.M !== undefined}
														•
														<div class="flex gap-1">
															{#if spell.S}
																<Badge variant="secondary">S</Badge>
															{/if}
															{#if spell.V}
																<Badge variant="secondary">V</Badge>
															{/if}
															{#if spell.M !== undefined}
																<Badge variant="secondary">M</Badge>
															{/if}
														</div>
													{/if}
												</div>

												{#if spell.concentration || spell.ritual}
													<div class="flex gap-2">
														{#if spell.concentration}
															<Badge class="text-zinc-500" variant="outline">Concentration</Badge>
														{/if}

														{#if spell.ritual}
															<Badge class="text-zinc-500" variant="outline">Ritual</Badge>
														{/if}
													</div>
												{/if}
											</div>
										</button>
									</div>
								{/each}
							</ul>
						</li>
						<Separator class="mb-2 mt-2" />
					{/if}
				{/each}
			{:else}
				<span>No spells prepared.</span>
			{/if}
		</ul>
	</Card.Content>
</Card.Root>

{#if selectedSpellDescription !== null}
	{#key selectedSpellDescription}
		<SpellDescriptionDialog bind:isOpen={isDescriptionOpen} spell={selectedSpellDescription} />
	{/key}
{/if}

<SpellsDialog bind:isOpen />
