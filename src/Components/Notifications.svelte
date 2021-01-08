<script>
    const MESSAGES = [
        [
            "Welcome to the job, part-timer.",
            "We've hired you to ensure that no one who enters the mall has caught the Virus.",
            "Check each person's temperature, if it's above 37.5 degrees they're not allowed in.",
            "Press A to allow entry and D to deny entry."
        ], [
            "WHO announcement: Wear those masks and stop the plague!"
        ], [
            "The government has imposed some new requirements.",
            "People without masks should not be allowed entry into malls.",
            "Of course, take temperatures as per usual."
        ], [
            "NEWS: SafeEntry is now compulsory for all public premises.",
            "People without a SafeEntry pass should present their ICs."
        ], [
            "Seems like there's some panic buying going around.",
            "Some people have gotten rather \"creative\" with their masks. Of course, they're not allowed in."
        ], [
            "Today is abnormally hot, so body temperatures are higher than normal.",
            "Anyone above 37.9 degrees should be denied entry, everyone else is allowed in.",
            "By the way, the government's released a new TraceTogether app. We accept that too."
        ], [
            "The weather has gone back to normal. Reject anyone at 37.5 degrees or higher.",
            "There's been reports of fake SafeEntry and TraceTogether screens being used.",
            "We don't want any of those people getting into our mall. Be extra-sharp."
        ], [
            "Good news, part-timer! We've got an infra-red camera now.",
            "The temperatures show up as pretty little colours.",
            "Anyone who appears more red than the colour of the indicator should be denied entry."
        ], [
            "The government's distributing a new TraceTogether token. It's a rectangularish object with a QR code.",
            "Patrons holding a token should be accepted. ICs, SafeEntry and TraceTogether are fine as well."
        ], [
            "SafeEntry and ICs are no longer valid for entry."
        ], [
            "Those TraceTogether tokens are more fragile than initially believed.",
            "Some are showing up with broken or fake ones, so be careful."
        ], [
            "We've replaced our IR camera with a new one.",
            "This one displays higher temperatures with a yellow hue."
        ]
    ];

    export let gameDay;
    export let gameRunning;

    let notificationMessage;
    let notificationActive = false;

    let delay = millis => new Promise((resolve, reject) => {
        setTimeout(_ => resolve(), millis)
    });

    let displayMessageForDay = async (day) => {
        for (var i = 0; i < MESSAGES[day].length; i++) {
            notificationMessage = MESSAGES[day][i];
            notificationActive = true;
            await delay(3000);
            notificationActive = false;
            await delay(500);
        };
    };

    $: {
        console.log(gameRunning + " " + gameDay);
        if (gameRunning) {
            displayMessageForDay(gameDay);
        }
    }
</script>

<main>
    <div class="notification" class:active={notificationActive}>
        <p class="notificationMessage">{notificationMessage}</p>
    </div>
</main>

<style>
    .notification {
        position: absolute;
        left: 12px;
        bottom: 12px;
        width: calc(50% - 0.5em);
        
        border-radius: 1em 1em 1em 1em;
        border: solid orange;
        border-width: 0.25em;
        background-color: white;

        opacity: 0.0;
        font-size: 1.4em;
        font-weight: 4;
        transition: opacity 0.3s;
    }

    .notificationMessage {
        display: inline-block;
    }
    
    .active {
        opacity: 1.0
    }
</style>