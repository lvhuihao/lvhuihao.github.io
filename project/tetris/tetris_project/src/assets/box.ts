export enum BoxType {
    "Z" = "Z",
    "L" = "L",
    "T" = "T",
    "O" = "O",
    "I" = "I"
}

export type Coordinate = [number, number];
export type BoxPositionType = Record<BoxType, [Coordinate, Coordinate, Coordinate, Coordinate][]>

export const BoxPosition: BoxPositionType = {
    [BoxType.Z]: [ // -1 0, 0 0, 0 1, 1 1    0 -1, -1 0, 0 0, -1 1
        [[-1, 0], [0, 0], [0, 1], [1, 1]],
        [[0, -1], [-1, 0], [0, 0], [-1, 1]]
    ],

    [BoxType.I]: [ // 0 -1, 0 0, 0 1, 0 2    -1 0, 0 0, 1 0, 2 0
        [[0, -1], [0, 0], [0, 1], [0, 2]],
        [[-1, 0], [0, 0], [1, 0], [2, 0]]
    ],
    [BoxType.T]: [ // -1 0, 0 0, 1 0, 0 1    0 -1, -1 0, 0 0, 0 1    0 -1, -1 0, 0 0, 1 0     0 -1, 0 0, 1 0, 0 1
        [[-1, 0], [0, 0], [1, 0], [0, 1]],
        [[0, -1], [-1, 0], [0, 0], [0, 1]],
        [[0, -1], [-1, 0], [0, 0], [1, 0]],
        [[0, -1], [0, 0], [1, 0], [0, 1]]
    ],
    [BoxType.L]: [ // -1 -1, 0 -1 0 0, 0 1    -1 0, 0 0, 1 -1, 1 0    0 -1, 0 0,0 1, 1 1   -1 0, 0 0, 1 0, -1 1
        [[-1, -1], [0, -1], [0, 0], [0, 1]],
        [[-1, 0], [0, 0], [1, -1], [1, 0]],
        [[0, -1], [0, 0], [0, 1], [1, 1]],
        [[-1, 0], [0, 0], [1, 0], [-1, 1]]
    ],
    [BoxType.O]: [ // 0 0, 0 1, 1 0, 1 1
        [[0, 0], [0, 1], [1, 0], [1, 1]]
    ]
}

export class BoxInstence {

    body: [Coordinate, Coordinate, Coordinate, Coordinate];
    positionType = 0;
    boxType: BoxType;

    constructor() {
        const allType: BoxType[] = [BoxType.I, BoxType.L, BoxType.O, BoxType.T, BoxType.Z];
        this.boxType = allType[Math.floor(Math.random() * allType.length)];
        this.positionType = Math.floor(BoxPosition[this.boxType].length * Math.random())
        this.body = BoxPosition[this.boxType][this.positionType];

    }

    initBody(type: BoxType) {

    }

    transform() {
        this.positionType = (this.positionType + 1) % BoxPosition[this.boxType].length
        this.body = BoxPosition[this.boxType][this.positionType];
    }

    moveDown() {

    }

    moveLeft() {

    }

    moveRight() {

    }
}