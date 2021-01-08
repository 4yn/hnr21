<script>
    import { TemperatureTypes } from '../Engine/Enums.js'
		
	export let seed = 0;
    export let temp = TemperatureTypes.TEMP_OK;
    export let hot = false;
    import { onMount } from 'svelte';
    let temperature = 37.5;
    let oldSeed = null;

	//must edit this source later
	let src = 'head_thermometer_no_reading_updated.png';
	console.log(src)

    var letters = {
        '0': [
            [1, 1, 1],
            [1, , 1],
            [1, , 1],
            [1, , 1],
            [1, 1, 1]
        ],
        '1': [
            [, 1],
            [, 1],
            [, 1],
            [, 1],
            [, 1]
        ],
        '2': [
            [1,1,1],
            [0,0,1],
            [1,1,1],
            [1,0,0],
            [1,1,1]
        ],
        '3':[
            [1,1,1],
            [0,0,1],
            [1,1,1],
            [0,0,1],
            [1,1,1]
        ],
        '4':[
            [1,0,1],
            [1,0,1],
            [1,1,1],
            [0,0,1],
            [0,0,1]
        ],
        '5':[
            [1,1,1],
            [1,0,0],
            [1,1,1],
            [0,0,1],
            [1,1,1]
        ],
        '6':[
            [1,1,1],
            [1,0,0],
            [1,1,1],
            [1,0,1],
            [1,1,1]
        ],
        '7':[
            [1,1,1],
            [0,0,1],
            [0,0,1],
            [0,0,1],
            [0,0,1]
        ],
        '8':[
            [1,1,1],
            [1,0,1],
            [1,1,1],
            [1,0,1],
            [1,1,1]
        ],
        '9':[
            [1,1,1],
            [1,0,1],
            [1,1,1],
            [0,0,1],
            [1,1,1]
        ],
		'.' : [
            [, ,],
            [, ,],
            [, ,],
            [, ,],
            [, ,1]
		]
	};


    let canvas;
    
    function updateImage() {
        const context = canvas.getContext('2d');

		var base_image = new Image();
        base_image.onload = function () {
			context.webkitImageSmoothingEnabled = false;
			context.mozImageSmoothingEnabled = false;
			context.imageSmoothingEnabled = false;
			context.drawImage(base_image, 0, 0, 200, 200);
			draw(temperature.toString().slice(0, 4), 4);
		};

		base_image.src = src;
		
		function draw(string, size) {

			var needed = [];
			string = string.toUpperCase();
			for (var i = 0; i < string.length; i++) {
				var letter = letters[string.charAt(i)];
				if (letter) {
					needed.push(letter);
				}
			}

			context.fillStyle = (parseFloat(string)>=37.5) ? 'red' : 'green';

			var currX = 0, offsetx = 70, offsety = 125;
			for (i = 0; i < needed.length; i++) {
				letter = needed[i];
				var currY = 0;
				var addX = 0;
				for (var y = 0; y < letter.length; y++) {
					var row = letter[y];
					for (var x = 0; x < row.length; x++) {
						if (row[x]) {
							context.fillRect(offsetx + currX + x * size, offsety + currY, size, size);
						}
					}
					addX = Math.max(addX, row.length * size);
					currY += size;
				}
				currX += size + addX;
			}

		}
    }

	onMount(() => {
        updateImage();
    });
    
    $: {
        if (seed !== oldSeed && oldSeed !== null) {
            if (temp === TemperatureTypes.TEMP_OK) {
                temperature = 37.4 - ((seed * seed * seed) % 15) / 10.0
            } else {
                temperature = 37.5 + ((seed * seed * seed) % 10) / 10.0
            }

            if (hot) {
                temperature = temperature + 0.4;
            }

            updateImage();
        }
        oldSeed = seed
    }

</script>

<main>
    
	<div style="position:relative;">
		<canvas
		bind:this={canvas}
		width={200}
		height={200}
		style="position:absolute;"
		></canvas>
    </div>

</main>

<style>
    main {
        position: absolute;
        padding-top: 50px;
    }
</style>