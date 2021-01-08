import MersenneTwister from 'mersennetwister'
import Generator from './Generator.js'
import Rules from './Generator.js'

export default class GameEngine {
    static PROGRESS_NEEDED_PER_DAY = 5;

    constructor(seed = 42) {
        this.rng = new MersenneTwister(seed);
        this.generator = new Generator(this.rng);
        
        // Begins paused
        this.paused = true;

        this.day = 0;
        this.progress = 0;
        this.difficulty = 0.025;

        this.tick = 0
        this.score = 0
        this.queueSize = 0

        this.person = null;
        this.traits = this.generator.generateTraits(this.day);
    }

    doTick() {
        if (this.paused) {
            return;
        }

        if (
            this.queueSize == 0 ||
            this.rng.rnd() < this.difficulty
        ) {
            this.pushQueue();
        }
        this.tick++;
    }

    decide(allowed) {
        console.log("Decided " + allowed);
        if (allowed === this.traits.allowed) {
            this.giveScore();
        } else {
            this.givePenalty();
        }
        this.popQueue();
        this.paused = false;
    }

    pushQueue() {
        this.queueSize++;
    }

    popQueue() {
        this.queueSize--;
        this.traits = this.generator.generateTraits(this.day);
        if (this.queueSize === 0) {
            this.pushQueue();
        }
    }

    giveScore() {
        this.score++;
        this.progress++;
        if (this.progress >= GameEngine.PROGRESS_NEEDED_PER_DAY && this.day < 11) {
            this.progress = 0;
            this.day++;
            this.paused = true; // Pause game until player decides
        }
        if (this.progress > GameEngine.PROGRESS_NEEDED_PER_DAY) {
            this.difficulty += 0.002;
        }
    }

    givePenalty() {
        this.pushQueue();
        this.pushQueue();
        this.pushQueue();
    }
}