<script>
	export let param;

	import Token from './Token.svelte'
	import TemperatureScanner from './TemperatureScanner.svelte'
	import TemperatureCamera from './TemperatureCamera.svelte'
	import Phone from './Phone.svelte'
</script>

<main>
	Booth component
	<Token/>
	<TemperatureScanner/>
	<TemperatureCamera/>
	<Phone/>
</main>

<style>
</style>