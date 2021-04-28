import drawWave from "./visuals/drawWave.js"
import drawShine from "./visuals/drawShine.js"
import drawRing from "./visuals/drawRing.js"
import drawBars from "./visuals/drawBars.js"
import drawDualbars from "./visuals/drawDualbars.js"
import drawOrbs from "./visuals/drawOrbs.js"
import drawFlower from "./visuals/drawFlower.js"
import drawFlowerBlocks from "./visuals/drawFlowerBlocks.js"
import drawBarsBlocks from "./visuals/drawBarsBlocks.js"
import drawDualbarsBlocks from "./visuals/drawDualbarsBlocks.js"
import drawStar from "./visuals/drawStar.js"
import drawRoundWave from "./visuals/drawRoundWave.js"
import drawRings from "./visuals/drawRings.js"
import drawShineRings from "./visuals/drawShineRings.js"
import drawCubes from "./visuals/drawCubes.js"
import drawBigBars from "./visuals/drawBigBars.js"
import drawShockwave from "./visuals/drawShockwave.js"
import drawFireworks from "./visuals/drawFireworks.js"
import drawStatic from "./visuals/drawStatic.js"
import drawWeb from "./visuals/drawWeb.js"
import drawStitches from "./visuals/drawStitches.js"
import drawRoundLayers from "./visuals/drawRoundLayers.js"


// @params options {Object} 
// options can have several properties which affect the visualization:
// * type {String|Function} Can be a string that refers to the precreated visualizers or can be a function for the visualizer
// * colors {Array||null} can be an array of hex color values (eg #d92027) or common color names. will default to ["#d92027", "#ff9234", "#ffcd3c", "#35d0ba"]
// * stroke {Integer} the width of the strokes 
// * frameRate {Integer} determines if the current frame should be drawn via modulus
// * height {Integer} alternative height of the visualization (defaults to canvas height)
// * width {Integer} alternative width of the visualization (defaults to canvas width)
export default function visualize(data, canvasId, options = {}, frame) {

    //make a clone of options
    options = { ...options }
    //options
    if (!options.stroke) options.stroke = 1;
    if (!options.colors) options.colors = ["#d92027", "#ff9234", "#ffcd3c", "#35d0ba"];


    let canvas = document.getElementById(canvasId);

    if (!canvas) return;

    let ctx = canvas.getContext("2d");
    let h = options.height || canvas.height;
    let w = options.width || canvas.width;

    ctx.strokeStyle = options.colors[0];
    ctx.lineWidth = options.stroke;

    let typeMap = {
        "bars": drawBars,
        "bars blocks": drawBarsBlocks,
        "big bars": drawBigBars,
        "cubes": drawCubes,
        "dualbars": drawDualbars,
        "dualbars blocks": drawDualbarsBlocks,
        "fireworks": drawFireworks,
        "flower": drawFlower,
        "flower blocks": drawFlowerBlocks,
        "orbs": drawOrbs,
        "ring": drawRing,
        "rings": drawRings,
        "round layers": drawRoundLayers,
        "round wave": drawRoundWave,
        "shine": drawShine,
        "shine rings": drawShineRings,
        "shockwave": drawShockwave,
        "star": drawStar,
        "static": drawStatic,
        "stitches": drawStitches,
        "wave": drawWave,
        "web": drawWeb
    }

    let frameRateMap = {
        "bars": 1,
        "bars blocks": 1,
        "big bars": 1,
        "cubes": 1,
        "dualbars": 1,
        "dualbars blocks": 1,
        "fireworks": 1,
        "flower": 1,
        "flower blocks": 1,
        "ring": 1,
        "rings": 1,
        "round layers": 1,
        "round wave": 1,
        "orbs": 1,
        "shine": 1,
        "shine rings": 1,
        "shockwave": 1,
        "star": 1,
        "static": 1,
        "stitches": 1,
        "wave": 1,
        "web": 1
    }

    const functionContext = {
        data, options, ctx, h, w, Helper: this.Helper, canvasId
    }

    if (["string", "function"].includes(typeof options.type)) options.type = [options.type]

    options.type.forEach(type => {

        let frameRate = options.frameRate || frameRateMap[type] || 1;

        let drawFunction = type;

        if (typeof type == "string") drawFunction = typeMap[type]

        //abide by the frame rate
        if (frame % frameRate === 0) {
            //clear canvas
            ctx.clearRect(0, 0, w, h);
            ctx.beginPath();

            drawFunction(functionContext);
        }
    })

}