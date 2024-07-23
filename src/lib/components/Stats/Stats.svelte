<script lang="ts">
	import * as Card from '$lib/components/ui/card';

	import ACIcon from '~icons/material-symbols/shield-outline';
	import InitIcon from '~icons/mdi/arrow';
	import HPIcon from '~icons/mdi/heart-outline';
	import SpeedIcon from '~icons/mdi/run';
	import StatsIcon from '~icons/mdi/user-heart-outline';

	import { sheet } from '$lib/stores/sheet';
	import StatInput from './components/StatInput.svelte';

	type StatKeys = keyof typeof $sheet.stats;

	const statsKeys = Object.keys($sheet.stats) as Array<StatKeys>;

	const ICONS: Record<StatKeys, () => unknown> = {
		ac: () => ACIcon,
		initiative: () => InitIcon,
		speed: () => SpeedIcon,
		hp: () => HPIcon
	};
</script>

<Card.Root>
	<Card.Header>
		<Card.Title class="flex flex-row gap-2">
			<StatsIcon />
			Stats
		</Card.Title>
	</Card.Header>
	<Card.Content>
		<ul class="flex gap-4">
			{#each statsKeys as s}
				<li class="flex flex-col gap-2">
					<StatInput stat={s} value={$sheet.stats[s]} type={s === 'hp' ? 'text' : 'number'}>
						<svelte:component this={ICONS[s]()} />
					</StatInput>

					<!-- <Label class="flex gap-1 font-bold" for="ac">
						<svelte:component this={ICONS[s]()} />
						{s.toUpperCase()}
					</Label>
					<Input id={s} type="number" min={$sheet.abilityScores.dexterity.score} /> -->
				</li>
			{/each}
		</ul>
	</Card.Content>
</Card.Root>
