<script>
	import personFactory from './PersonFactory.js'

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