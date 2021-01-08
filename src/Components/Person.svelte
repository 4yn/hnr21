<script>
	import {Bodies, Faces, Eyes, Noses, Mouths, Hair} from './PersonParts.js'

	export let seed = 15, bodyId = 0, faceId = 0, eyesId = 0, noseId = 0, mouthId = 0, hairId = 0;

	let parts = {}

	function hash(seed, fallback) {
		if (seed === null) return fallback
		let x = seed
		for (let i = 0; i < 10; i++) {
			x = x * x % 100009
		}
		return x
	}

	$: {
		parts['body'] = Bodies[hash(seed, bodyId) % Bodies.length]
		parts['face'] = Faces[hash(seed + 1,faceId) % Faces.length]
		parts['eyes'] = Eyes[hash(seed + 2, eyesId) % Eyes.length]
		parts['nose'] = Noses[hash(seed + 3, noseId) % Noses.length]
		parts['mouth'] = Mouths[hash(seed + 4, mouthId) % Mouths.length]
		parts['hair'] = Hair[hash(seed + 5, hairId) % Hair.length]
	}

</script>

<main>
	Person component
	<div class="person-container">
		<img src={parts['body']} class="person-part person-body" alt="body"/>
		<img src={parts['face']} class="person-part person-face" alt="face"/>
		<img src={parts['eyes']} class="person-part person-eyes" alt="eyes"/>
		<img src={parts['nose']} class="person-part person-nose" alt="nose"/>
		<img src={parts['mouth']} class="person-part person-mouth" alt="mouth"/>
		<img src={parts['hair']} class="person-part person-hair" alt="hair"/>
	</div>
</main>

<style>
	.person-container {
		transform: scale(2);
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