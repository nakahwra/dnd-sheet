<script lang="ts">
	export let label: string;
	export let value: number | string;
</script>

<div class="flex w-full flex-col space-y-2">
	<div class="flex items-center space-x-1">
		<slot />
		<span class="text-sm font-semibold leading-none">{label.toUpperCase()}</span>
	</div>
	<span class="h-[42px] w-full rounded-md border-[1px] px-4 py-2">
		{value}
	</span>
</div>
