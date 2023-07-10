import { GhostsColor, GhostState } from '../../types/game';

class Ghost {
    protected color: GhostsColor;
    protected currentState: GhostState;

    constructor(color: GhostsColor, state: GhostState) {
        this.color = color;
        this.currentState = state;
    }

    debug() {
        console.log("ghost");
    }
}

export default Ghost;
