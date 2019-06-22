<script>
	import { onMount } from 'svelte';
	import { doPrufer } from "./prufer.js"; 
	import { beforeUpdate, afterUpdate } from 'svelte';

	let graphWidth;

	// let chart, graph;
	let prufer = [];
	let pruferString = "";

	addPruferNode(4);
	addPruferNode(4);
	addPruferNode(3);
	addPruferNode(4);
	addPruferNode(4);
	addPruferNode(2);

	onMount(async () => {
		setTimeout(() => {
			rednerChart(doPrufer(prufer));
			prufer = [];
		}, 100);
	})

	function onResize() {
		setTimeout(() => {
			rednerChart(doPrufer(prufer));
		}, 100);
	}

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
			resetPrufer();
			rednerChart([[1,2]]);
			return;
		}

		if (key === "d") {
			removeLastPruferNode();
			rednerChart(doPrufer(prufer));
			return true;
		}
		
		var number = parseInt(key);
		if (number != undefined && number > 0 && number <= 9){
			addPruferNode(number);
			rednerChart(doPrufer(prufer));
			return;
		}
	}

	function addPruferNode(char){
		prufer.push(parseInt(char));
		pruferString = prufer.join(", ");
	}

	function removeLastPruferNode(){
		prufer.splice(prufer.length-1, 1);
		pruferString = prufer.join(", ");
	}

	function resetPrufer(){
		prufer = [];
		pruferString = "";
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

<svelte:window on:keydown={handleKeydown} on:resize={onResize} />
<div class="container" align="center" bind:clientWidth={graphWidth}>	
	<h1>Prüfer Generator</h1>
	<h5>Press number keys to add items, Clear the list by pressing <code>x</code></h5>
	{#if pruferString.length > 0}
	<h2>{pruferString}</h2>
	{:else}
	<h1 style="color: #aaa">...</h1>
	{/if}

	<canvas id="canvasID" width="{graphWidth-100}" height="350"></canvas>
</div>
