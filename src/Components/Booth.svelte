<script>
	import Token from './Token.svelte'
	import TemperatureScanner from './TemperatureScanner.svelte'
	import TemperatureCamera from './TemperatureCamera.svelte'
	import Phone from './Phone.svelte'
	import Person from './Person.svelte'
	import Notifications from './Notifications.svelte'

	export let gameDay;
	export let started;

	let src = 'background.png';
</script>

<main>
	<div>
		Booth component
		<Token/>
		<TemperatureScanner/>
		<TemperatureCamera/>
		<Phone/>
		<Person/>
		<Notifications gameDay={gameDay} started={started}/>
	</div>
	<div class="background-wrapper">
		<div class="background">
			<img class="sharp" {src} alt="booth">
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
		object-fit: cover;
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