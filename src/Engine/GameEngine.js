import MersenneTwister from 'mersennetwister'
import Rules from './Rules.js'

export default class GameEngine {
    constructor(seed = 42) {
        this.rng = new MersenneTwister(seed)

        this.progress = 0
        this.difficulty = 0.025

        this.tick = 0
        this.score = 0
        this.queueSize = 0

        this.person = null;
    }

    doTick() {
        if (
            this.queueSize == 0 ||
            this.rng.rnd() < this.difficulty
        ) {
            this.pushQueue();
        }
        this.tick++;
    }

    decide(allowed) {
        if (allowed === this.person.allowed) {
            this.giveScore();
        } else {
            this.givePenalty();
        }
        this.popQueue();
    }

    pushQueue() {
        this.queueSize++;
    }

    popQueue() {
        this.queueSize--;
        this.person = generatePerson(this.rng.int());
        if (this.queueSize === 0) {
            this.pushQueue();
        }
    }

    giveScore() {
        this.score++;
        if (this.progress < 1.0) {
            this.progres += 0.01
        } else {
            this.difficulty += 0.002
        }
    }

    givePenalty() {
        this.pushQueue();
        this.pushQueue();
        this.pushQueue();
    }

    generatePerson() {
        return {
            allowed: true
        };
        /*
        return {
            allowed: false,
            reason: 'Faulty TraceTogether token'
        }
        */
    }
}