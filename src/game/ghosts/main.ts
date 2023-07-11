import { Direction, GhostsColor, GhostState, TargetCoords } from '../../types/game';

import Game from '../index';

import { sleep } from '../../utils/time';

class Ghost {
    protected color: string;
    protected currentState = GhostState.Chase;
    protected game: Game;
    protected target: TargetCoords = [0, 0];
    protected speed = 1;

    constructor(
        color: GhostsColor,
        game: Game,
    ) {
        this.color = color === "cyan" ? "#0ff"
            : color === "orange" ? "#f80"
            : color === "pink" ? "#f0f" : "#f00";
        this.game = game;
    }

    private getPosition(target: TargetCoords) {
        return target.map(e => (e + .5) * this.game.maze.gridSize) as TargetCoords;
    }

    private drawNew(target: TargetCoords) {
        const { ctx } = this.game;
        const coords = this.getPosition(target).map(e => e - 14) as TargetCoords;
        // console.log(coords, target);

        // image
        const image = new Image();
        image.src = "blinky1.png";

        image.onload = () => {
            ctx.drawImage(image, ...coords, 28, 28);
        };
        // ctx.beginPath();
        // ctx.rect(...coords, 30, 30);
        // ctx.arc(...coords, this.game.maze.gridSize / 2, 0, Math.PI * 2);
        // ctx.fillStyle = this.color;
        // ctx.fill();
        // ctx.closePath();
    }

    private clearAt(target: TargetCoords) {
        const { gridSize } = this.game.maze;

        this.game.ctx.clearRect(
            ...target.map(x => x - gridSize + 2) as TargetCoords,
            (this.game.maze.gridSize - 2) * 2,
            (this.game.maze.gridSize - 2) * 2,
        );
    }

    protected moveToCoords(...target: TargetCoords) {
        const oldCoords = this.getPosition(this.target);

        this.clearAt(oldCoords);
        this.drawNew(target);

        this.target = target;
    }

    async moveTo(direction: Direction) {
        let newCoords: TargetCoords, midCoords: TargetCoords;

        switch (direction) {
            case Direction.Up:
                newCoords = [this.target[0], this.target[1] - 1] as TargetCoords;
                midCoords = [this.target[0], this.target[1] - .5] as TargetCoords;
                break;

            case Direction.Right:
                newCoords = [this.target[0] + 1, this.target[1]] as TargetCoords;
                midCoords = [this.target[0] + .5, this.target[1]] as TargetCoords;
                break;

            case Direction.Down:
                newCoords = [this.target[0], this.target[1] + 1] as TargetCoords;
                midCoords = [this.target[0], this.target[1] + .5] as TargetCoords;
                break;

            case Direction.Left:
                newCoords = [this.target[0] - 1, this.target[1]] as TargetCoords;
                midCoords = [this.target[0] - .5, this.target[1]] as TargetCoords;
                break;
        }

        this.moveToCoords(...midCoords);
        await sleep(200 / this.speed);
        this.moveToCoords(...newCoords);
        return await sleep(200 / this.speed);
    }

    setState(state: GhostState) {
        this.currentState = state;
    }

    update() {
        // 
    }

    async start() {
        await this.firstMove();
    }

    async firstMove() {}

    debug() {
        this.drawNew(this.target);
    }
}

export default Ghost;
