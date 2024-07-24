<script lang="ts">
	import type { AbilityScoresKeys } from '$lib/stores/sheet';
	import type { HTMLInputTypeAttribute } from 'svelte/elements';

	import { Button } from '$lib/components/ui/button';
	import { Checkbox } from '$lib/components/ui/checkbox';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu/index.js';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';

	export let id: string;
	export let label: string;
	export let type: HTMLInputTypeAttribute | 'select';
	export let value: string | boolean;
	export let options: AbilityScoresKeys[] = [];
</script>

<div class="flex flex-col gap-2">
	<Label class="font-bold" for={id}>{label}</Label>

	{#if type === 'select' && options?.length}
		<DropdownMenu.Root>
			<DropdownMenu.Trigger class="flex w-fit">
				<Button variant="outline">{value}</Button>
			</DropdownMenu.Trigger>
			<DropdownMenu.Content>
				<DropdownMenu.RadioGroup bind:value>
					{#each options as option}
						<DropdownMenu.RadioItem value={option}>{option}</DropdownMenu.RadioItem>
					{/each}
				</DropdownMenu.RadioGroup>
			</DropdownMenu.Content>
		</DropdownMenu.Root>
	{:else if type === 'checkbox'}
		<Checkbox {id} bind:checked={value} />
	{:else}
		<Input {id} {type} bind:value />
	{/if}
</div>
