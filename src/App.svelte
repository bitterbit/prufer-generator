<script>
	import { onMount } from 'svelte';
	import { doPrufer } from "./propher.js"; 

	export let name;
	let chart;

	onMount(async () => {
		var graph = new flowjs.DiGraph();
		graph.addPaths(doPrufer([4,4,3,4,4,2]));
		chart = new flowjs.DiFlowChart("canvasID", graph).draw();
	});
	
</script>

<style>
	h1 {
		color: purple;
	}
</style>

<h1>Hello {name}!</h1>

<canvas id="canvasID" width="1000" height="300"></canvas>
