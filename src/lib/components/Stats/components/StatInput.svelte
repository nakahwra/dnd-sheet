<script lang="ts">
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';

	export let stat: string;
	export let value: number;
	export let type: 'number' | 'text';
</script>

<div class="w-full space-y-2">
	<Label class="flex gap-1 font-bold" for="ac">
		<slot />
		{stat.toUpperCase()}
	</Label>
	<Input class="h-fit pb-2 pt-3" id={stat} {type} bind:value />
</div>
