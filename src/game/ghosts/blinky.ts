import { GhostState } from '../../types/game';
import Ghost from './main';

class Blinky extends Ghost {
    constructor() {
        super('red', GhostState.Chase);
    }
}

export default Blinky;
