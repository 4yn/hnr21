<script>
	export const CameraHueTypes = {
		HUE_GREYSCALE: 'HUE_GREYSCALE',
		HUE_HUE: 'HUE_HUE',
		HUE_BLUE_RED: 'HUE_BLUE_RED'
	}

	export let temperature = 37.5;
	export let alert = false;
	export let hue = CameraHueTypes.CAMERA_GREYSCALE;
	export let inverted = false;
</script>

<main>
	Temperature Camera component
	Tempearture {temperature} alert {alert} hue {hue} inverted {inverted}
</main>

<style>
</style>