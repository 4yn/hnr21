<script>
	import Token from './Token.svelte'
	import TemperatureScanner from './TemperatureScanner.svelte'
	import TemperatureCamera from './TemperatureCamera.svelte'
	import Phone from './Phone.svelte'
	import Person from './Person.svelte'
	import Notifications from './Notifications.svelte'

	export let gameDay;
	export let gameRunning;
	export let traits;
	export let rules;

	let src = 'background.png';
	let fgSrc = 'foreground.png';
</script>

<main>
	<div class="wrapper">
		<div class="background">
			<img class="sharp" {src} alt="booth">
		</div>
	</div>
	<div class="wrapper">
		Booth component
		<Token/>
		<div class="person-container">
			<Phone/>
			<Person scale={2.5}/>
		</div>
	</div>
	<div class="wrapper">
		<div class="foreground">
			<img class="sharp" src={fgSrc} alt="booth">
		</div>
	</div>
	<div class="wrapper">
		<div class="scanner-container">
			<TemperatureScanner/>
			<TemperatureCamera/>
		</div>
	</div>
	<div class="wrapper">
		<Notifications gameDay={gameDay} gameStarted={gameStarted}/>
	</div>
</main>

<style>
	main {
		position: relative;
	}

	.scanner-container {
		position: absolute;
		top: 80px;
		left: 550px;
	}

	.person-container {
		position: absolute;
		top: 0px;
		left: 190px;
	}

	.sharp {
		image-rendering: -moz-crisp-edges;
		image-rendering: -o-crisp-edges;
		image-rendering: -webkit-optimize-contrast;
		-ms-interpolation-mode: nearest-neighbor;
		object-fit: cover;
	}

	.wrapper {
		position: absolute;
		top: 0;
		left: 0;
		bottom: 0;
		right: 0;
		height: 100%;
		width: 100%;
	}

	.background {
		position: relative;
		height: 100%;
		width: 100%;
	}

	.background > img {
		width: 100%;
	}

	.foreground {
		position: relative;
		height: 100%;
		width: 100%;
	}

	.foreground > img {
		width: 100%;
	}
</style>