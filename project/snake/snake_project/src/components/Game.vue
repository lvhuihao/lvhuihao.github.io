<template>
    <div class="game">
        <div
            class="pixels"
            :style="{
                width: width * pixelSize,
                height: height * pixelSize,
                background: color,
            }"
        >
            <div
                class="pixelLine"
                v-for="(line, lineIndex) in height"
                :key="lineIndex"
            >
                <div
                    class="pixel"
                    :style="{
                        width: pixelSize + 'px',
                        height: pixelSize + 'px',
                        background: ifFood([lineIndex, rowIndex])
                            ? 'green'
                            : '',
                    }"
                    v-for="(row, rowIndex) in width"
                    :key="rowIndex"
                    :position="'' + lineIndex + '-' + rowIndex"
                >
                    <div
                        class="snakeBodyItem"
                        v-if="isSnakeBody([lineIndex, rowIndex])"
                    ></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "Game",
    mounted() {
        this.timer = setInterval(() => {
            if (this.shouldDead()) {
                clearInterval(this.timer);
            } else {
                this.snakeMove();
            }
        }, this.speed);
        this.addListener();
        this.createFood();
    },
    data() {
        return {
            speed: 90,
            direction: "right",
            timer: undefined,
            width: 20,
            height: 20,
            pixelSize: 10, //px
            color: "white",
            snakeBody: [[0, 0]],
            food: [10, 10],
        };
    },
    methods: {
        addListener() {
            document.addEventListener("keydown", (event) => {
                if (!this.canSetDirection) {
                    return;
                }
                switch (event.code) {
                    case "ArrowDown":
                        this.direction =
                            this.direction === "up" ? this.direction : "down";
                        break;
                    case "ArrowUp":
                        this.direction =
                            this.direction === "down" ? this.direction : "up";
                        break;
                    case "ArrowLeft":
                        this.direction =
                            this.direction === "right"
                                ? this.direction
                                : "left";
                        break;
                    case "ArrowRight":
                        this.direction =
                            this.direction === "left"
                                ? this.direction
                                : "right";
                        break;
                }
                this.canSetDirection = false;
            });
        },
        createFood() {
            let foodPosi = [
                parseInt(Math.random() * this.height),
                parseInt(Math.random() * this.width),
            ];
            if (this.isSnakeBody(foodPosi)) {
                this.createFood();
            } else {
                this.food = foodPosi;
            }
        },
        ifFood([x, y]) {
            return this.food[0] === x && this.food[1] === y;
        },
        isSnakeBody([x, y]) {
            return this.snakeBody.some((item) => {
                return item[0] === x && item[1] === y;
            });
        },
        snakeMove() {
            let next = this.getNextItem();
            if (next[0] === this.food[0] && next[1] === this.food[1]) {
                this.snakeBody.unshift(next);
                this.createFood();
            } else {
                this.snakeBody.pop();
                this.snakeBody.unshift(next);
            }
            this.canSetDirection = true;
        },
        getNextItem() {
            switch (this.direction) {
                case "left":
                    return [this.snakeBody[0][0], this.snakeBody[0][1] - 1];
                case "right":
                    return [this.snakeBody[0][0], this.snakeBody[0][1] + 1];
                case "up":
                    return [this.snakeBody[0][0] - 1, this.snakeBody[0][1]];
                case "down":
                    return [this.snakeBody[0][0] + 1, this.snakeBody[0][1]];
                default:
                    return this.snakeBody[0];
            }
        },
        shouldDead() {
            let next = this.getNextItem();
            return (
                next[0] >= this.height ||
                next[1] >= this.width ||
                next[0] < 0 ||
                next[1] < 0 ||
                this.isSnakeBody(next)
            );
        },
    },
};
</script>

<style  lang="css" scoped>
.game {
    height: 200px;
    width: 200px;
    margin: auto;
}
.game .pixels {
    background-color: white;
    margin: auto;
    display: flex;
    flex-direction: column;
}
.pixel {
    border: 0.1px solid gray;
}
.pixels .pixelLine {
    width: 100%;
    height: auto;
    display: flex;
}

.snakeBodyItem {
    width: 100%;
    height: 100%;
    background: red;
}
</style>
