<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import { Separator } from '$lib/components/ui/separator/index.js';
	import { Switch } from '$lib/components/ui/switch';

	import ACIcon from '~icons/material-symbols/shield-outline';
	import InitIcon from '~icons/mdi/arrow';
	import HPIcon from '~icons/mdi/heart-outline';
	import SpeedIcon from '~icons/mdi/run';
	import StatsIcon from '~icons/mdi/user-heart-outline';

	import { AbilityScoresSelect } from '$lib';
	import { abilityScores, stats, type AbilityScoreType } from '$lib/stores/sheet';
	import { getModifier, getSignedModifier } from '$lib/utils';
	import StatInput from './components/StatInput.svelte';
	import StatView from './components/StatView.svelte';

	type StatKeys = keyof typeof $stats;

	let editMode = false;
	let ac: number, acMod1: number, acMod2: number;
	let initiative: number, initMod: number;

	const ICONS: Record<StatKeys, () => unknown> = {
		ac: () => ACIcon,
		initiative: () => InitIcon,
		speed: () => SpeedIcon,
		hp: () => HPIcon
	};

	// Armor Class
	$: {
		let sum = Number($stats.ac.base) + Number($stats.ac.bonus);

		const ability1 = $stats.ac.firstAbility;
		const ability2 = $stats.ac.secondAbility;

		console.log('ab:', ability1, ability2);

		if (ability1) {
			acMod1 = getModifier(($abilityScores[ability1] as AbilityScoreType).score);
			sum += acMod1;
		}

		if (ability2) {
			acMod2 = getModifier(($abilityScores[ability2] as AbilityScoreType).score);
			sum += acMod2;
		}

		console.log('sum:', sum);

		ac = sum;
	}

	// Initiative
	$: {
		initMod = getModifier($abilityScores.dexterity.score);
		initiative = initMod + Number($stats.initiative.bonus);
	}

	// Speed
	$: speed = Number($stats.speed.base) + Number($stats.speed.bonus);
</script>

<Card.Root>
	<Card.Header class="flex flex-row items-center justify-between">
		<Card.Title class="flex flex-row gap-2">
			<StatsIcon />
			Stats
		</Card.Title>
		<Switch class="!mt-0" bind:checked={editMode} />
	</Card.Header>
	<Card.Content
		class={`grid gap-2 ${editMode ? '' : 'grid-cols-3 sm:grid-cols-5 md:grid-cols-3 lg:grid-cols-5'}`}
	>
		<!-- Armor Class -->
		{#if editMode}
			<div>
				<svelte:component this={ICONS.ac()} class="mb-2" />

				<div class="flex w-full flex-col gap-4 lg:flex-row">
					<StatInput stat="Base AC" type="number" bind:value={$stats.ac.base} />
					<div class="flex flex-col space-y-2">
						<span class="text-sm font-semibold leading-none">ABILITY 1</span>
						<div class="flex items-center space-x-1">
							<AbilityScoresSelect
								ability={$stats.ac.firstAbility}
								onSelectedChange={(selected) => ($stats.ac.firstAbility = selected?.value)}
								noneOption
							/>
							<span>{acMod1 ? getSignedModifier(acMod1) : '+0'}</span>
						</div>
					</div>
					<div class="flex flex-col space-y-2">
						<span class="text-sm font-semibold leading-none">ABILITY 2</span>
						<div class="flex items-center space-x-1">
							<AbilityScoresSelect
								ability={$stats.ac.secondAbility}
								onSelectedChange={(selected) => ($stats.ac.secondAbility = selected?.value)}
								noneOption
							/>
							<span>{acMod2 ? getSignedModifier(acMod2) : '+0'}</span>
						</div>
					</div>
					<StatInput stat="Other bonuses" type="number" bind:value={$stats.ac.bonus} />
				</div>

				<Separator class="mb-2 mt-4" />
			</div>
		{:else}
			<StatView label="AC" value={ac}>
				<svelte:component this={ICONS.ac()} />
			</StatView>
		{/if}

		<!-- Initiative -->
		{#if editMode}
			<div>
				<svelte:component this={ICONS.initiative()} class="mb-2" />

				<div class="flex w-full flex-col gap-4 lg:flex-row">
					<StatView label="Base Initiative" value={`DEX: ${getSignedModifier(initMod)}`} />
					<StatInput stat="Other bonuses" type="number" bind:value={$stats.initiative.bonus} />
				</div>
				<Separator class="mb-2 mt-4" />
			</div>
		{:else}
			<StatView label="Initiative" value={initiative}>
				<svelte:component this={ICONS.initiative()} />
			</StatView>
		{/if}

		<!-- Speed -->
		{#if editMode}
			<div>
				<svelte:component this={ICONS.speed()} class="mb-2" />

				<div class="flex w-full flex-col gap-4 lg:flex-row">
					<StatInput stat="Base speed" type="number" bind:value={$stats.speed.base} />
					<StatInput stat="Other bonuses" type="number" bind:value={$stats.speed.bonus} />
				</div>
				<Separator class="mb-2 mt-4" />
			</div>
		{:else}
			<StatView label="Speed" value={speed}>
				<svelte:component this={ICONS.speed()} />
			</StatView>
		{/if}

		<!-- Hit Points -->
		{#if editMode}
			<div>
				<svelte:component this={ICONS.hp()} class="mb-2" />
				<div class="flex w-full flex-col gap-4 lg:flex-row">
					<StatInput stat="Max hp" type="number" bind:value={$stats.hp.max} />
				</div>
			</div>
		{:else}
			<StatInput stat={`HP (${$stats.hp.max})`} type="number" bind:value={$stats.hp.current}>
				<svelte:component this={ICONS.hp()} />
			</StatInput>
			<StatInput stat="Temp HP" type="number" bind:value={$stats.hp.temp} />
		{/if}
	</Card.Content>
</Card.Root>
