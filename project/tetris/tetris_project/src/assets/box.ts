enum BoxType {
    "Z" = "Z",
    "L" = "L",
    "T" = "T",
    "O" = "O",
    "I" = "I"
}

type Coordinate = [number, number];
type BoxPositionType = Record<BoxType, [Coordinate, Coordinate, Coordinate, Coordinate][]>

const BoxPosition: BoxPositionType = {
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

class BoxInstence {

    body: [Coordinate, Coordinate, Coordinate, Coordinate];
    positionType = 0;

    constructor() {
        const allType: BoxType[] = [BoxType.I, BoxType.L, BoxType.O, BoxType.T, BoxType.Z];
        const nowType = Math.floor(Math.random() * allType.length);

        this.initBody(allType[nowType])
    }

    initBody(type: BoxType) {
        this.positionType = Math.floor(BoxPosition[type].length * Math.random())
        this.body = BoxPosition[type][this.positionType];
    }

    moveDown() {

    }

    moveLeft() {

    }

    moveRight() {

    }
}
export { BoxInstence }