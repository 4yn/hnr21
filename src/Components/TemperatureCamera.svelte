<script>
	export const CameraHueTypes = {
		HUE_GREYSCALE: 'HUE_GREYSCALE',
		HUE_HUE: 'HUE_HUE',
		HUE_BLUE_RED: 'HUE_BLUE_RED'
	}

	export let temperature = 37.5;
	export let alert = false;
	export let hue = CameraHueTypes.CAMERA_GREYSCALE;
	export let inverted = false;

	import { onMount } from 'svelte';

	//must edit this source later
	let src = 'thermal_screen_with_bar.png';

	let canvas;

	onMount(() => {

		const context = canvas.getContext('2d');

		var base_image = new Image();
        base_image.onload = function () {
			context.webkitImageSmoothingEnabled = false;
			context.mozImageSmoothingEnabled = false;
			context.imageSmoothingEnabled = false;
			context.drawImage(base_image, 0, 0, 250, 250);
			draw_triangle(temperature);
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
	<div style="position:relative;">
		<canvas
		bind:this={canvas}
		width={250}
		height={250}
		style="position:absolute;"
		></canvas>
    </div>
</main>

<style>
	main {
        position: absolute;
		padding-left: 50px;
    }
</style>