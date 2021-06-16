<template>
    <div id="qua-diagram">
        <canvas id="vertical-line"></canvas>
        <!-- <canvas id="horizontal-line"></canvas> -->
        <!-- <div class="info-item" v-for="(info, index) in showList" :key="index">
            <div class="item" v-for="(item, index) in info">{{item}}</div>
        </div> -->
    </div>
</template>

<script>
export default {
    // props: ["showList"]
    data() {
        return {
            showList: [[1,2,3],[4,5,6],[7,8,9],[10,11,12]]
        }
    },
    mounted() {
        let drawTriangle = function(x1, y1, x2, y2, x3, y3, ctx) {
            ctx.beginPath();
            ctx.moveTo(x1, y1);
            ctx.lineTo(x2, y2);
            ctx.lineTo(x3, y3);
            ctx.fill();
            ctx.closePath();
        }
        let setupCanvas = function(canvas) {
            // Get the device pixel ratio, falling back to 1.
            let dpr = window.devicePixelRatio || 1;
            // Get the size of the canvas in CSS pixels.
            let rect = canvas.getBoundingClientRect();
            // Give the canvas pixel dimensions of their CSS
            // size * the device pixel ratio.
            canvas.width = rect.width * dpr;
            canvas.height = rect.height * dpr;
            let ctx = canvas.getContext('2d');
            // Scale all drawing operations by the dpr, so you
            // don't have to worry about the difference.
            ctx.scale(dpr, dpr);
            return ctx;
        };
        (function () {
            const canvas = document.getElementById('vertical-line');
            const ctx = setupCanvas(canvas);
            let scale = window.devicePixelRatio;
            // canvas.style.position = 'absolute';
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(0, 75);
            ctx.lineTo(290, 75);
            ctx.moveTo(150, 150);
            ctx.lineTo(150, 10);
            ctx.fillText("Static", 0, 88);
            ctx.fillText("Dynamic", 250, 88);
            ctx.fillText("Strong", 155, 144)
            ctx.fillText("Weak", 155, 20)
            ctx.fillText("C", 70, 35);
            ctx.fillText("C++", 70, 55);
            ctx.fillText("C#", 70, 105);
            ctx.fillText("Java", 70, 125);
            ctx.fillText("Python", 200, 115);
            ctx.fillText("JavaScript", 200, 45);
            ctx.closePath();
            ctx.stroke();
            drawTriangle(148, 10, 152, 10, 150, 4, ctx);
            drawTriangle(290, 73, 290, 77, 295, 75, ctx);
        })();
    }
};
</script>
<style>
    #qua-diagram {
        display: flex;
        position: relative;
        flex-direction: row;
        flex-wrap: wrap;
        /* width: 80vh;
        height: 30vw; */
    }
    /* #vertical-line {
        height: 80vh;
        width: 60vw;
    } */
    .info-item {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        flex-wrap: wrap;
    }
</style>