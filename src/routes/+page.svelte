<script lang="ts">
	import Header from '../components/Header/Header.svelte';

	interface Sheet {
		characterName: string;
	}

	let sheet: Sheet;

	function loadJSON(event: Event) {
		const file = event.target?.files[0];
		const reader = new FileReader();

		reader.onload = function () {
			const data = JSON.parse(reader.result as string);

			sheet = data;
		};

		reader.readAsText(file);
	}

	$: console.log('sheet', sheet);
</script>

<span>load json</span>
<input type="file" accept=".json" on:change={loadJSON} />

{#if sheet} <Header {sheet} /> {/if}
