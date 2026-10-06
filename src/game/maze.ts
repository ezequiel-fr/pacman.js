import { Matrix2D, MazeAnimations } from '../types/game';

import Game from './index';

class Maze {
    public readonly VOID = 0;
    public readonly BORDER = 1;
    public readonly DOT = 2;
    public readonly SUPER_DOT = 3;
    public readonly GHOSTS_HOUSE = 4;
    public readonly PORTAL = 5;

    public gridSize = 16;
    public map: Matrix2D = [
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,2,2,2,2,2,2,2,2,2,2,2,2,1,1,2,2,2,2,2,2,2,2,2,2,2,2,1],
        [1,2,1,1,1,1,2,1,1,1,1,1,2,1,1,2,1,1,1,1,1,2,1,1,1,1,2,1],
        [1,3,1,0,0,1,2,1,0,0,0,1,2,1,1,2,1,0,0,0,1,2,1,0,0,1,3,1],
        [1,2,1,1,1,1,2,1,1,1,1,1,2,1,1,2,1,1,1,1,1,2,1,1,1,1,2,1],
        [1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1],
        [1,2,1,1,1,1,2,1,1,2,1,1,1,1,1,1,1,1,2,1,1,2,1,1,1,1,2,1],
        [1,2,1,1,1,1,2,1,1,2,1,1,1,1,1,1,1,1,2,1,1,2,1,1,1,1,2,1],
        [1,2,2,2,2,2,2,1,1,2,2,2,2,1,1,2,2,2,2,1,1,2,2,2,2,2,2,1],
        [1,1,1,1,1,1,2,1,1,1,1,1,0,1,1,0,1,1,1,1,1,2,1,1,1,1,1,1],
        [0,0,0,0,0,1,2,1,1,1,1,1,0,1,1,0,1,1,1,1,1,2,1,0,0,0,0,0],
        [0,0,0,0,0,1,2,1,1,0,0,0,0,0,0,0,0,0,0,1,1,2,1,0,0,0,0,0],
        [0,0,0,0,0,1,2,1,1,0,1,1,1,4,4,1,1,1,0,1,1,2,1,0,0,0,0,0],
        [1,1,1,1,1,1,2,1,1,0,1,0,0,0,0,0,0,1,0,1,1,2,1,1,1,1,1,1],
        [5,0,0,0,0,0,2,0,0,0,1,0,0,0,0,0,0,1,0,0,0,2,0,0,0,0,0,5],
        [1,1,1,1,1,1,2,1,1,0,1,0,0,0,0,0,0,1,0,1,1,2,1,1,1,1,1,1],
        [0,0,0,0,0,1,2,1,1,0,1,1,1,1,1,1,1,1,0,1,1,2,1,0,0,0,0,0],
        [0,0,0,0,0,1,2,1,1,0,0,0,0,0,0,0,0,0,0,1,1,2,1,0,0,0,0,0],
        [0,0,0,0,0,1,2,1,1,0,1,1,1,1,1,1,1,1,0,1,1,2,1,0,0,0,0,0],
        [1,1,1,1,1,1,2,1,1,0,1,1,1,1,1,1,1,1,0,1,1,2,1,1,1,1,1,1],
        [1,2,2,2,2,2,2,2,2,2,2,2,2,1,1,2,2,2,2,2,2,2,2,2,2,2,2,1],
        [1,2,1,1,1,1,2,1,1,1,1,1,2,1,1,2,1,1,1,1,1,2,1,1,1,1,2,1],
        [1,2,1,1,1,1,2,1,1,1,1,1,2,1,1,2,1,1,1,1,1,2,1,1,1,1,2,1],
        [1,3,2,2,1,1,2,2,2,2,2,2,2,0,0,2,2,2,2,2,2,2,1,1,2,2,3,1],
        [1,1,1,2,1,1,2,1,1,2,1,1,1,1,1,1,1,1,2,1,1,2,1,1,2,1,1,1],
        [1,1,1,2,1,1,2,1,1,2,1,1,1,1,1,1,1,1,2,1,1,2,1,1,2,1,1,1],
        [1,2,2,2,2,2,2,1,1,2,2,2,2,1,1,2,2,2,2,1,1,2,2,2,2,2,2,1],
        [1,2,1,1,1,1,1,1,1,1,1,1,2,1,1,2,1,1,1,1,1,1,1,1,1,1,2,1],
        [1,2,1,1,1,1,1,1,1,1,1,1,2,1,1,2,1,1,1,1,1,1,1,1,1,1,2,1],
        [1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    ];

    private animations: { fn: Function, id: MazeAnimations, time: number }[] = [];
    private ctx: CanvasRenderingContext2D;
    private intervals: {
        id: MazeAnimations;
        ref: NodeJS.Timer | number;
    }[] = [];

    constructor(game: Game) {
        this.ctx = game.ctx;
        this.init();
    }

    init() {
        const { gridSize } = this;
        const rowsCount = this.map.length;
        const colsCount = this.map[0].length;

        this.ctx.canvas.height = rowsCount * gridSize;
        this.ctx.canvas.width = colsCount * gridSize;
    }

    initDebug() {
        const { gridSize } = this;
        const rowsCount = this.map.length;
        const colsCount = this.map[0].length;

        this.ctx.canvas.height = rowsCount * gridSize;
        this.ctx.canvas.width = colsCount * gridSize;

        for (let row = 0; row < rowsCount; row++) {
            for (let col = 0; col < colsCount; col++) {
                const x = col * gridSize;
                const y = row * gridSize;
                const cell = this.map[row][col];

                this.ctx.fillStyle = (
                    cell === 1 ? "#f008"
                        : cell === 2 ? "#0f05"
                        : cell === 3 ? "#f0f5"
                        : cell === 4 ? "#ff05"
                        : cell === 5 ? "#0ffa"
                        : "#0000"
                );
                this.ctx.fillRect(x, y, gridSize, gridSize);
            }
        }
    }

    initDots() {
        const rowsCount = this.map.length;
        const colsCount = this.map[0].length;
        const { ctx, gridSize } = this;

        const dotImage = new Image();
        dotImage.src = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9z"
            + "dmciIGhlaWdodD0iMTYiIHdpZHRoPSIxNiI+PHJlY3QgeD0iMCIgeT0iMCIgd2lkdGg9IjIiIGhlaWdodD0"
            + "iMiIgZmlsbD0iIzAwMDAiLz48cmVjdCB4PSIyIiB5PSIwIiB3aWR0aD0iMiIgaGVpZ2h0PSIyIiBmaWxsPS"
            + "IjMDAwMCIvPjxyZWN0IHg9IjQiIHk9IjAiIHdpZHRoPSIyIiBoZWlnaHQ9IjIiIGZpbGw9IiNmZmI5YWYiL"
            + "z48cmVjdCB4PSI2IiB5PSIwIiB3aWR0aD0iMiIgaGVpZ2h0PSIyIiBmaWxsPSIjZmZiOWFmIi8+PHJlY3Qg"
            + "eD0iOCIgeT0iMCIgd2lkdGg9IjIiIGhlaWdodD0iMiIgZmlsbD0iI2ZmYjlhZiIvPjxyZWN0IHg9IjEwIiB"
            + "5PSIwIiB3aWR0aD0iMiIgaGVpZ2h0PSIyIiBmaWxsPSIjZmZiOWFmIi8+PHJlY3QgeD0iMTIiIHk9IjAiIH"
            + "dpZHRoPSIyIiBoZWlnaHQ9IjIiIGZpbGw9IiMwMDAwIi8+PHJlY3QgeD0iMTQiIHk9IjAiIHdpZHRoPSIyI"
            + "iBoZWlnaHQ9IjIiIGZpbGw9IiMwMDAwIi8+PHJlY3QgeD0iMCIgeT0iMiIgd2lkdGg9IjIiIGhlaWdodD0i"
            + "MiIgZmlsbD0iIzAwMDAiLz48cmVjdCB4PSIyIiB5PSIyIiB3aWR0aD0iMiIgaGVpZ2h0PSIyIiBmaWxsPSI"
            + "jZmZiOWFmIi8+PHJlY3QgeD0iNCIgeT0iMiIgd2lkdGg9IjIiIGhlaWdodD0iMiIgZmlsbD0iI2ZmYjlhZi"
            + "IvPjxyZWN0IHg9IjYiIHk9IjIiIHdpZHRoPSIyIiBoZWlnaHQ9IjIiIGZpbGw9IiNmZmI5YWYiLz48cmVjd"
            + "CB4PSI4IiB5PSIyIiB3aWR0aD0iMiIgaGVpZ2h0PSIyIiBmaWxsPSIjZmZiOWFmIi8+PHJlY3QgeD0iMTAi"
            + "IHk9IjIiIHdpZHRoPSIyIiBoZWlnaHQ9IjIiIGZpbGw9IiNmZmI5YWYiLz48cmVjdCB4PSIxMiIgeT0iMiI"
            + "gd2lkdGg9IjIiIGhlaWdodD0iMiIgZmlsbD0iI2ZmYjlhZiIvPjxyZWN0IHg9IjE0IiB5PSIyIiB3aWR0aD"
            + "0iMiIgaGVpZ2h0PSIyIiBmaWxsPSIjMDAwMCIvPjxyZWN0IHg9IjAiIHk9IjQiIHdpZHRoPSIyIiBoZWlna"
            + "HQ9IjIiIGZpbGw9IiNmZmI5YWYiLz48cmVjdCB4PSIyIiB5PSI0IiB3aWR0aD0iMiIgaGVpZ2h0PSIyIiBm"
            + "aWxsPSIjZmZiOWFmIi8+PHJlY3QgeD0iNCIgeT0iNCIgd2lkdGg9IjIiIGhlaWdodD0iMiIgZmlsbD0iI2Z"
            + "mYjlhZiIvPjxyZWN0IHg9IjYiIHk9IjQiIHdpZHRoPSIyIiBoZWlnaHQ9IjIiIGZpbGw9IiNmZmI5YWYiLz"
            + "48cmVjdCB4PSI4IiB5PSI0IiB3aWR0aD0iMiIgaGVpZ2h0PSIyIiBmaWxsPSIjZmZiOWFmIi8+PHJlY3Qge"
            + "D0iMTAiIHk9IjQiIHdpZHRoPSIyIiBoZWlnaHQ9IjIiIGZpbGw9IiNmZmI5YWYiLz48cmVjdCB4PSIxMiIg"
            + "eT0iNCIgd2lkdGg9IjIiIGhlaWdodD0iMiIgZmlsbD0iI2ZmYjlhZiIvPjxyZWN0IHg9IjE0IiB5PSI0IiB"
            + "3aWR0aD0iMiIgaGVpZ2h0PSIyIiBmaWxsPSIjZmZiOWFmIi8+PHJlY3QgeD0iMCIgeT0iNiIgd2lkdGg9Ij"
            + "IiIGhlaWdodD0iMiIgZmlsbD0iI2ZmYjlhZiIvPjxyZWN0IHg9IjIiIHk9IjYiIHdpZHRoPSIyIiBoZWlna"
            + "HQ9IjIiIGZpbGw9IiNmZmI5YWYiLz48cmVjdCB4PSI0IiB5PSI2IiB3aWR0aD0iMiIgaGVpZ2h0PSIyIiBm"
            + "aWxsPSIjZmZiOWFmIi8+PHJlY3QgeD0iNiIgeT0iNiIgd2lkdGg9IjIiIGhlaWdodD0iMiIgZmlsbD0iI2Z"
            + "mYjlhZiIvPjxyZWN0IHg9IjgiIHk9IjYiIHdpZHRoPSIyIiBoZWlnaHQ9IjIiIGZpbGw9IiNmZmI5YWYiLz"
            + "48cmVjdCB4PSIxMCIgeT0iNiIgd2lkdGg9IjIiIGhlaWdodD0iMiIgZmlsbD0iI2ZmYjlhZiIvPjxyZWN0I"
            + "Hg9IjEyIiB5PSI2IiB3aWR0aD0iMiIgaGVpZ2h0PSIyIiBmaWxsPSIjZmZiOWFmIi8+PHJlY3QgeD0iMTQi"
            + "IHk9IjYiIHdpZHRoPSIyIiBoZWlnaHQ9IjIiIGZpbGw9IiNmZmI5YWYiLz48cmVjdCB4PSIwIiB5PSI4IiB"
            + "3aWR0aD0iMiIgaGVpZ2h0PSIyIiBmaWxsPSIjZmZiOWFmIi8+PHJlY3QgeD0iMiIgeT0iOCIgd2lkdGg9Ij"
            + "IiIGhlaWdodD0iMiIgZmlsbD0iI2ZmYjlhZiIvPjxyZWN0IHg9IjQiIHk9IjgiIHdpZHRoPSIyIiBoZWlna"
            + "HQ9IjIiIGZpbGw9IiNmZmI5YWYiLz48cmVjdCB4PSI2IiB5PSI4IiB3aWR0aD0iMiIgaGVpZ2h0PSIyIiBm"
            + "aWxsPSIjZmZiOWFmIi8+PHJlY3QgeD0iOCIgeT0iOCIgd2lkdGg9IjIiIGhlaWdodD0iMiIgZmlsbD0iI2Z"
            + "mYjlhZiIvPjxyZWN0IHg9IjEwIiB5PSI4IiB3aWR0aD0iMiIgaGVpZ2h0PSIyIiBmaWxsPSIjZmZiOWFmIi"
            + "8+PHJlY3QgeD0iMTIiIHk9IjgiIHdpZHRoPSIyIiBoZWlnaHQ9IjIiIGZpbGw9IiNmZmI5YWYiLz48cmVjd"
            + "CB4PSIxNCIgeT0iOCIgd2lkdGg9IjIiIGhlaWdodD0iMiIgZmlsbD0iI2ZmYjlhZiIvPjxyZWN0IHg9IjAi"
            + "IHk9IjEwIiB3aWR0aD0iMiIgaGVpZ2h0PSIyIiBmaWxsPSIjZmZiOWFmIi8+PHJlY3QgeD0iMiIgeT0iMTA"
            + "iIHdpZHRoPSIyIiBoZWlnaHQ9IjIiIGZpbGw9IiNmZmI5YWYiLz48cmVjdCB4PSI0IiB5PSIxMCIgd2lkdG"
            + "g9IjIiIGhlaWdodD0iMiIgZmlsbD0iI2ZmYjlhZiIvPjxyZWN0IHg9IjYiIHk9IjEwIiB3aWR0aD0iMiIga"
            + "GVpZ2h0PSIyIiBmaWxsPSIjZmZiOWFmIi8+PHJlY3QgeD0iOCIgeT0iMTAiIHdpZHRoPSIyIiBoZWlnaHQ9"
            + "IjIiIGZpbGw9IiNmZmI5YWYiLz48cmVjdCB4PSIxMCIgeT0iMTAiIHdpZHRoPSIyIiBoZWlnaHQ9IjIiIGZ"
            + "pbGw9IiNmZmI5YWYiLz48cmVjdCB4PSIxMiIgeT0iMTAiIHdpZHRoPSIyIiBoZWlnaHQ9IjIiIGZpbGw9Ii"
            + "NmZmI5YWYiLz48cmVjdCB4PSIxNCIgeT0iMTAiIHdpZHRoPSIyIiBoZWlnaHQ9IjIiIGZpbGw9IiNmZmI5Y"
            + "WYiLz48cmVjdCB4PSIwIiB5PSIxMiIgd2lkdGg9IjIiIGhlaWdodD0iMiIgZmlsbD0iIzAwMDAiLz48cmVj"
            + "dCB4PSIyIiB5PSIxMiIgd2lkdGg9IjIiIGhlaWdodD0iMiIgZmlsbD0iI2ZmYjlhZiIvPjxyZWN0IHg9IjQ"
            + "iIHk9IjEyIiB3aWR0aD0iMiIgaGVpZ2h0PSIyIiBmaWxsPSIjZmZiOWFmIi8+PHJlY3QgeD0iNiIgeT0iMT"
            + "IiIHdpZHRoPSIyIiBoZWlnaHQ9IjIiIGZpbGw9IiNmZmI5YWYiLz48cmVjdCB4PSI4IiB5PSIxMiIgd2lkd"
            + "Gg9IjIiIGhlaWdodD0iMiIgZmlsbD0iI2ZmYjlhZiIvPjxyZWN0IHg9IjEwIiB5PSIxMiIgd2lkdGg9IjIi"
            + "IGhlaWdodD0iMiIgZmlsbD0iI2ZmYjlhZiIvPjxyZWN0IHg9IjEyIiB5PSIxMiIgd2lkdGg9IjIiIGhlaWd"
            + "odD0iMiIgZmlsbD0iI2ZmYjlhZiIvPjxyZWN0IHg9IjE0IiB5PSIxMiIgd2lkdGg9IjIiIGhlaWdodD0iMi"
            + "IgZmlsbD0iIzAwMDAiLz48cmVjdCB4PSIwIiB5PSIxNCIgd2lkdGg9IjIiIGhlaWdodD0iMiIgZmlsbD0iI"
            + "zAwMDAiLz48cmVjdCB4PSIyIiB5PSIxNCIgd2lkdGg9IjIiIGhlaWdodD0iMiIgZmlsbD0iIzAwMDAiLz48"
            + "cmVjdCB4PSI0IiB5PSIxNCIgd2lkdGg9IjIiIGhlaWdodD0iMiIgZmlsbD0iI2ZmYjlhZiIvPjxyZWN0IHg"
            + "9IjYiIHk9IjE0IiB3aWR0aD0iMiIgaGVpZ2h0PSIyIiBmaWxsPSIjZmZiOWFmIi8+PHJlY3QgeD0iOCIgeT"
            + "0iMTQiIHdpZHRoPSIyIiBoZWlnaHQ9IjIiIGZpbGw9IiNmZmI5YWYiLz48cmVjdCB4PSIxMCIgeT0iMTQiI"
            + "HdpZHRoPSIyIiBoZWlnaHQ9IjIiIGZpbGw9IiNmZmI5YWYiLz48cmVjdCB4PSIxMiIgeT0iMTQiIHdpZHRo"
            + "PSIyIiBoZWlnaHQ9IjIiIGZpbGw9IiMwMDAwIi8+PHJlY3QgeD0iMTQiIHk9IjE0IiB3aWR0aD0iMiIgaGV"
            + "pZ2h0PSIyIiBmaWxsPSIjMDAwMCIvPjwvc3ZnPg==";

        for (let row = 0, count = 0; row < rowsCount; row++) {
            for (let col = 0; col < colsCount; col++) {
                const cell = this.map[row][col];

                if (cell === 2 || cell === 3) {
                    const x = col * gridSize;
                    const y = row * gridSize;

                    this.ctx.fillStyle = "#ffb9af";

                    if (cell === 2) this.ctx.fillRect(x + 6, y + 6, 4, 4);
                    else {
                        let showImage = true;

                        this.animations.push({ fn: () => {
                            ctx.clearRect(x, y, gridSize, gridSize);
                            if (showImage) ctx.drawImage(dotImage, x, y, gridSize, gridSize);

                            if (this.map[row][col] !== 3) {
                                console.log(row * col);
                            }

                            showImage = !showImage;
                        }, id: 'dots-' + count, time: 200 });

                        count++;
                    }
                }
            }
        }
    }

    playAnimations(id: MazeAnimations) {
        let animations = id === undefined || id === "all"
            ? this.animations
            : this.animations.filter(e => e.id === id);

        animations = animations.filter(a => !Boolean(
            this.intervals.filter(b => b.id === a.id).length
        ));

        animations.forEach(e => this.intervals.push({
            id: e.id, ref: setInterval(e.fn, e.time),
        }));
    }

    pauseAnimations(id: MazeAnimations) {
        if (id === undefined || id === "all") {
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
}

export default Maze;
