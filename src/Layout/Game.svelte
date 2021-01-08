<script>
    export let param;
    
    import Minimap from '../Components/Minimap.svelte'
    import Booth from '../Components/Booth.svelte'
</script>

<main>
    <Minimap class="minimap"/>
    <Booth class="booth"/>
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
</style>