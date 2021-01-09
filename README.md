## Inspiration

[Papers Please](https://store.steampowered.com/app/239030/Papers_Please/) and SafeEntry measures which seemed to change every other week over the past year.

## What it does

You play the role of a security guard in charge of the entrance to a mall. In order keep patrons safe from members of the public who may be ill and also to comply with current contact tracing regulations, you will need to decide if you can let someone into the mall or instead send them away. However, you'll always need to be on your toes as the rules keep changing! From masks becoming compulsory to temperature taking equipment changing, from changing modes of registration to people trying to sneak past without properly checking in. Make too many mistakes or take too long and the queue might grow so long that you get fired!

![Game window](https://cdn.discordapp.com/attachments/796226828452364308/797293622953246720/5.png)

## How We built it

Game mechanics and rendering were all done using Svelte & HTML5 canvas. Pixel art assets were curated using Piskel & GIMP.

## Challenges We ran into

Since you will see so many people in one game, getting enough art assets to make the characters feel less repetitive was tough. The inspiration game Paper's Please had a [interesting approach to procedural generation](https://forums.tigsource.com/index.php?topic=29750.msg820306#msg820306) that made every character unique, but obviously we didn't have enough time for that. Instead, we took advantage of new technologies like [This Person Does Not Exist](https://thispersondoesnotexist.com/) and [Pixel me](https://pixel-me.tokyo/en/) to generate base art that we would then manually split into facial components, which are later used for random generation of faces!

![Generated Characters](https://cdn.discordapp.com/attachments/796226828452364308/797293634428862504/4.png)

_SafeEntry: A unique Singapore story. As an ambassador, ALLOW or DENY entry. Take a trip down the memory lane from Phase I to Phase III and scan 11Bs, Pink ICs along the way._

_Can you balance checking SafeEntry, counterfeit TraceTogether tokens, ICs, masks and thermal temperature, under the pressure of long sNaKiNg queues?_

## Accomplishments that We're proud of

Getting our minimum-viable-prototype done at 5AM.

Everyone in our team learning some amount of pixel art skills, recreating iconic objects like the Chrome dinosaur and the Nokia 3310.

Coordinating a **pretty** big hackathon project in a short time - over 1800 LOC in 18 or so hours (we started late ;_;).

## What We learned

Game design, asset management and procedural generation is hard. 
-
## What's next for SafeEntry Please

Local multiplayer mode? Imagine a bishi-bashi style game where multiple people fight to see who is the better security guard!

Infinite mode with more wacky rules.
