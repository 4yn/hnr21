<script>
	import HandTypes from '../Engine/Enums.js';

	export const PhoneModelTypes = {
		MODEL_IPHONE: 'MODEL_IPHONE',
		MODEL_IPHONE_LARGE: 'MODEL_IPHONE_LARGE',
		MODEL_IPHONE_OLD: 'MODEL_IPHONE_OLD',
		MODEL_SAMSUNG: 'MODEL_SAMSUING',
		MODEL_XIAOMI: 'MODEL_XIAOMI',
		MODEL_PIXEL: 'MODEL_PIXEL',
		MODEL_NOKIA: 'MODEL_NOKIA'
	}

    export const PhoneOtherTypes = {
		SCREEN_ERROR: 'SCREEN_ERROR',
		SCREEN_NO_INTERNET: 'SCREEN_NO_INTERNET',
		SCREEN_HOME: 'SCREEN_HOME'
	}

	export let model = PhoneModelTypes.MODEL_IPHONE;
	// export let screen = PhoneScreenTypes.SCREEN_SAFE_ENTRY;
	let screen = '__'
</script>

<main>
	Phone component
	Model {model} screen {screen}
</main>

<style>
</style>