<script lang="ts">
	import { Slider } from '$lib/components/ui/slider/index.js';

	export let value: number;
	export let max;

	let sliderValue = [value];

	function handleChange(v: number[]) {
		value = v[0];
	}
</script>

<div>
	<div class="flex max-w-80 gap-4">
		<span class="font-normal">{value}</span>
		<Slider onValueChange={handleChange} value={sliderValue} {max} step={1} class="max-w-[70%]" />
		<span class="font-normal">{max}</span>
	</div>
</div>
