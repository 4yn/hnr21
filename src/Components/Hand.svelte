<script>
    import { HandTypes } from '../Engine/Enums.js';
    
    import Hand1 from '../../res/hand/hand_1.png'
    import Hand2 from '../../res/hand/hand_2.png'
    import Hand3 from '../../res/hand/hand_3.png'

    import Phone from './Phone.svelte'
    import Token from './Token.svelte'

    export let holding = HandTypes.HAND_NONE;
    export let seed = 0;

    let handSrc;

    $: {
        handSrc = [Hand1, Hand2, Hand3][seed * seed * seed * seed % 3]
    }
</script>

<main>
    <!-- Hand component -->
    {#if holding !== HandTypes.HAND_NONE}
        <img src={Hand3} alt="hand">
        {#if holding === HandTypes.TOKEN_OK || holding === HandTypes.TOKEN_BAD || holding === HandTypes.TOKEN_FAKE}
            <Token seed={seed} ttType={holding}/>
        {:else}
            <Phone seed={seed} phoneType={holding}/>
        {/if}
    {/if}
</main>

<style>
    main {
        position: absolute;
        left: -20px;
        top: 140px;
    }
    main img {
        width: 100px;
        height: 100px;
    }
</style>