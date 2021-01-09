<script>
    const WARNINGS = {
        'TEMP_HIGH': 'High body temperature',
        'MASK_NONE': 'Not wearing a mask',
        'MASK_FUNNY': 'Was that a mask?',
        'HAND_NONE': 'No pass shown',
        'HAND_IC': 'IC not acceptable',
        'SCREEN_SAFE_ENTRY': 'SafeEntry not acceptable',
        'SCREEN_SAFE_ENTRY_FAKE': 'Fake SafeEntry',
        'SCREEN_TRACE_TOGETHER_FAKE': 'Fake SafeEntry',
        'SCREEN_OTHER': 'Were you paying attention?',
        'TOKEN_FAKE': 'Not a token',
        'TOKEN_BAD': 'Damaged token'
    };

    export let lastIllegalType;
    export let numWarnings;
    let lastNumWarnings = 0;

    $: {
        if (numWarnings !== lastNumWarnings) {
            console.log(lastIllegalType ? lastIllegalType : "VALID_DENIED");
            let newWarning = document.createElement("p");
            newWarning.innerHTML = '<b>Warning</b><br>' + (lastIllegalType ? WARNINGS[lastIllegalType] : 'Incorrectly denied person');
            newWarning.classList.add("warning");

            document.getElementById("warningContainer").appendChild(newWarning);
            setTimeout(() =>  document.getElementById("warningContainer").removeChild(newWarning), 3000);
        }
    }
</script>

<main id="warningContainer"/>

<style>
    :global(#warningContainer) {
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        overflow: hidden;
    }

    :global(#warningContainer > p) {
        position: absolute;
        width: 30%;
        height: 3em;
        max-height: 3em;
        bottom: -3.5em;
        right: 0;

        margin: 0;
        border: solid red;
        border-width: 0.25em;

        background-color: white;
        color: red;
        font-size: 1.2em;
        line-height: 1.2em;

        animation-name: popUpAndDown;
        animation-duration: 3s;
    }

    @keyframes popUpAndDown {
        0%      { bottom: -3.5em }
        25%     { bottom: 0em }
        75%     { bottom: 0em }
        100%    { bottom: -3.5em }
    }
</style>