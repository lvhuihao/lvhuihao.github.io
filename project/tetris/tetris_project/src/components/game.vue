<template>
    <div class="gameBoard">
        <div class="row" v-for="(row, rowIndex) in containerSize.height" :key="rowIndex">
            <div class="collom" v-for="(collom, collomIndex) in containerSize.width" :key="collomIndex">
                <div class="pixel" v-if="isPixel(rowIndex, collomIndex)"></div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { reactive, computed, onMounted } from 'vue';
import { BoxInstence } from '../assets/box'
let pixels = [];
let containerRealSize = reactive({ width: 200, height: 400 });
let pixelRealSize = reactive({ width: 20, height: 20 });
let containerSize = computed(() => {
    return { width: containerRealSize.width / pixelRealSize.width, height: containerRealSize.height / pixelRealSize.height }
})

let curBox = computed(() => {
    if (activeBox) {
        return activeBox.body.map(cor => {
            return [cor[0] + boxCenter[0], cor[1] + boxCenter[1]]
        })
    } else {
        return [boxCenter]
    }
})

let boxCenter = reactive([Math.floor(containerSize.value.width / 2), -1])
let activeBox;

onMounted(() => {
    init();
})
function isPixel(row, collom) {
    return pixels[row][collom]
}
function init() {
    pixels = new Array(containerSize.value.width).fill(new Array(containerSize.value.height).fill(false));
    activeBox = new BoxInstence();
    setInterval(() => {
        boxCenter[1]++;
        console.log(curBox);
    }, 1000)
}
</script>
<style>
.gameBoard {
    width: 50%;
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
}

.pixel {
    width: 100%;
    height: 100%;
    border: solid black 1px;
}
</style>
