import MersenneTwister from 'mersennetwister'
import Generator from './Generator.js'
import Rules from './Rules.js';

export default class GameEngine {
    static PROGRESS_NEEDED_PER_DAY = 5;
    static TICK_INTERVAL = 100;

    constructor(seed = 42) {
        this.rng = new MersenneTwister(seed);
        this.generator = new Generator(this.rng);
        
        // Begins paused
        this.paused = true;

        this.day = 0;
        this.progress = 0;
        this.difficulty = 0.025;

        this.tick = 0;
        this.score = 0;
        this.queueSize = 0;
        this.rules = Rules.getRulesForDay(this.day);

        this.person = null;
        this.traits = this.generator.generateTraits(this.day);
    }

    setupCallbacks(onEngineUpdate, onGameEnd) {
        this.onEngineUpdate = onEngineUpdate;
        this.onGameEnd = onGameEnd;
    }

    doTick() {     
        if (this.queueSize > 30) {
            this.onGameEnd();
            return;
        }

        setTimeout(() => this.doTick(), GameEngine.TICK_INTERVAL);
        if (this.paused) {
            return;
        }

        console.log('tick');

        if (this.queueSize === 0 || this.rng.rnd() < this.difficulty) {
            this.pushQueue();
        }

        this.tick++;
        this.onEngineUpdate(this);
    }

    decide(allowed) {
        if (allowed === this.traits.allowed) {
            this.giveScore();
        } else {
            this.givePenalty();
        }
        this.popQueue();
        this.paused = false;
        this.onEngineUpdate(this);
    }

    pushQueue() {
        this.queueSize++;
    }

    popQueue() {
        this.traits = this.generator.generateTraits(this.day);
        if (this.queueSize === 0) {
            this.pushQueue();
        }
        this.queueSize--;
    }

    giveScore() {
        this.score++;
        this.progress++;
        if (this.progress >= GameEngine.PROGRESS_NEEDED_PER_DAY && this.day < 11) {
            this.day++;
            this.progress = 0;
            this.rules = Rules.getRulesForDay(this.day);
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