import { GhostsName } from '../types/game';
import { sleep } from '../utils/time';

import Blinky from './ghosts/blinky';
import Ghost from './ghosts/main';
import Maze from './maze';

class Game {
    public ghosts: Record<GhostsName, Ghost>;
    public maze: Maze;
    public ctx: CanvasRenderingContext2D;

    constructor() {
        // Define the canvas element
        const canvas = document.getElementById('game') as HTMLCanvasElement;
        this.ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

        // Define a new maze
        this.maze = new Maze(this);

        // define ghosts
        this.ghosts = {
            Blinky: new Blinky(this),
            Pinky: new Ghost('pink', this),
            Inky: new Ghost('cyan', this),
            Clyde: new Ghost('orange', this),
        };

        // Debug mode (will be used only in production mode)
        this.debug();
    }

    async start() {
        console.log("Start the game");
        await sleep(2e3);

        this.maze.initDots();
        this.maze.playAnimations('all');
        Object.values(this.ghosts).forEach(e => e.start());
    }

    pause() {
        console.log("Pause the game");
        this.maze.pauseAnimations('all');
    }

    debug() {
        this.ghosts.Blinky.debug();
    }
};

export default Game;
