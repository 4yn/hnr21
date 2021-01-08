<script>
	import Token from './Token.svelte'
	import TemperatureScanner from './TemperatureScanner.svelte'
	import TemperatureCamera from './TemperatureCamera.svelte'
	import Phone from './Phone.svelte'
	import Person from './Person.svelte'
	import Notifications from './Notifications.svelte'

	export let gameDay;
	export let started;
</script>

<main>
	Booth component
	<Token/>
	<TemperatureScanner/>
	<TemperatureCamera/>
	<Phone/>
	<Person/>
	<Notifications gameDay={gameDay} started={started}/>
</main>

<style>
</style>