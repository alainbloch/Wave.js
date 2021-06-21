// presumes that analyser has already been connected to a source
function fromAnalyser(analyser, canvas_id, sourceId, options = {}) {

    this.current_stream.id = canvas_id;
    this.current_stream.options = options;

    if (!this.sources[sourceId]) {
        this.sources[sourceId] = {
            "analyser": analyser
        }
    } else {
        cancelAnimationFrame(this.sources[sourceId].animation);
    }

    analyser.fftsize = 32768;
    let bufferLength = analyser.frequencyBinCount;
    this.current_stream.data = new Uint8Array(bufferLength);

    let self = this;
    let frameCount = 1

    function renderFrame() {
        self.current_stream.animation = requestAnimationFrame(self.current_stream.loop);
        frameCount++;
        self.sources['analyser'].animation = self.current_stream.animation;
        analyser.getByteFrequencyData(self.current_stream.data);

        self.visualize(self.current_stream.data, self.current_stream.id, self.current_stream.options, frameCount);
    }

    this.current_stream.loop = renderFrame;
    renderFrame();

}

function stopAnalyser() {
    cancelAnimationFrame(this.current_stream.animation);
}

function readAnalyser() {
    this.current_stream.loop();
}

export default {
    fromAnalyser,
    stopAnalyser,
    readAnalyser
}
