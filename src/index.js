import fromElement from "./fromElement.js";
import fromFile from "./fromFile.js";
import fromStream from "./fromStream.js";
import fromAnalyser from "./fromAnalyser.js";
import visualize from "./visualize.js";
import Helper from "./helper.js";

'use strict'

function Wave() {
    this.current_stream = {};
    this.sources = {};
    this.onFileLoad = null;
    this.activeElements = {}
    this.activated = false

    window.AudioContext = window.AudioContext || window.webkitAudioContext;
}

Wave.prototype = {
    fromElement,
    fromFile,
    ...fromStream,
    ...fromAnalyser,
    visualize,
    Helper
}

export default Wave



