<script lang="ts">
	export let label: string;
	export let value: string;
</script>

<div class="flex flex-col">
	<label class="font-bold text-slate-600" for="character-name">{label}</label>
	<input class="rounded-md border-2 pl-1" type="text" {value} />
</div>
