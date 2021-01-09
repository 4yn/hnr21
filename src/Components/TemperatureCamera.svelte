<script>
	import { TemperatureTypes, MaskTypes } from '../Engine/Enums.js'
	import personFactory from './PersonFactory.js'
	
	export const CameraHueTypes = {
		HUE_GREYSCALE: 'HUE_GREYSCALE',
		HUE_HUE: 'HUE_HUE',
		HUE_BLUE_RED: 'HUE_BLUE_RED'
	}

	export let seed = 0;
	export let traits = {}
	export let hot = false;
	export let temp = TemperatureTypes.TEMP_OK;
	// export let hue = CameraHueTypes.CAMERA_GREYSCALE;

	let oldSeed = null;
	let temperature = 37.5;

	import { onMount } from 'svelte';

	let src = 'thermal_screen_with_bar.png';

	let canvas;

	function updateImage(innerImage=null) {
		const context = canvas.getContext('2d');

		var base_image = new Image();
        base_image.onload = function () {

			context.beginPath();
			context.fillStyle = "blue";
			context.rect(10, 20, 230, 180);
			context.fill();

			if (innerImage) {
				console.log(innerImage)
				context.drawImage(innerImage, 0, 0, 32, 32, 30, 20, 210, 180);
			}

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
	};

	onMount(() => {
		updateImage();
	})

	$: {
        if (seed !== oldSeed && canvas) {
			let maskSelector = {}
			switch (traits.mask) {
				case MaskTypes.MASK_NONE:
					maskSelector['mask'] = 0
					break
				case MaskTypes.MASK_OK:
					maskSelector['mask'] = 1 + traits.seed % 5
					break
				case MaskTypes.MASK_FUNNY:
					maskSelector['mask'] = 6 + traits.seed % 2
					break
			}

            if (temp === TemperatureTypes.TEMP_OK) {
                temperature = 37.4 - ((seed * seed * seed) % 15) / 10.0
            } else {
                temperature = 37.5 + ((seed * seed * seed) % 10) / 10.0
            }

            if (hot) {
                temperature = temperature + 0.4;
			}
			
			personFactory(traits.seed, {...maskSelector, heat: (temperature - 34) / 10}).then((res) => {
				let img = new Image()
				img.src = res;
				return new Promise((resolve) => {
					img.onload = function () {
						resolve(img)
					}
				})
			}).then((res) => {
				updateImage(res)
			})

            updateImage();
		}
		if (canvas) {
			oldSeed = seed
		}
    }
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