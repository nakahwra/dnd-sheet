<script lang="ts">
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import { getModifier } from '$lib/utils';

	export let abilityType: string;
	export let value: number;

	$: modifier = getModifier(value);
</script>

<div class="flex flex-col gap-1">
	<Label class="flex gap-2 font-bold" for={abilityType}>
		{abilityType.toUpperCase()}

		<span>
			{#if abilityType !== 'prof.'}
				{modifier >= 0 ? `+${modifier}` : `${modifier}`}
			{/if}
		</span>
	</Label>
	<Input
		class="max-w-[50px] bg-zinc-100 text-center dark:bg-zinc-900"
		type="number"
		id={abilityType}
		bind:value
	/>
</div>
