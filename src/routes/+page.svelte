<script lang="ts">
	import { Header } from '$lib';
	import AbilityScores from '$lib/components/AbilityScores/AbilityScores.svelte';
	import Stats from '$lib/components/Stats/Stats.svelte';

	import { sheet } from '$lib/stores/sheet';

	function loadJSON(event: Event) {
		const file = event.target?.files[0];
		const reader = new FileReader();

		reader.onload = function () {
			const data = JSON.parse(reader.result as string);

			$sheet = data;
		};

		reader.readAsText(file);
	}

	$: console.log('sheet', $sheet);

	$: isSheetLoaded = Object.keys($sheet).length > 0;
</script>

<span>load json</span>
<input type="file" accept=".json" on:change={loadJSON} />

{#if isSheetLoaded}
	<div class="flex flex-col gap-2 text-slate-800">
		<Header />

		<div class="grid grid-cols-[auto_1fr_auto] gap-4">
			<AbilityScores />
			<div>
				<Stats />
			</div>
			<div>third column</div>
		</div>
	</div>
{/if}
