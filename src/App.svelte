<script>
	export let name;
	import Game from './Layout/Game.svelte'
</script>

<main>
	<h1>Safeentry Please</h1>
	<div class="container-outer">
		<div class="container-inner">
			<Game></Game>
		</div>
	</div>
</main>

<style>
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;

		-webkit-touch-callout: none; /* iOS Safari */
		-webkit-user-select: none; /* Safari */
		-khtml-user-select: none; /* Konqueror HTML */
		-moz-user-select: none; /* Old versions of Firefox */
		-ms-user-select: none; /* Internet Explorer/Edge */
		user-select: none; /* Non-prefixed version, currently supported by Chrome, Edge, Opera and Firefox */
	}

	.container-outer {
		position: relative;
		outline: 0.25rem solid grey;
	}

	.container-outer:before {
		display: block;
		content: "";
		width: 100%;
		padding-top: 56.25%;
	}

	.container-inner {
		position: absolute;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
	}

	h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>