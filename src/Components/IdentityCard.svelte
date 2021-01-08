<script>
    import ICPink from '../../res/ic/icBlue.png'
    import ICBlue from '../../res/ic/icBlue.png'
    import ICGreen from '../../res/ic/icGreen.png'
    
    export let seed = 0;

    let icSrc

    $: {
        switch(seed * seed * seed % 3) {
            case 0:
                icSrc = ICPink;
                break;
            case 1:
                icSrc = ICBlue;
                break;
            case 2: 
                icSrc = ICGreen;
                break;
        }
    }
</script>

<main>
	<div style="position: absolute;">
		<img src={icSrc} alt="ic">
	</div>
</main>

<style>
	main {
		position: absolute;
		top: 20px;
		left: 20px;
	}

	main img {
		width: 70px;
		height: 70px;
		image-rendering: crisp-edges;
	}
</style>