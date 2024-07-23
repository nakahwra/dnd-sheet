<script lang="ts">
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';

	export let stat: string;
	export let value: number;
	export let type: 'number' | 'text';
</script>

<Label class="flex gap-1 font-bold" for="ac">
	<slot />
	{stat.toUpperCase()}
</Label>
<Input id={stat} {type} bind:value />
