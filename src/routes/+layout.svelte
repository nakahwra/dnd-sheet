<script lang="ts">
	import '../app.css';

	import * as AlertDialog from '$lib/components/ui/alert-dialog';
	import { Button } from '$lib/components/ui/button';

	import DarkModeIcon from '~icons/material-symbols/dark-mode';
	import LightModeIcon from '~icons/material-symbols/light-mode';
	import NewSheetIcon from '~icons/material-symbols/new-window';
	import SaveIcon from '~icons/material-symbols/save-outline';
	import LoadIcon from '~icons/mdi/file-outline';

	import { ModeWatcher, toggleMode } from 'mode-watcher';

	import {
		abilityScores,
		attacks,
		clearSheet,
		info,
		lastSavedSheet,
		spellcastingInfo,
		stats,
		unsavedChanges
	} from '$lib/stores/sheet';
	import { formatDate } from '$lib/utils';

	let fileInput: HTMLInputElement;

	let openLoadAlert = false;
	let openNewSheetAlert = false;

	function handleFileSelect(event: Event) {
		const file = event.target?.files[0];
		const reader = new FileReader();

		reader.onload = function () {
			const sheetString = reader.result as string;
			const sheet = JSON.parse(sheetString);

			lastSavedSheet.set(JSON.stringify(sheet));

			info.set(sheet.info);
			abilityScores.set(sheet.abilityScores);
			stats.set(sheet.stats);
			attacks.set(sheet.attacks);
			spellcastingInfo.set(sheet.spellcastingInfo);
		};

		reader.readAsText(file);
	}

	function handleSave() {
		const sheet = {
			info: $info,
			abilityScores: $abilityScores,
			stats: $stats,
			attacks: $attacks,
			spellcastingInfo: $spellcastingInfo
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

		lastSavedSheet.set(JSON.stringify(sheet));
		unsavedChanges.set(false);
	}

	function handleLoadSheetButtonClick() {
		if ($unsavedChanges) {
			openLoadAlert = true;
			return;
		}

		fileInput.click();
	}

	function handleClearSheet() {
		clearSheet();
		openNewSheetAlert = false;
	}

	function handleNewSheet() {
		if (!$unsavedChanges) {
			handleClearSheet();
			return;
		}

		openNewSheetAlert = true;
	}
</script>

<ModeWatcher />

<AlertDialog.Root bind:open={openLoadAlert}>
	<AlertDialog.Content>
		<AlertDialog.Header>
			<AlertDialog.Title>Are you sure?</AlertDialog.Title>
			<AlertDialog.Description>
				There are unsaved changes. Loading a new sheet will discard all of them.
			</AlertDialog.Description>
		</AlertDialog.Header>
		<AlertDialog.Footer>
			<AlertDialog.Cancel>Cancel</AlertDialog.Cancel>
			<AlertDialog.Action on:click={() => fileInput.click()}>Continue</AlertDialog.Action>
		</AlertDialog.Footer>
	</AlertDialog.Content>
</AlertDialog.Root>

<AlertDialog.Root bind:open={openNewSheetAlert}>
	<AlertDialog.Content>
		<AlertDialog.Header>
			<AlertDialog.Title>Are you sure?</AlertDialog.Title>
			<AlertDialog.Description>
				You are about to discard all unsaved changes and start a new sheet. This action cannot be
				undone.
			</AlertDialog.Description>
		</AlertDialog.Header>
		<AlertDialog.Footer>
			<AlertDialog.Cancel>Cancel</AlertDialog.Cancel>
			<AlertDialog.Action on:click={handleClearSheet}>Continue</AlertDialog.Action>
		</AlertDialog.Footer>
	</AlertDialog.Content>
</AlertDialog.Root>

<header
	class="sticky top-0 z-[1] flex flex-col items-center justify-between gap-2 border-b-2 bg-white p-4 drop-shadow-sm dark:bg-zinc-950 xs:flex-row"
>
	<div class="flex gap-4">
		<h1 class="font-bold xs:text-2xl">D&D Sheet</h1>
		<Button class="flex gap-2 p-2" variant="outline" on:click={handleNewSheet}>
			<NewSheetIcon />
		</Button>
	</div>
	<div class="flex items-center gap-2">
		<input class="hidden" type="file" bind:this={fileInput} on:change={handleFileSelect} />
		<Button class="relative flex gap-2 p-2" variant="outline" on:click={toggleMode}>
			<LightModeIcon class="absolute dark:scale-0" />
			<DarkModeIcon class="scale-0 dark:scale-100" />
		</Button>

		<Button class="flex gap-2" variant="outline" on:click={handleLoadSheetButtonClick}>
			<LoadIcon />
			Load Sheet
		</Button>
		<Button class={`flex gap-2 ${$unsavedChanges && 'bg-red-500'}`} on:click={handleSave}>
			<SaveIcon />
			Save
		</Button>
	</div>
</header>

<main class="container mx-auto px-4">
	<slot />
</main>
