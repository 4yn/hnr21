<script>
	import { onMount } from 'svelte';
	
	export let queueSize;
	var prevQ = null;

	//coordinates of the people
	var arr = [
		[90, 80],
		[110, 80],
		[130, 80],
		[150, 80],
		[170, 80],
		[190, 80],
		[210, 80],
		[230, 80],
		[250, 80],
		[270, 80],
		[270, 40],
		[270, 0],
		[250, 0],
		[230, 0],
		[210, 0],
		[190, 0],
		[170, 0],
		[150, 0],
		[130, 0],
		[110, 0],
		[90, 0],
		[70, 0],
		[50, 0],
		[30, 0],
		[10, 0],
	];

	let src = 'tempminigame3.png';
	let src2 = 'people2.png';
	let canvas;

	onMount(() => {

		const context = canvas.getContext('2d');

		var base_image = new Image();
		base_image.onload = function () {
			context.webkitImageSmoothingEnabled = false;
			context.mozImageSmoothingEnabled = false;
			context.imageSmoothingEnabled = false;
			context.drawImage(base_image, 0, 0, context.canvas.width, context.canvas.height);
		};

		base_image.src = src;

	});

	function animate() {
		const context = canvas.getContext('2d');

		context.clearRect(0, 0, canvas.width, canvas.height);  // clear canvas

		var base_image = new Image();
		base_image.onload = function () {
			context.webkitImageSmoothingEnabled = false;
			context.mozImageSmoothingEnabled = false;
			context.imageSmoothingEnabled = false;
			context.drawImage(base_image, 0, 0, context.canvas.width, context.canvas.height);
		};

		base_image.src = src;

		for (let i = 0; i < Math.min(25, queueSize); i++){
			let person2 = new Image();
			person2.onload = function () {
				context.webkitImageSmoothingEnabled = false;
				context.mozImageSmoothingEnabled = false;
				context.imageSmoothingEnabled = false;
				context.drawImage(person2, arr[i][0], arr[i][1], 16, 46);
			};
			person2.src = src2;
		}
	}

    $: {


		if (prevQ===null || prevQ === queueSize || queueSize < 0){
			prevQ = queueSize;
		} else {
			console.log(queueSize);
			animate();
		}
    }

</script>

<main>
	<!--<div>
		Minimap component
	</div>-->
	<div class="background-wrapper">
		<div class="background">
			<!--<img class="sharp" {src} alt="booth">-->
			<canvas
			bind:this={canvas}
			class="sharp"
			></canvas>
		</div>
	</div>
</main>

<style>
	main {
		position: relative;
	}

	.sharp {
		image-rendering: -moz-crisp-edges;
		image-rendering: -o-crisp-edges;
		image-rendering: -webkit-optimize-contrast;
		-ms-interpolation-mode: nearest-neighbor;
		width: 100%;
		height:100%;
	}

	.background {
		position: relative;
		height: 100%;
		width: 100%;
	}

	.background-wrapper {
		z-index: -10;
		position: absolute;
		top: 0;
		left: 0;
		bottom: 0;
		right: 0;
	}

	.background > img {
		width: 100%;
	}
</style>