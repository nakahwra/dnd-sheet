<script lang="ts">
	import * as Card from '$lib/components/ui/card';
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

	type StatKeys = keyof typeof $stats;

	let editMode = false;
	let ac: number, modifier1: number, modifier2: number;

	const ICONS: Record<StatKeys, () => unknown> = {
		ac: () => ACIcon,
		initiative: () => InitIcon,
		speed: () => SpeedIcon,
		hp: () => HPIcon
	};

	$: {
		let sum = Number($stats.ac.base) + Number($stats.ac.bonus);

		const ability1 = $stats.ac.firstAbility;
		const ability2 = $stats.ac.secondAbility;

		console.log('ab:', ability1, ability2);

		if (ability1) {
			modifier1 = getModifier(($abilityScores[ability1] as AbilityScoreType).score);
			sum += modifier1;
		}

		if (ability2) {
			modifier2 = getModifier(($abilityScores[ability2] as AbilityScoreType).score);
			sum += modifier2;
		}

		console.log('sum:', sum);

		ac = sum;
	}
</script>

<Card.Root>
	<Card.Header class="flex flex-row items-center justify-between">
		<Card.Title class="flex flex-row gap-2">
			<StatsIcon />
			Stats
		</Card.Title>
		<Switch class="!mt-0" bind:checked={editMode} />
	</Card.Header>
	<Card.Content>
		<ul class="flex gap-4">
			{#if editMode}
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
							<span>{modifier1 ? getSignedModifier(modifier1) : '+0'}</span>
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
							<span>{modifier2 ? getSignedModifier(modifier2) : '+0'}</span>
						</div>
					</div>
					<StatInput stat="Other" type="number" bind:value={$stats.ac.bonus} />
				</div>
			{:else}
				<div class="flex flex-col space-y-2">
					<div class="flex items-center space-x-1">
						<svelte:component this={ICONS.ac()} />
						<span class="font-semibold">AC</span>
					</div>
					<span class="w-fit rounded-md border-[1px] px-4 py-2">
						{ac}
					</span>
				</div>
			{/if}
		</ul>
	</Card.Content>
</Card.Root>
