<script lang="ts">
	import '../app.css';

	import { Button } from '$lib/components/ui/button';

	import DarkModeIcon from '~icons/material-symbols/dark-mode';
	import LightModeIcon from '~icons/material-symbols/light-mode';
	import SaveIcon from '~icons/material-symbols/save-outline';
	import LoadIcon from '~icons/mdi/file-outline';

	import { ModeWatcher, toggleMode } from 'mode-watcher';

	import { abilityScores, attacks, info, spells, stats } from '$lib/stores/sheet';
	import { formatDate } from '$lib/utils';

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

		const characterName = $info.characterName.trim().toLowerCase();
		const playerName = $info.playerName.trim().toLowerCase();
		const date = formatDate(new Date());
		const fileName = `${date}${playerName ? '-' + playerName : ''}${characterName ? '-' + characterName : ''}`;

		const data = JSON.stringify(sheet, null, 2);
		const blob = new Blob([data], { type: 'application/json' });
		const url = URL.createObjectURL(blob);

		const a = document.createElement('a');
		a.href = url;
		a.download = `${fileName}.json`;
		a.click();
	}
</script>

<ModeWatcher />

<header
	class="xs:flex-row sticky top-0 z-[1] flex flex-col items-center justify-between gap-2 border-b-2 bg-white p-4 drop-shadow-sm dark:bg-zinc-950"
>
	<h1 class="xs:text-2xl font-bold">D&D Sheet</h1>
	<div class="flex gap-2">
		<input class="hidden" type="file" bind:this={fileInput} on:change={handleFileSelect} />
		<Button class="relative flex gap-2 p-2" variant="outline" on:click={toggleMode}>
			<LightModeIcon class="absolute dark:scale-0" />
			<DarkModeIcon class="scale-0 dark:scale-100" />
		</Button>
		<Button class="flex gap-2" variant="outline" on:click={() => fileInput.click()}>
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
