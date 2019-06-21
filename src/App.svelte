<script>
	import { onMount } from 'svelte';
	import { doPrufer } from "./propher.js"; 

	// let chart, graph;
	let prufer = [];
	let pruferString = "";

	updatePrufer(4);
	updatePrufer(4);
	updatePrufer(3);
	updatePrufer(4);
	updatePrufer(4);
	updatePrufer(2);

	onMount(async () => {
		rednerChart(doPrufer(prufer));
	})
	
	function rednerChart(paths){
		let graph = new flowjs.DiGraph();
		graph.addPaths(paths);
		let chart = new flowjs.DiFlowChart("canvasID", graph);
		chart.color = "#333";
		chart.draw();
	};

	function handleKeydown(event) {
		let key = event.key;
		let keyCode = event.keyCode;

		if (key == 'x') {
			prufer = [];
			pruferString = "";
			rednerChart([[1,2]]);
			return;
		}
		
		var number = parseInt(key);
		if (number != undefined && number >= 0 && number <= 9){
			updatePrufer(number);
		}

		rednerChart(doPrufer(prufer));
	}

	function updatePrufer(char){
		prufer.push(parseInt(char));
		pruferString = prufer.join(", ");
	}
	
</script>

<style>
	code {
		background: #333;
		color: white;
	}
	.container {
		margin-top: 20px;
	}
</style>

<svelte:window on:keydown={handleKeydown}/>
<div class="container" align="center">	
	<h1>Prüfer Generator</h1>
	<h5>Press number keys to add items, Clear the list by pressing <code>x</code></h5>
	<h2>{pruferString}</h2>
	<canvas id="canvasID" width="1000" height="300"></canvas>
</div>
