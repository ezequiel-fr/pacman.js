import { Direction, PlayerAnimations, TargetCoords } from '../types/game';
import { sleep } from '../utils/time';

import Game from './index';

class Player {
    private animations: { fn: Function, id: PlayerAnimations, time: number }[] = [];
    private game: Game;
    private position: TargetCoords;
    private intervals: { id: PlayerAnimations, ref: NodeJS.Timer | number }[] = [];

    public direction: Direction;

    constructor(game: Game) {
        this.game = game;

        this.direction = Direction.Left;
        this.position = [13.5, 26];

        // set animations

        this.moveTo();
    }

    private getPosition(target: TargetCoords) {
        return target.map(e => (e + .5) * this.game.maze.gridSize) as TargetCoords;
    }

    private drawNew(target: TargetCoords) {
        const { ctx } = this.game;
        const coords = this.getPosition(target);

        // image
        ctx.beginPath();
        ctx.arc(...coords, 14, Math.PI * -.8, Math.PI * .8);
        ctx.fillStyle = "#ff0";
        ctx.fill();
        ctx.closePath();
    }

    private clearAt(target: TargetCoords) {
        const { gridSize } = this.game.maze;

        this.game.ctx.clearRect(
            ...target.map(x => x - gridSize + 2) as TargetCoords,
            (this.game.maze.gridSize - 2) * 2,
            (this.game.maze.gridSize - 2) * 2,
        );
    }

    protected moveToCoords(target: TargetCoords) {
        const oldCoords = this.getPosition(this.position);

        this.clearAt(oldCoords);
        this.drawNew(target);

        this.position = target;
    }

    async moveTo(direction?: Direction) {
        const { position } = this;
        let newCoords: TargetCoords, midCoords: TargetCoords;

        switch (direction) {
            case Direction.Up:
                newCoords = [position[0], position[1] - 1] as TargetCoords;
                midCoords = [position[0], position[1] - .5] as TargetCoords;
                break;

            case Direction.Right:
                newCoords = [position[0] + 1, position[1]] as TargetCoords;
                midCoords = [position[0] + .5, position[1]] as TargetCoords;
                break;

            case Direction.Down:
                newCoords = [position[0], position[1] + 1] as TargetCoords;
                midCoords = [position[0], position[1] + .5] as TargetCoords;
                break;

            case Direction.Left:
                newCoords = [position[0] - 1, position[1]] as TargetCoords;
                midCoords = [position[0] - .5, position[1]] as TargetCoords;
                break;

            default:
                newCoords = midCoords = position;
                break;
        }

        this.moveToCoords(midCoords);
        await sleep(200);
        this.moveToCoords(newCoords);
        return await sleep(200);
    }

    playAnimations(id: PlayerAnimations) {
        let animations = id === "all"
            ? this.animations
            : this.animations.filter(e => e.id === id);

        animations = animations.filter(a => !Boolean(
            this.intervals.filter(b => b.id === a.id).length
        ));

        animations.forEach(e => this.intervals.push({
            id: e.id, ref: setInterval(e.fn, e.time),
        }));
    }

    pauseAnimations(id: PlayerAnimations) {
        if (id === "all") {
            this.intervals.forEach(e => clearInterval(e.ref));
            this.intervals = [];
        } else {
            const interval = this.intervals.filter(e => e.id === id);

            if (interval.length) interval.forEach(e => {
                clearInterval(e.ref);
                this.intervals.splice(this.intervals.indexOf(e), 1);
            });
            else console.warn("Event not found or already paused!");
        }
    }

    start() {
        this.moveToCoords([13, 26]);
        this.playAnimations('all');
    }

    play() {
        // 
    }

    pause() {
        // 
    }
}

export default Player;
