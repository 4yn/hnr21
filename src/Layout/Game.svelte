<script>
    import { onDestroy } from 'svelte'

    import Minimap from '../Components/Minimap.svelte';
    import Booth from '../Components/Booth.svelte';
    import Notifications from '../Components/Notifications.svelte';
    import Warnings from '../Components/Warnings.svelte';
    import GameEngine from '../Engine/GameEngine.js';
    
    const GAME_OVER_MESSAGE = "You have been fired due to complaints of long lines and wait times. Try harder next time!";

    let soundNotification = new Audio('sounds/notification.ogg');

    let gameEngineInstance = new GameEngine(soundNotification);
    let gameHasStarted = false;
    let gameRunning = false;

    let gameTick = 0;
    let gameDay = 0;
    let queueSize = 0;

    let lastIllegalType = null;
    let numWarnings = 0;
    
    let traits = null;
    let rules = [];

    let keyPressListener = null;
    let keyPressTimeout = null;
    let keyPressDisabled = false;

    onDestroy(() => {
        if (keyPressListener) {
            document.removeEventListener('keyup', keyPressListener);
        }
        if (keyPressTimeout) {
            clearTimeout(keyPressTimeout);
        }
    })

    function startGame() {
        gameHasStarted = true;
        gameRunning = true;
        keyPressListener = document.addEventListener('keyup', handleKeyPress);
        
        soundNotification.play();

        // Initialize game engine
        gameEngineInstance.setupCallbacks(onEngineUpdate, onGameEnd, onWarning);
        gameEngineInstance.doTick();
    }

    // Callback to be passed to game engine, triggered on updates.
    function onEngineUpdate(engine) {       
        queueSize = engine.queueSize;
        gameTick = engine.tick;
        gameDay = engine.day;
        traits = engine.traits;
        rules = engine.rules;
    }

    function onGameEnd() {
        gameRunning = false;
    }

    function onWarning(illegalType) {
        lastIllegalType = illegalType;
        numWarnings++;
    }

    function handleKeyPress(e) {
        // Only listen to A, D and Enter
        if (!["KeyA", "KeyD"].includes(e.code) || keyPressDisabled) {
            return;
        }

        keyPressDisabled = true;
        keyPressTimeout = setTimeout(() => {keyPressDisabled = false}, 500);
        gameEngineInstance.decide(e.code === "KeyA");
    }
</script>

<main>
    <Minimap class="minimap" queueSize={queueSize}/>
    <Booth class="booth" traits={traits} rules={rules}/>
    <Notifications gameDay={gameDay} gameRunning={gameRunning}/>
    <Warnings lastIllegalType={lastIllegalType} numWarnings={numWarnings}/>
    
    {#if !gameRunning}
        <div class="overlay"/>
        {#if !gameHasStarted}
            <button on:click={startGame} class="gameButton centeredButton">
                Start Game
            </button>
        {:else}
            <div class="overlay"/>
            <div class="gameOverContainer">
                <p class="gameOverText">{GAME_OVER_MESSAGE}</p>
                <button on:click={() => window.location.reload()} class="gameButton">
                    Restart
                </button>
            </div>
        {/if}
    {/if}
    <div class="debug">
        Tick: {gameTick}, Day: {gameDay}, Queue: {queueSize}
    </div>
</main>

<style>
    main {
        width: 100%;
        height: 100%;

        display: grid;
        grid-template-rows: 2fr 3fr;
        grid-template-columns: 1fr;
        overflow: hidden;
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

    .centeredButton {
        position: absolute;
        top: calc(50% - 2em);
        left: calc(50% - 5em);
    }

    .gameButton {
        height: 3em;
        width: 10em;

        color: #ff3e00;
        border-color: #dd1000;
        font-size: 1.5em;
        font-weight: 50;
        z-index: 10;
    }

    .gameOverContainer {
        position: absolute;
        height: 16em;
        width: 24em;
        padding: 4em;
        top: calc(50% - 12em);
        bottom: calc(50% - 12em);
        left: calc(50% - 16em);
        right: calc(50% - 16em);
        text-align: center;

        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: center;

        background-color: #eeeeee;
        border-width: 0.25em;
        border-color: #dd1000;
        z-index: 5;
    }

    .gameOverText {
        font-size: 1.2em;
        font-weight: 20;
    }

    .debug {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        text-align: center;
        z-index: 10;

        font-size: 1.5em;
        font-weight: 10;
    }
</style>