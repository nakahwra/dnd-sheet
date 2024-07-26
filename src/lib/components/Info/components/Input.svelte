<script lang="ts">
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';

	export let label: string;
	export let value: string;
</script>

<div class="flex flex-col gap-2">
	<Label class="font-bold" for="character-name">{label}</Label>
	<Input type="text" bind:value />
</div>
