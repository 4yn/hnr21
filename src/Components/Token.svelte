<script>
	import { HandTypes } from '../Engine/Enums.js';

	import Airpod from '../../res/tracetogether/Airpod.png'
	import Paper from '../../res/tracetogether/Paper.png'
	import WhiteCrack from '../../res/tracetogether/whiteCrack.png'
	import WhiteNoQR from '../../res/tracetogether/whiteNoQR.png'
	import WhiteQR from '../../res/tracetogether/whiteQR.png'

	export let ttType = HandTypes.TOKEN_OK;
	export let seed = 0;

	let token;

	$: {
		switch (ttType) {
			case HandTypes.TOKEN_OK:
				token = WhiteQR;
				break;
			case HandTypes.TOKEN_FAKE:
				token = seed & 8 ? Airpod : Paper;
				break;
			case HandTypes.TOKEN_BAD:
				token = seed & 8 ? WhiteCrack : WhiteNoQR;
				break;
		}
	}
</script>

<main>
	<img src={token} alt="token">
</main>

<style>
	main {
		position: absolute;
		top: 20px;
		left: 25px;
	}

	main img {
		width: 50px;
		height: 50px;
	}
</style>