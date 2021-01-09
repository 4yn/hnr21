<script>
	import TemperatureScanner from './TemperatureScanner.svelte'
	import TemperatureCamera from './TemperatureCamera.svelte'
	import Person from './Person.svelte'

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
		<div class="person-container">
			{#if traits}
				<Person scale={2.5} traits={traits}/>
			{/if}
		</div>
	</div>
	<div class="wrapper">
		<div class="foreground">
			<img class="sharp" src={fgSrc} alt="booth">
		</div>
	</div>
	<div class="wrapper">
		<div class="scanner-container">
			{#if !!rules && !!traits}
				{#if !rules.IR_CAMERA}
					<TemperatureScanner seed={traits.seed} hot={rules.HIGH_TEMP} temp={traits.temperature}/>
				{:else}
					<TemperatureCamera seed={traits.seed} hot={rules.HIGH_TEMP} temp={traits.temperature}/>
				{/if}
			{/if}
			
		</div>
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
		top: 45px;
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