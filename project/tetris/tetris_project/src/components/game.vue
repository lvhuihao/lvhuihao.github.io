<template>
    <div class="gameBoard">
        <div class="row" v-for="(row, rowIndex) in containerSize.height" :key="rowIndex">
            <div class="collom" v-for="(collom, collomIndex) in containerSize.width" :key="collomIndex">
                <div class="pixel" :class="[pixelStyle(collomIndex, rowIndex)]"></div>
            </div>
        </div>
    </div>
    <button @click="pause">暂停</button>
</template>
<script setup lang="ts">
import { reactive, computed, onMounted, watch } from 'vue';
import { BoxInstence, Coordinate } from '../assets/box'
enum PixelType {
    'empty' = 0,
    'activeBox' = 1,
    'staticBox' = 2
}

enum GameStatus {
    "pause" = 'pause',
    'gaming' = 'gaming',
    'over' = 'over'
}

let containerRealSize = reactive({ width: 200, height: 400 });
let pixelRealSize = reactive({ width: 20, height: 20 });
let containerSize = computed(() => {
    return { width: containerRealSize.width / pixelRealSize.width, height: containerRealSize.height / pixelRealSize.height }
})
let boxCenter: Coordinate = reactive([Math.floor(containerSize.value.width / 2), 5])
let activeBox = reactive(new BoxInstence());

let pixels: PixelType[][] = reactive(new Array(containerSize.value.width).fill(0).map(() => {
    return new Array(containerSize.value.height).fill(PixelType.empty);
}))

let gameStatus: GameStatus = GameStatus.gaming

let boxBorder = computed(() => {
    let boxBorder = curBox.value.reduce((pre, box) => {
        pre[0] = pre[0] > box[0] ? box[0] : pre[0];
        pre[1] = pre[1] < box[0] ? box[0] : pre[1];
        pre[2] = pre[2] > box[1] ? box[1] : pre[2];
        pre[3] = pre[3] < box[1] ? box[1] : pre[3];
        return pre;
    }, [containerSize.value.width, -1, containerSize.value.height, -1]);
    return boxBorder;
})

function shouldStop() {
    let nextCenter = [boxCenter[0], boxCenter[1] + 1];
    let nextBox = activeBox.body.map(cor => {
        return [cor[0] + nextCenter[0], cor[1] + nextCenter[1]]
    })
    return nextBox.some(b => {
        return pixels[b[0]][b[1]] === PixelType.staticBox || boxBorder.value[3] + 1 >= containerSize.value.height
    })
}

let curBox = computed(() => {
    if (activeBox) {
        return activeBox.body.map(cor => {
            return [cor[0] + boxCenter[0], cor[1] + boxCenter[1]]
        })
    } else {
        return [boxCenter]
    }
})

watch(curBox, (newValue, oldValue) => {
    oldValue.forEach(c => {
        if (pixels[c[0]][c[1]] === PixelType.activeBox) {
            pixels[c[0]][c[1]] = PixelType.empty;
        }
    })
    newValue.forEach(c => {
        pixels[c[0]][c[1]] = PixelType.activeBox;
    })
})


onMounted(() => {
    init();
})

function pixelStyle(collom: number, row: number) {
    if (!(pixels && pixels[collom] && pixels[collom][row])) {
        return 'emptyBox'
    } else {
        switch (pixels[collom][row]) {
            case PixelType.empty:
                return 'emptyBox';
            case PixelType.activeBox:
                return 'activeBox';
            case PixelType.staticBox:
                return "staticBox";
        }
    }
}
function init() {
    activeBox = reactive(new BoxInstence());
    setInterval(() => {
        if (gameStatus === GameStatus.gaming) {
            if (shouldStop()) {
                curBox.value.forEach(c => {
                    pixels[c[0]][c[1]] = PixelType.staticBox;
                })
                boxCenter[1] = -1;
                let ins = new BoxInstence();
                activeBox.body = ins.body;
                activeBox.boxType = ins.boxType;
                activeBox.positionType = ins.positionType;
            } else {
                boxCenter[1]++;
            }
        }
    }, 500);
    addListener()
}

function addListener() {
    document.addEventListener('keydown', (event) => {
        switch (event.code) {
            case 'ArrowLeft':
                goLeft();
                break;
            case 'ArrowRight':
                goRight();
                break;
        }
    })
}

function goLeft() {
    console.log(boxBorder.value);
    if (boxBorder.value[0] > 0) {
        boxCenter[0]--;
    }
}

function goRight() {
    if (boxBorder.value[1] < containerSize.value.width - 1) {
        boxCenter[0]++;
    }
}

function pause() {
    if (gameStatus === GameStatus.gaming) {
        gameStatus = GameStatus.pause
    } else {
        gameStatus = GameStatus.gaming
    }
}
</script>
<style>
.gameBoard {
    width: 250px;
    height: 50%;
}

.row {
    width: auto;
    height: 20px;
}

.collom {
    display: inline-block;
    width: 20px;
    height: 20px;
    border: solid black 1px;
}

.pixel {
    width: 100%;
    height: 100%;
}

.pixel.empty {}

.pixel.activeBox {
    background-color: red;
}

.pixel.staticBox {
    background-color: green;
}
</style>
