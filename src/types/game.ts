export type TargetCoords = [number, number];

export type MatrixLine = number[];
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

/** Animations ID (maze) */
export type AnimationsID =
    | "all"
    | "dots"
    | (string & {})
    | undefined;

export type PlayerAnimations = 'all' | 'eating' | 'moving';
