<script>
	import personFactory from './PersonFactory.js'

	export let seed = 1425;
	export let selector = {};
	export let scale = 2;

	let personSrc = null

	$: {
		personFactory(seed, selector).then((res) => {
			personSrc = res
		})
	}

</script>

<main>
	Person component
	<div class="person-container" style="transform: scale({scale})">
		<img src={personSrc} alt="person">
	</div>
</main>

<style>
	.person-container {
		transform-origin: 0 0;
		position: relative;
	}
	.person-container img {
		position: relative;
		image-rendering: pixelated;
	}
</style>