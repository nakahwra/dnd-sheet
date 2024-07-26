<script lang="ts">
	import { AbilityScores, Attacks, Info, Stats } from '$lib';
	import Spells from '$lib/components/Spells/Spells.svelte';
</script>

<div class="my-2 flex flex-col gap-2 bg-inherit text-zinc-800">
	<Info />

	<div class="grid gap-2 md:grid-cols-[auto_1fr]">
		<AbilityScores />
		<div class="flex flex-col gap-2">
			<Stats />
			<Attacks />
			<Spells />
		</div>
	</div>
</div>
