<script>
	import { HandTypes } from '../Engine/Enums.js';

	import phoneDino from '../../res/phone/phoneDino.png'
	import phoneHome from '../../res/phone/phoneHome.png'
	import phoneNokia from '../../res/phone/phoneNokia.png'
	import phoneSE from '../../res/phone/phoneSE.png'
	import phoneUnsafe from '../../res/phone/phoneUnsafe.png'
	import phoneTT from '../../res/phone/phoneTT.png'

	export let phoneType = HandTypes.PHONE_SAFE_ENTRY;
	export let seed = 0;

	let screen;

	$: {
		switch(phoneType) {
			case HandTypes.PHONE_SAFE_ENTRY:	
				screen = phoneSE;
			break;
			case HandTypes.PHONE_SAFE_ENTRY_FAKE:
			case HandTypes.PHONE_TRACE_TOGETHER_FAKE:
				screen = phoneUnsafe;
			break;
			case HandTypes.PHONE_TRACE_TOGETHER:
				screen = phoneTT;
			break;
			case HandTypes.PHONE_OTHER:
				let x = (seed + 2) % 3
				switch (x) {
					case 0: 
					screen = phoneDino;
					break;
					case 1: 
					screen = phoneNokia;
					break;
					case 2:
					screen = phoneHome;
					break;
				}
			break;
		}
	}
</script>

<main>
	<div style="position: absolute;">
		<img src={screen} alt="phoneScreen">
	</div>
</main>

<style>
	main {
		position: absolute;
		top: 0px;
		left: 0px;
	}

	main img {
		width: 100px;
		height: 100px;
		image-rendering: crisp-edges;
	}
</style>