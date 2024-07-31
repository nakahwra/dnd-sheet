<script lang="ts">
	import type { AbilityScoresKeys } from '$lib/stores/sheet';
	import type { Selected } from 'bits-ui';

	import * as Select from '$lib/components/ui/select/index.js';

	export let ability: AbilityScoresKeys | undefined;
	export let noneOption: boolean = false;
	export let onSelectedChange: (
		selected: Selected<AbilityScoresKeys | undefined> | undefined
	) => void;

	$: console.log('ability', ability);

	$: selected = {
		value: ability,
		label: ability?.toUpperCase()
	};
</script>

<Select.Root bind:selected {onSelectedChange}>
	<Select.Trigger class="flex w-fit min-w-[146px] bg-zinc-100 px-4 py-5 dark:bg-zinc-900">
		<Select.Value placeholder="Select an ability" />
	</Select.Trigger>

	<Select.Content>
		{#if noneOption}
			<Select.Item value={null}>None</Select.Item>
		{/if}

		<Select.Item value="strength">STRENGTH</Select.Item>
		<Select.Item value="dexterity">DEXTERITY</Select.Item>
		<Select.Item value="constitution">CONSTITUTION</Select.Item>
		<Select.Item value="intelligence">INTELLIGENCE</Select.Item>
		<Select.Item value="wisdom">WISDOM</Select.Item>
		<Select.Item value="charisma">CHARISMA</Select.Item>
	</Select.Content>
</Select.Root>
