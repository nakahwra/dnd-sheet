<script lang="ts">
	import { AbilityScores, Attacks, Header, Stats } from '$lib';
	import Spells from '$lib/components/Spells/Spells.svelte';
</script>

<div class="mt-2 flex flex-col gap-2 text-slate-800">
	<Header />

	<div class="grid grid-cols-[auto_1fr] gap-2">
		<AbilityScores />
		<div class="flex flex-col gap-2">
			<Stats />
			<Attacks />
			<Spells />
		</div>
	</div>
</div>
