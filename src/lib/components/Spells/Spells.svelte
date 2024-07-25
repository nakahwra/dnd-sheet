<script lang="ts">
	import { Button } from '$lib/components/ui/button';

	import { Badge } from '$lib/components/ui/badge/index.js';
	import * as Card from '$lib/components/ui/card';

	import { Separator } from '$lib/components/ui/separator/index.js';

	import { spells, type Spell, type SpellListKeys } from '$lib/stores/sheet';

	import AddIcon from '~icons/mdi/plus';
	import SpellsIcon from '~icons/mdi/sparkles-outline';
	import DeleteIcon from '~icons/mdi/trash-outline';

	import SpellsDialog from './components/SpellsDialog.svelte';

	let isOpen = false;
	const levels: SpellListKeys[] = Object.keys($spells).map(Number);

	function handleDelete(spell: Spell) {
		const level = spell.level as number;
		$spells[level] = $spells[level].filter((s) => s.name !== spell.name);
	}

	$: isSomeSpellSelected = levels.some((l) => $spells[l].length > 0);
</script>

<Card.Root>
	<Card.Header class="flex flex-row items-center  justify-between">
		<div class="flex flex-row gap-2">
			<SpellsIcon />
			<Card.Title>
				<span>Spells</span>
			</Card.Title>
		</div>
		<Button class="!mt-0 p-2" variant="outline" on:click={() => (isOpen = true)}>
			<AddIcon />
		</Button>
	</Card.Header>
	<Card.Content>
		<ul class="flex flex-col gap-4">
			{#if isSomeSpellSelected}
				{#each levels as l}
					{#if $spells[l].length > 0}
						<li>
							<span class="font-semibold">
								{#if l === 0}
									Cantrips
								{:else}
									Level {l}
								{/if}
							</span>

							<Separator class="mb-2 mt-1" />

							<ul class="flex flex-col gap-4">
								{#each $spells[l] as spell}
									<li>
										<div class="flex items-center justify-between">
											<span class="font-semibold">{spell.name}</span>
											<Button class="p-2" variant="ghost" on:click={() => handleDelete(spell)}>
												<DeleteIcon />
											</Button>
										</div>

										<div class="flex items-center justify-between text-slate-300">
											<div class="flex gap-2">
												<div class="flex items-center gap-1">
													<Badge variant="secondary">{spell.casting_time}</Badge>
												</div>
												•
												<!-- convert ft to m, rounded down -->
												<div class="flex items-center gap-1">
													<Badge variant="secondary">
														{#if spell.range === 'Self'}
															{spell.range}
														{:else}
															{Math.floor(parseInt(spell.range) * 0.3048)} m
														{/if}
													</Badge>
												</div>

												{#if spell.S || spell.V || spell.M}
													•
													<div class="flex gap-1">
														{#if spell.S}
															<Badge variant="secondary">S</Badge>
														{/if}
														{#if spell.V}
															<Badge variant="secondary">V</Badge>
														{/if}
														{#if spell.M}
															<Badge variant="secondary">M</Badge>
														{/if}
													</div>
												{/if}
											</div>

											{#if spell.concentration || spell.ritual}
												<div class="flex gap-2">
													{#if spell.concentration}
														<Badge class="text-slate-500" variant="outline">Concentration</Badge>
													{/if}

													{#if spell.ritual}
														<Badge class="text-slate-500" variant="outline">Ritual</Badge>
													{/if}
												</div>
											{/if}
										</div>
									</li>
								{/each}
							</ul>
						</li>
					{/if}
				{/each}
			{:else}
				<span>No spells added.</span>
			{/if}
		</ul>
	</Card.Content>
</Card.Root>

<SpellsDialog bind:isOpen />
