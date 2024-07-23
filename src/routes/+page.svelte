<script lang="ts">
	import { Header } from '$lib';

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

	$: isSheetLoaded = Object.keys($sheet).length > 0;
</script>

<span>load json</span>
<input type="file" accept=".json" on:change={loadJSON} />

{#if isSheetLoaded} <Header /> {/if}
