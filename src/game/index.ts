import EventEmitter from 'events';

import { GameEvents, GameEventsName, GhostsName } from '../types/game';
import { sleep } from '../utils/time';

import Blinky from './ghosts/blinky';
import Ghost from './ghosts/main';
import Maze from './maze';
import Player from './player';

class Game extends EventEmitter {
    // constants
    public readonly PAUSE = 0;
    public readonly PLAYING = 1;
    public readonly DEBUGGING = 2;

    public ctx: CanvasRenderingContext2D;

    public player: Player;
    public ghosts: Record<GhostsName, Ghost>;
    public maze: Maze;
    public STATE = this.PLAYING;

    public score: number = 0;

    constructor() {
        super();

        // Define the canvas element
        const canvas = document.getElementById('app') as HTMLCanvasElement;
        this.ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

        // Define a new maze
        this.maze = new Maze(this);

        // create ghosts
        this.ghosts = {
            Blinky: new Blinky(this),
            Pinky: new Ghost('pink', this),
            Inky: new Ghost('cyan', this),
            Clyde: new Ghost('orange', this),
        };

        // create a new player instance
        this.player = new Player(this);

        // Debug mode (will be used only in production mode)
        this.debug();

        // start and stop animations on window focused or not
        document.addEventListener('visibilitychange', () => {
            document.hidden && this.pause();
        });
    }

    // Extends event listeners with game's own properties
    addListener<T extends GameEventsName>(event: T, listener: GameEvents<T>) {
        return super.addListener(event, listener);
    }
    emit<T extends GameEventsName>(event: T, ...args: any[]) {
        return super.emit(event, args);
    }
    listenerCount<T extends GameEventsName>(event: T, listener: GameEvents<T>) {
        return super.listenerCount(event, listener);
    }
    listeners<T extends GameEventsName>(event: T) {
        return super.listeners(event);
    }
    off<T extends GameEventsName>(event: T, listener: GameEvents<T>) {
        return super.off(event, listener);
    }
    on<T extends GameEventsName>(event: T, listener: GameEvents<T>) {
        return super.on(event, listener);
    }
    once<T extends GameEventsName>(event: T, listener: GameEvents<T>) {
        return super.once(event, listener);
    }
    prependListener<T extends GameEventsName>(event: T, listener: GameEvents<T>) {
        return super.prependListener(event, listener);
    }
    prependOnceListener<T extends GameEventsName>(event: T, listener: GameEvents<T>) {
        return super.prependOnceListener(event, listener);
    }
    rawListeners<T extends GameEventsName>(event: T) {
        return super.rawListeners(event);
    }
    removeAllListeners<T extends GameEventsName>(event: T) {
        return super.removeAllListeners(event);
    }
    removeListener<T extends GameEventsName>(event: T, listener: GameEvents<T>) {
        return super.removeListener(event, listener);
    }

    // Game functions
    async start() {
        console.log("Start the game");
        await sleep(2e3);

        // maze
        this.maze.initDots();

        // start the game
        this.resume();
    }

    resume() {
        // toggle state
        this.emit('play');
        this.STATE = this.PLAYING;

        // activate animations
        this.maze.playAnimations('all');

        // move sprites
        this.player.start();
        Object.values(this.ghosts).forEach(e => e.start());
    }

    pause() {
        // toggle state
        super.emit('pause');
        this.STATE = this.PAUSE;

        this.player.pause();
        this.maze.pauseAnimations('all');
    }

    debug() {
        // define window properties
        Object.defineProperty(window, 'game', { value: this });

        this.ghosts.Blinky.debug();
    }
};

export default Game;
