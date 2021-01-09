<script>
	import { onMount } from 'svelte';
	
	export let queueSize;
	var prevQ = null;

	function vibrate(dx){
		return dx + Math.floor(Math.random()*21 - 10);
	}

	//coordinates of the people
	var arr = [
		[390, 350],
		[390, 175],
		[460, 175],
		[530, 175],
		[600, 175],
		[670, 175],
		[740, 175],
		[810, 175],
		[880, 175],
		[950, 175],
		[1020, 175],
		[1090, 175],
		[1160, 175],
		[1160, 90],
		[1160, 10],
		[1090, 10],
		[1020, 10],
		[950, 10],
		[880, 10],
		[810, 10],
		[740, 10],
		[670, 10],
		[600, 10],
		[530, 10],
		[460, 10],
		[390, 10],
		[320, 10],
		[250, 10],
		[180, 10],
		[110, 10],
		[40, 10],
	];

	let src = 'tempminigame3.png';
	let src2 = 'people2.png';
	const carr = [];

    $: {


		if (prevQ===null || prevQ === queueSize || queueSize < 0){
			prevQ = queueSize;
		} else {
			console.log(queueSize);
			if (prevQ < queueSize){
				for (let i = carr.length; i < Math.min(30, queueSize); i++){
					let person2 = new Image();
					person2.src = src2;
					person2.style.left = arr[i][0].toString() + "px";
					person2.style.top = arr[i][1].toString() + "px";
					person2.style.textAlign="initial";
					person2.style.position = "absolute";
					person2.style.zIndex = "10"
					person2.style.width = "36px";
					person2.style.height = "48px";
					person2.style.transition = "left 1s, top 1s";
					document.getElementById('gg').appendChild(person2); 
					carr.push([person2, arr[i][0], arr[i][1]]);
				}
			} else {
				for (let i = queueSize; i < prevQ; i++){
					carr.shift();
					var list = document.getElementById('gg');
					list.removeChild(list.childNodes[1]); 
				}
			}
			prevQ = queueSize;
			animate();
		}

		function animate() {
			for (var i = 0; i < Math.min(30, carr.length); i++){
				if ((carr[i][1]-arr[i][0])*(carr[i][1]-arr[i][0]) + (carr[i][2]-arr[i][1])*(carr[i][2]-arr[i][1]) > 100){
					console.log("FALSE")
					console.log()
					carr[i][0].style.left = (vibrate(arr[i][0])).toString() + "px";
					carr[i][0].style.top = (vibrate(arr[i][1])).toString() + "px";
					carr[i][1] = arr[i][0];
					carr[i][2] = arr[i][1];
				} else {
					carr[i][1] = arr[i][0];
					carr[i][2] = arr[i][1];
					carr[i][0].style.left = (vibrate(arr[i][0])).toString() + "px";
					carr[i][0].style.top = (vibrate(arr[i][1])).toString() + "px";
				}
			}

		}
    }

</script>

<main>
	<!--<div>
		Minimap component
	</div>-->
	<div class="background-wrapper" id="gg">
		<div class="background">
			<div>
				<img class="sharp" {src} alt="booth">
			</div>
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

	#gg {
		text-align: initial;
	}

	.background > img {
		width: 100%;
	}
</style>