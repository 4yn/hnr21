<script>

    export const IdentificationCardType = {
		IC_PINK: 'IC_PINK',
		IC_BLUE: 'IC_BLUE',
        IC_GREEN: 'IC_GREEN',
        IC_ORANGE: 'IC_ORANGE',
        IC_PURPLE: 'IC_PURPLE',
        IC_YELLOW: 'IC_YELLOW',
	}

    export let scale = 2;
	export let type = IdentificationCardType.IC_PINK;
    import cardSrc from '../../res/ic/icPink.png'
</script>

<main>
    Identification Card component
    Type {type}
    <div class="card-container" style="transform: scale({scale})">
		<img src={cardSrc} alt="card">
	</div>
</main>

<style>
</style>