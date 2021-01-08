import * as GameEnums from './Enums.js';

export default class Generator {
    constructor(rng) {
        this.rng = rng
    }

    // Array containing rates of each legal trait at each day
    static LEGALS_TABLE = [
        {
            temperature: [1.0, 0.0],
            mask: [0.0, 1.0, 0.0],
            hand: [1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0]
        }, {
            temperature: [1.0, 0.0],
            mask: [0.2, 0.8, 0.0],
            hand: [1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0]
        }, {
            temperature: [1.0, 0.0],
            mask: [1.0, 0.0, 0.0],
            hand: [0.0, 0.5, 0.5, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0]
        }, {
            temperature: [1.0, 0.0],
            mask: [1.0, 0.0, 0.0],
            hand: [0.0, 0.3, 0.7, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0]
        }, {
            temperature: [1.0, 0.0],
            mask: [1.0, 0.0, 0.0],
            hand: [0.0, 0.2, 0.8, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0]
        }, {
            temperature: [1.0, 0.0],
            mask: [1.0, 0.0, 0.0],
            hand: [0.0, 0.2, 0.5, 0.0, 0.3, 0.0, 0.0, 0.0, 0.0, 0.0]
        }, {
            temperature: [1.0, 0.0],
            mask: [1.0, 0.0, 0.0],
            hand: [0.0, 0.2, 0.4, 0.0, 0.4, 0.0, 0.0, 0.0, 0.0, 0.0]
        }, {
            temperature: [1.0, 0.0],
            mask: [1.0, 0.0, 0.0],
            hand: [0.0, 0.2, 0.4, 0.0, 0.4, 0.0, 0.0, 0.0, 0.0, 0.0]
        }, {
            temperature: [1.0, 0.0],
            mask: [1.0, 0.0, 0.0],
            hand: [0.0, 0.1, 0.2, 0.0, 0.25, 0.0, 0.0, 0.45, 0.0, 0.0]
        }, {
            temperature: [1.0, 0.0],
            mask: [1.0, 0.0, 0.0],
            hand: [0.0, 0.0, 0.0, 0.0, 0.45, 0.0, 0.0, 0.55, 0.0, 0.0]
        }, {
            temperature: [1.0, 0.0],
            mask: [1.0, 0.0, 0.0],
            hand: [0.0, 0.0, 0.0, 0.0, 0.5, 0.0, 0.0, 0.5, 0.0, 0.0]
        }, {
            temperature: [1.0, 0.0],
            mask: [1.0, 0.0, 0.0],
            hand: [0.0, 0.0, 0.0, 0.0, 0.5, 0.0, 0.0, 0.5, 0.0, 0.0]
        },
    ]

    // Array containing rates of each illegal trait at each day
    static ILLEGALS_TABLE = [
        {
            temperature: [0.0, 1.0],
            mask: null,
            hand: null
        }, {
            temperature: [0.0, 1.0],
            mask: null,
            hand: null
        }, {
            temperature: [0.0, 1.0],
            mask: [0.0, 1.0, 0.0],
            hand: [0.5, 0.0, 0.0, 0.0, 0.0, 0.0, 0.5, 0.0, 0.0, 0.0]
        }, {
            temperature: [0.0, 1.0],
            mask: [0.0, 1.0, 0.0],
            hand: [0.2, 0.0, 0.0, 0.0, 0.0, 0.0, 0.8, 0.0, 0.0, 0.0]
        }, {
            temperature: [0.0, 1.0],
            mask: [0.0, 0.7, 0.3],
            hand: [0.2, 0.0, 0.0, 0.0, 0.0, 0.0, 0.8, 0.0, 0.0, 0.0]
        }, {
            temperature: [0.0, 1.0],
            mask: [0.0, 0.97, 0.03],
            hand: [0.2, 0.0, 0.0, 0.0, 0.0, 0.0, 0.8, 0.0, 0.0, 0.0]
        }, {
            temperature: [0.0, 1.0],
            mask: [0.0, 0.97, 0.03],
            hand: [0.1, 0.0, 0.0, 0.25, 0.0, 0.25, 0.4, 0.0, 0.0, 0.0]
        }, {
            temperature: [0.0, 1.0],
            mask: [0.0, 0.97, 0.03],
            hand: [0.1, 0.0, 0.0, 0.35, 0.0, 0.35, 0.2, 0.0, 0.0, 0.0]
        }, {
            temperature: [0.0, 1.0],
            mask: [0.0, 0.97, 0.03],
            hand: [0.1, 0.0, 0.0, 0.35, 0.0, 0.35, 0.2, 0.0, 0.0, 0.0]
        }, {
            temperature: [0.0, 1.0],
            mask: [0.0, 0.97, 0.03],
            hand: [0.05, 0.25, 0.25, 0.15, 0.0, 0.2, 0.1, 0.0, 0.0, 0.0]
        }, {
            temperature: [0.0, 1.0],
            mask: [0.0, 0.97, 0.03],
            hand: [0.05, 0.05, 0.05, 0.05, 0.0, 0.2, 0.1, 0.0, 0.3, 0.2]
        }, {
            temperature: [0.0, 1.0],
            mask: [0.0, 0.97, 0.03],
            hand: [0.05, 0.05, 0.05, 0.05, 0.0, 0.3, 0.1, 0.0, 0.25, 0.15]
        }
    ];

    // Chance to generate an illegal person.
    static ILLEGAL_CHANCE = 0.4;

    // Array containing chance of each illegal type
    static ILLEGAL_TYPE_CHANCES = [
        [1.0, 0.0, 0.0],
        [1.0, 0.0, 0.0],
        [0.3, 0.7, 0.0],
        [0.3, 0.1, 0.6],
        [0.3, 0.4, 0.3],
        [0.6, 0.1, 0.3],
        [0.3, 0.1, 0.6],
        [0.6, 0.1, 0.3],
        [0.45, 0.1, 0.45],
        [0.35, 0.05, 0.6],
        [0.3, 0.05, 0.65],
        [0.5, 0.05, 0.45]
    ];

    // Returns a JSON object containing fields 'allowed', 'temperature', 'mask' and 'hand'.
    generateTraits(day) {
        // Generate legal or illegal
        let illegal = (this.rng.rnd() < Generator.ILLEGAL_CHANCE);

        let illegalName = null;
        if (illegal) {
            illegalName = Object.keys(GameEnums.Traits)[this.generateOutcome(Generator.ILLEGAL_TYPE_CHANCES[day])];
        }

        let traits = { allowed: !illegal, seed: this.rng.int() };
        Object.keys(GameEnums.Traits).forEach(fieldName => {
            if (fieldName == illegalName) {
                let index = this.generateOutcome(Generator.ILLEGALS_TABLE[day][fieldName]);
                traits[fieldName] = Object.values(GameEnums.Traits[fieldName])[index];
            } else {
                let index = this.generateOutcome(Generator.LEGALS_TABLE[day][fieldName]);
                traits[fieldName] = Object.values(GameEnums.Traits[fieldName])[index];
            }
        });

        return traits;
    }

    // Generate a random number based on a weighted distribution.
    generateOutcome(rates) {
        let randValue = this.rng.rnd();
        for (var i = 0; i < rates.length; i++) {
            randValue -= rates[i];
            if (randValue <= 0) {
                return i;
            }
        }

        return rates.length - 1; // rates don't sum up to (at least) 1, return the last index
    }
}