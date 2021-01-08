<script>
	import { MaskTypes } from '../Engine/Enums.js'
	import personFactory from './PersonFactory.js'
	import Hand from './Hand.svelte'

	export let traits;

	// Heat 1 or more is fever, heat 0.01 is ok, heat null is normal portrait
	export let selector = {};
	// export let selector = {heat: 1};
	export let scale = 2;

	let personSrc = null

	$: {
		let maskSelector = {}
		switch (traits.mask) {
			case MaskTypes.MASK_NONE:
				maskSelector['mask'] = 0
				break
			case MaskTypes.MASK_OK:
				maskSelector['mask'] = 1 + traits.seed % 5
				break
			case MaskTypes.MASK_FUNNY:
				maskSelector['mask'] = 6 + traits.seed % 2
				break
		}
		personFactory(traits.seed, {...selector, ...maskSelector}).then((res) => {
			personSrc = res
		})
	}

</script>

<main>
	<div class="person-container">
		<img src={personSrc} alt="person" style="transform: scale({scale})">
	</div>
	<Hand seed={traits.seed} holding={traits.hand}/>
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