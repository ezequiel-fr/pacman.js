
/** 2D coordinates */
export type TargetCoords = [number, number];

/** A matrix row */
export type MatrixLine = number[];
/** A 2D matrix */
export type Matrix2D = MatrixLine[];

/** Main colors of each ghosts (Inky, Clyde, Pinky, Blinky) */
export type GhostsColor = 'cyan' | 'orange' | 'pink' | 'red';
/** Name of each ghosts */
export type GhostsName = 'Blinky' | 'Pinky' | 'Inky' | 'Clyde';

/** Direction enumerator */
export enum Direction { Up, Right, Down, Left }

/** Ghost different states */
export enum GhostState {
    Chase,
    Eaten,
    Frightened,
    Scatter,
}

type Animations<T = boolean> = 'all' | (T extends false ? never : string & {});

/** Animations ID (maze) */
export type MazeAnimations =
    | "all"
    | "dots"
    | Animations<true>;

/** Player animations type */
export type PlayerAnimations = Animations<false> | 'eating' | 'moving' | 'turning';

/** Game events */
export type GameEventsName = 'play' | 'pause';

export type GameEvents<T = GameEventsName> = (...args: any[]) => void;
