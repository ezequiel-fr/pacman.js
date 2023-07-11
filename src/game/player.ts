import { Direction, PlayerAnimations, TargetCoords } from '../types/game';
import { sleep } from '../utils/time';

import Game from './index';

type Listener<K extends keyof DocumentEventMap> = {
    key: K,
    listener: (this: Document, ev: DocumentEventMap[K]) => any,
    options?: boolean | AddEventListenerOptions
};

class Player {
    private animations: { fn: Function, id: PlayerAnimations, time: number }[] = [];
    private game: Game;
    private intervals: { id: PlayerAnimations, ref: NodeJS.Timer | number }[] = [];
    private listeners: Listener<any>[] = [];

    private position: TargetCoords;
    private speed = 23 / 11;
    private sprite: HTMLSpanElement;

    public direction: Direction;

    constructor(game: Game) {
        this.game = game;

        // set default vars
        this.direction = Direction.Left;
        this.position = [13.5, 26];

        // init sprite
        this.sprite = document.createElement('span');
        this.sprite.classList.add('player');
        this.game.ctx.canvas.parentElement?.appendChild(this.sprite);

        this.animations.push({
            id: 'turning',
            fn: () => this.sprite.style.setProperty('--direction', this.direction.toString()),
            time: 50,
        });

        // go to his first position
        this.moveTo();

        this.listeners.push({ key: 'keydown', listener: e => {
            const newDirection = (e.keyCode + 2) % 4;
            // console.log(newDirection, this.direction, this.canTurnAt(newDirection));

            if (newDirection !== this.direction && this.canTurnAt(newDirection)) {
                this.direction = newDirection;
            }
        }});
        // document.addEventListener('keydown', e => {
        //     const newDirection = (e.keyCode + 2) % 4;
        //     console.log(newDirection, this.direction, this.canTurnAt(newDirection));

        //     if (newDirection !== this.direction && this.canTurnAt(newDirection)) {
        //         this.direction = newDirection;
        //     }
        // });
    }

    moving() {
        this.sprite.style.transitionDuration = '.2s';
    }

    stopMoving() {
        setTimeout(() => this.sprite.style.transitionDuration = '0', 100);
    }

    private getPosition(target: TargetCoords) {
        return target.map(e => (e + .5) * this.game.maze.gridSize) as TargetCoords;
    }

    private clearAt(target: TargetCoords) {
        const { gridSize } = this.game.maze;

        this.game.ctx.clearRect(
            // ...target.map(x => x - gridSize + 2) as TargetCoords,
            target[0] - gridSize / 2,
            target[1] - gridSize + 2,
            (this.game.maze.gridSize - 2) * 2,
            (this.game.maze.gridSize - 2) * 2,
        );
    }

    protected moveToCoords(target: TargetCoords) {
        const oldCoords = this.getPosition(this.position);
        const newCoords = target.map(e => e * this.game.maze.gridSize) as TargetCoords;

        this.clearAt(oldCoords);
        // this.sprite.style.left = newCoords[0] - 8 + "px";
        // this.sprite.style.top = newCoords[1] - 8 + "px";
        this.moving();
        this.sprite.style.translate = `${newCoords[0] - 6}px ${newCoords[1] - 6}px`;
        sleep(200).then(() => this.stopMoving());

        this.position = target;
    }

    protected canTurnAt(direction?: Direction) {
        const { DOT, PORTAL, SUPER_DOT, VOID, map } = this.game.maze;
        const newCoords = this.newCoords(direction);

        const cell = map[newCoords[1]][newCoords[0]];
        const crossable = [DOT, PORTAL, SUPER_DOT, VOID];

        return crossable.includes(cell);
    }

    newCoords(direction?: Direction): TargetCoords {
        const { position } = this;
        if (typeof direction !== 'number') direction = this.direction;

        let newCoords: TargetCoords;

        switch (direction) {
            case Direction.Up:
                newCoords = [position[0], position[1] - 1] as TargetCoords;
                break;

            case Direction.Right:
                newCoords = [position[0] + 1, position[1]] as TargetCoords;
                break;

            case Direction.Down:
                newCoords = [position[0], position[1] + 1] as TargetCoords;
                break;

            case Direction.Left:
                newCoords = [position[0] - 1, position[1]] as TargetCoords;
                break;

            default:
                newCoords = position;
                break;
        }

        return newCoords;
    }

    async moveTo(direction?: Direction) {
        let newCoords = this.newCoords(direction);

        this.moveToCoords(newCoords);
        await sleep(400 / this.speed);
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
        this.play();
    }

    private async nextMove() {
        const newCoords = this.newCoords();

        if (this.canTurnAt()) {
            // Move the player
            await this.moveTo(this.direction);

            // Then update the score
            this.game.score += 20;
            this.game.maze.map[newCoords[1]][newCoords[0]] = 0;
        } else {
            // console.log("Cannot change");
        }

        this.stopMoving();
    }

    async play() {
        // Add listeners
        this.listeners.forEach(e => document.addEventListener(e.key, e.listener, e.options));

        for (let i = 0; i < 500 && this.game.STATE !== this.game.PAUSE; i++) {
            this.nextMove();
            await sleep(400 / this.speed);
        }

        // while (this.game.STATE === this.game.PLAYING) {
        //     await sleep(4e5 / this.speed);
        //     await this.nextMove();
        // }
    }

    pause() {
        // Remove listeners
        this.listeners.forEach(e => document.removeEventListener(e.key, e.listener, e.options));
    }
}

export default Player;
