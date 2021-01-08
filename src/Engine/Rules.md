Rule: Must happen at this level
Person: New variant to start spawning
Event: Possible change to environment

Types of deny
- Temperature deny
    - 0R: Force forehead scanner
    - 0P: normal temperature
    - 0P: high temperature 
    - 5R: Force high temperature
    - 6R: Force normal temperature
    - 7E: High external tempearture - all tempeartures (people & threshold increased)
    - 9R: Force IR camera
    - 13E: Change of IR camera Hues
    - 13E: Swap between scanner & IR camera ("broken")
- Mask deny
    - 0P: No mask
    - 1P: With mask
    - 2R: Require mask
    - 4P: Funny mask
- Hand deny
    - 0P: Empty hand
    - 3P: SafeEntry on phone
    - 3P: Holding IC
    - 3P: Wrong stuff on phone
    - 3R: SafeEntry required
    - 5P: TraceTogether on phone
    - 8P: Fake SafeEntry & Fake TraceTogether screens
    - 8P: Less holding IC
    - 8R: Block fake safeentry & TraceTogether
    - 10P: TraceTogether token
    - 11R: No more SafeEntry, no more ICs
    - 12P: Broken TraceTogether token / Fake traceTogether token