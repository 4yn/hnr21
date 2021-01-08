<script>
	export let param;
	import { onMount } from 'svelte';
	//coordinates of the people
	var arr = [
		[1, 1],
		[2, 2],
		[3, 3]
	];
	let src = 'tempminigame3.png';
	let canvas;

	onMount(() => {

		const context = canvas.getContext('2d');

		var base_image = new Image();
		base_image.onload = function () {
			context.webkitImageSmoothingEnabled = false;
			context.mozImageSmoothingEnabled = false;
			context.imageSmoothingEnabled = false;
			context.drawImage(base_image, 0, 0, context.canvas.width, context.canvas.height);
			//draw_triangle(temperature);
		};

		base_image.src = src;

		function draw_triangle(temperature) {
			let offsetx = (temperature - 37.5)*30

			context.beginPath();
			context.moveTo(offsetx + 150, 175);
			context.lineTo(offsetx + 160, 185);
			context.lineTo(offsetx + 140, 185);
			context.fill();

		}

	});

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