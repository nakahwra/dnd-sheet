<script lang="ts">
	import '../app.css';

	import { Button } from '$lib/components/ui/button';

	import SaveIcon from '~icons/material-symbols/save-outline';
	import LoadIcon from '~icons/mdi/file-outline';

	import { abilityScores, attacks, info, spells, stats } from '$lib/stores/sheet';

	let fileInput: HTMLInputElement;

	function handleFileSelect(event: Event) {
		const file = event.target?.files[0];
		const reader = new FileReader();

		reader.onload = function () {
			const sheet = JSON.parse(reader.result as string);

			info.set(sheet.info);
			abilityScores.set(sheet.abilityScores);
			stats.set(sheet.stats);
			attacks.set(sheet.attacks);
			spells.set(sheet.spells);
		};

		reader.readAsText(file);
	}

	function handleSave() {
		const sheet = {
			info: $info,
			abilityScores: $abilityScores,
			stats: $stats,
			attacks: $attacks,
			spells: $spells
		};

		const data = JSON.stringify(sheet, null, 2);
		const blob = new Blob([data], { type: 'application/json' });
		const url = URL.createObjectURL(blob);

		const a = document.createElement('a');
		a.href = url;
		a.download = 'sheet.json';
		a.click();
	}
</script>

<header class="sticky top-0 flex justify-between border-b-2 bg-white p-4 drop-shadow-sm">
	<h1 class="text-2xl font-bold">D&D Sheet</h1>
	<div class="flex gap-2">
		<input class="invisible" type="file" bind:this={fileInput} on:change={handleFileSelect} />
		<Button variant="outline" class="flex gap-2" on:click={() => fileInput.click()}>
			<LoadIcon />
			Load Sheet
		</Button>
		<Button class="flex gap-2" on:click={handleSave}>
			<SaveIcon />
			Save
		</Button>
	</div>
</header>

<main class="container mx-auto px-4">
	<slot />
</main>
