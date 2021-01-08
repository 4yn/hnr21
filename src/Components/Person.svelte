<script>
	import personFactory from './PersonFactory.js'
	import Hand from './Hand.svelte'

	export let seed = 1425;
	// Heat 1 or more is fever, heat 0.01 is ok, heat null is normal portrait
	export let selector = {};
	// export let selector = {heat: 1};
	export let scale = 2;

	let personSrc = null

	$: {
		personFactory(seed, selector).then((res) => {
			personSrc = res
		})
	}

</script>

<main>
	<div class="person-container">
		<img src={personSrc} alt="person" style="transform: scale({scale})">
	</div>
	<Hand/>
</main>

<style>
	.person-container {
		position: relative;
	}
	.person-container img {
		transform-origin: 0 0;
		position: relative;
		image-rendering: pixelated;
	}
</style>