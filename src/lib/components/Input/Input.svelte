<script lang="ts">
	import type { AbilityScoresKeys } from '$lib/stores/sheet';
	import type { HTMLInputTypeAttribute } from 'svelte/elements';

	import { Checkbox } from '$lib/components/ui/checkbox';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import * as Select from '$lib/components/ui/select/index.js';

	export let id: string;
	export let label: string;
	export let type: HTMLInputTypeAttribute | 'select';
	export let value: string | boolean | undefined = undefined;
	export let options: AbilityScoresKeys[] = [];

	export let selected: { value: AbilityScoresKeys; label: string } | undefined = undefined;
</script>

<div class="flex flex-col gap-2">
	<Label class="font-bold" for={id}>{label}</Label>

	{#if type === 'select' && selected && options?.length}
		<Select.Root bind:selected>
			<Select.Trigger class="flex w-fit">
				{selected.label}
			</Select.Trigger>

			<Select.Content>
				{#each options as option}
					<Select.Item value={option}>{option}</Select.Item>
				{/each}
			</Select.Content>
		</Select.Root>
	{:else if type === 'checkbox' && typeof value === 'boolean'}
		<Checkbox {id} bind:checked={value} />
	{:else}
		<Input {id} {type} bind:value />
	{/if}
</div>
