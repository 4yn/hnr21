<script>
    import { onDestroy } from 'svelte'

    import Minimap from '../Components/Minimap.svelte'
    import Booth from '../Components/Booth.svelte'

    import GameEngine from '../Engine/GameEngine.js'

    let gameEngineInstance = new GameEngine();
    let started = false;
    let gameTick = 0;
    let queueSize = 0;

    let gameLoopInterval = null;
    onDestroy(() => {
        if (gameLoopInterval) {
            clearInterval(intervalToken);
        }
    })

    function startGame() {
        started = true;
        gameLoopInterval = setInterval(() => gameLoop(), 100);
    }

    function gameLoop() {
        console.log('tick')
        gameEngineInstance.doTick();
        queueSize = gameEngineInstance.queueSize;
        gameTick = gameEngineInstance.tick;
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
    Tick: {gameTick}, Queue: {queueSize}
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