<script>
	import Token from './Token.svelte'
	import TemperatureScanner from './TemperatureScanner.svelte'
	import TemperatureCamera from './TemperatureCamera.svelte'
	import Phone from './Phone.svelte'
	import Person from './Person.svelte'
	import Notifications from './Notifications.svelte'

	export let gameDay;
<<<<<<< HEAD
	export let gameRunning;
=======
	export let gameStarted;
	export let traits;
	export let rules;
>>>>>>> origin

	let src = 'background.png';
</script>

<main>
	<div>
		Booth component
		<Token/>
		<div class="scanner-container">
			<TemperatureScanner/>
			<TemperatureCamera/>
		</div>
		<div class="person-container">
			<Phone/>
			<Person scale={3}/>
		</div>
		<Notifications gameDay={gameDay} gameRunning={gameRunning}/>
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

	.scanner-container {
		position: absolute;
		top: 150px;
		left: 900px;
	}

	.person-container {
		position: absolute;
		top: 50px;
		left: 150px;
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