<script>
	export let name;
	import Game from './Layout/Game.svelte'
</script>

<main>
	<div class="container-outer">
        <div class="container-inner">
            <Game></Game>
        </div>
	</div>
</main>

<style>
	main {
		overflow: hidden;
		display: flex;
		flex-direction: column;
		align-items: center;

		text-align: center;
		padding: 1em;
		max-width: 240px;

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
		width: min(100vw - 48px, (100vh - 48px) * 8 / 5);
	}

	.container-outer:before {
		display: block;
		content: "";
		padding-top: min((100vw - 48px) * 5 / 8, 100vh - 48px);
	}

	.container-inner {
		position: absolute;
		top: 0;
        right: 0;
	    bottom: 0;
	    left: 0;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>