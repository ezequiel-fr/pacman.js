import { Direction, GhostState } from '../../types/game';
import { sleep } from '../../utils/time';

import Game from '../index';
import Ghost from './main';

class Blinky extends Ghost {
    constructor(game: Game) {
        super('red', game);

        this.target = [13.5, 14];
        this.speed = 1;

        this.setState(GhostState.Chase);
    }

    async firstMove() {
        await sleep(200 / this.speed);
        this.moveToCoords(13, 14);
    }
}

export default Blinky;
