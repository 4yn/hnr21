<script>
	import {PersonPartsM, PersonPartsF} from './PersonParts.js'

	const partNames = ['body', 'face', 'eyes', 'nose', 'mouth', 'hair']

	export let seed = 14;
	export let selector = {};
	export let scale = 2;

	function hash(seed, fallback) {
		if (seed === null) return fallback
		let x = seed
		for (let i = 0; i < 10; i++) {
			x = x * x % 100009
		}
		return x
	}

	let parts = {}

	$: {
		let gender = (hash(seed, null) || selector['gender']) % 2;
		let PersonParts = gender ? PersonPartsM : PersonPartsF;
		for (let partIdx in partNames) {
			let partName = partNames[partIdx]
			parts[partName] = PersonParts[partName][hash(seed + partIdx + 1, selector[partName] || 0) % PersonParts[partName].length]
		}
	}

</script>

<main>
	Person component
	<div class="person-container" style="transform: scale({scale})">
		{#each partNames as partName (partName)}
			<img src={parts[partName]} class="person-part person-{partName}" alt={partName}/>
		{/each}
	</div>
</main>

<style>
	.person-container {
		transform-origin: 0 0;
		position: relative;
	}

	.person-part {
		image-rendering: pixelated;
		position: absolute;
		left: -32px;
		top: -32px;
	}

	.person-body {
		top: 0px;
	}
</style>