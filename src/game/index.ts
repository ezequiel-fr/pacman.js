import { GhostsName, GhostState } from '../types/game';

import Blinky from './ghosts/blinky';
import Ghost from './ghosts/main';
import Maze from './maze';

class Game {
    protected ghosts: Record<GhostsName, Ghost> = {
        Blinky: new Blinky(),
        Pinky: new Ghost('pink', GhostState.Eaten),
        Inky: new Ghost('cyan', GhostState.Eaten),
        Clyde: new Ghost('orange', GhostState.Eaten),
    };
    protected maze: Maze;

    constructor() {
        // Define a new maze
        this.maze = new Maze();

        // Debug mode (will be only used while in production mode)
        this.debug();
    }

    start() {
        console.log("Start a new game");
    }

    debug() {
        this.ghosts.Blinky.debug();
    }
};

export default Game;
