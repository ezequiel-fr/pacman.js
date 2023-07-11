import { GhostsName } from '../types/game';
import { sleep } from '../utils/time';

import Blinky from './ghosts/blinky';
import Ghost from './ghosts/main';
import Maze from './maze';
import Player from './player';

class Game {
    // constants
    public readonly PAUSE = 0;
    public readonly PLAYING = 1;
    public readonly DEBUGGING = 2;

    public ctx: CanvasRenderingContext2D;

    public player: Player;
    public ghosts: Record<GhostsName, Ghost>;
    public maze: Maze;
    public STATE = this.PLAYING;

    private score: number = 0;

    constructor() {
        // Define the canvas element
        const canvas = document.getElementById('game') as HTMLCanvasElement;
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
        console.log("Resume the game");
        this.STATE = this.PLAYING;

        // activate animations
        this.maze.playAnimations('all');

        // move sprites
        this.player.start();
        Object.values(this.ghosts).forEach(e => e.start());
    }

    pause() {
        console.log("Pause the game");

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
