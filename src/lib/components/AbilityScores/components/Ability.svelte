<script lang="ts">
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';

	export let abilityType: string;
	export let value: number;

	// $: modifier = Math.floor((value - 10) / 2);
</script>

<div class="flex flex-col gap-1">
	<Label class="font-bold" for={abilityType}>{abilityType.toUpperCase()}</Label>
	<Input class="max-w-[50px] text-center" type="number" id={abilityType} bind:value />
</div>
