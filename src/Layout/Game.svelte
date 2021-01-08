<script>
    import Minimap from '../Components/Minimap.svelte'
    import Booth from '../Components/Booth.svelte'

    const gameTickLength = 10;

    let started = false;
    let score = 0;

    export let personInBooth = false;
    export let numInQueue = 0;

    function startGame() {
        started = true;
        setInterval(() => gameLoop, 100);
    }

    function getSpawnProbability() {
        //TODO
    }

    function gameLoop() {
        if (!personInBooth && numInQueue > 0) {
            personInBooth = true;
            numInQueue--;
        }
    }
</script>

<main>
    <Minimap class="minimap"/>
    <Booth class="booth"/>
    {#if !started}
        <div class="overlay"/>
        <button on:click={startGame} class="startButton">
            Start Game
        </button>
    {/if}
</main>

<style>
    main {
        width: 100%;
        height: 100%;

        display: grid;
        grid-template-rows: 2fr 3fr;
        grid-template-columns: 1fr;
    }

    .minimap {
        grid-area: 1 / 1;
    }
    .booth {
        grid-area: 2 / 1;
    }

    .overlay {
        opacity: 0.7;
        background-color: #676767;
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
    }

    .startButton {
        position: absolute;
        height: 4em;
        width: 10em;
        top: calc(50% - 2em);
        left: calc(50% - 5em);

        color: #ff3e00;
        border-color: #dd1000;
        font-size: 1.5em;
        font-weight: 50;
        z-index: 10;
    }
</style>