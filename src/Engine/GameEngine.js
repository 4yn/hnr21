import MersenneTwister from 'mersennetwister'
import Generator from './Generator.js'
import Rules from './Rules.js';

export default class GameEngine {
    static PROGRESS_NEEDED_PER_DAY = 10;
    static SPEED_PROGRESS_NEEDED_PER_DAY = 5;
    static TICK_INTERVAL = 100;

    constructor(soundNotification, seed = 42) {
        this.rng = new MersenneTwister(seed);
        this.generator = new Generator(this.rng);
        
        // Begins paused
        this.paused = true;

        this.day = 0;
        this.progress = 0;
        this.difficulty = 0.025;
        this.progressPerDay = GameEngine.PROGRESS_NEEDED_PER_DAY;

        this.tick = 0;
        this.score = 0;
        this.queueSize = 0;
        this.rules = Rules.getRulesForDay(this.day);

        this.lastBadTraits = null;
        this.traits = this.generator.generateTraits(this.day);

        this.soundNotification = soundNotification;
        this.soundWrong = new Audio('sounds/wrong.ogg');
        this.soundGameOver = new Audio('sounds/gameover.ogg');
    }

    setSpeedMode(active) {
        console.log((active ? "Enabling" : "Disabling") + " speed mode.");
        this.progressPerDay = active ? GameEngine.SPEED_PROGRESS_NEEDED_PER_DAY : GameEngine.PROGRESS_NEEDED_PER_DAY;
    }

    setupCallbacks(onEngineUpdate, onGameEnd, onWarning, onFinish) {
        this.onEngineUpdate = onEngineUpdate;
        this.onGameEnd = onGameEnd;
        this.onWarning = onWarning;
        this.onFinish = onFinish;
    }

    doTick() {     
        if (this.queueSize > 30) {
            this.onGameEnd();
            this.soundGameOver.play();
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
            this.onWarning(this.traits.illegalType);
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
        if (this.progress >= this.progressPerDay && this.day < 10) {
            this.day++;
            this.progress = 0;
            this.rules = Rules.getRulesForDay(this.day);
            this.paused = true; // Pause game until player decides
            this.soundNotification.play();

            if (this.day === 10) {
                this.onFinish();
            }
        }
        if (this.progress > this.progressPerDay) {
            this.difficulty += 0.002;
        }
    }

    givePenalty() {
        this.soundWrong.play();
        this.pushQueue();
        this.pushQueue();
        this.pushQueue();
    }
}