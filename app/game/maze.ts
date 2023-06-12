class Maze {
    private map: number[][] = [];

    constructor() {
        let line = new Uint8Array(28);

        for (let i = 0; i < 36; i++)
            this.map.push(Array.from(line));

        console.log("maze");
    }

    get maze() {
        return this.map;
    }
}

export default Maze;
