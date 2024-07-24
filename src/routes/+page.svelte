<script lang="ts">
	import { AbilityScores, Header, Stats } from '$lib';
	import Attacks from '$lib/components/Attacks/Attacks.svelte';

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
			<div class="flex flex-col gap-2">
				<Stats />
				<Attacks />
			</div>
			<div>third column</div>
		</div>
	</div>
{/if}
