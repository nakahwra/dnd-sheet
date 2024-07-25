<script lang="ts">
	import { AbilityScores, Attacks, Header, Stats } from '$lib';
	import Spells from '$lib/components/Spells/Spells.svelte';

	import { sheet } from '$lib/stores/sheet';

	function loadJSON(event: Event) {
		const file = event.target?.files[0];
		const reader = new FileReader();

		reader.onload = function () {
			const data = JSON.parse(reader.result as string);

			$sheet = data;
			// $spells = data.spells;
		};

		reader.readAsText(file);
	}
</script>

<span>load json</span>
<input type="file" accept=".json" on:change={loadJSON} />

<div class="flex flex-col gap-2 text-slate-800">
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
