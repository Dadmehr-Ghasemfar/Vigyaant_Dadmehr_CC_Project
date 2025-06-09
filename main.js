let audioContext, analyser, dataArray;
let volume = 0;
let micStarted = false;
let graph_button;
let showGraph = false;
let sound_log = [];
let volume_plot_color;

const log_length_time = 5;
const max_volume = 55;
let frequencyData;

function setup() {
    createCanvas(windowWidth, windowHeight);
    textAlign(CENTER, CENTER);
    textSize(18);

    volume_plot_color = color(1, 50, 32);

    graph_button = createButton("Sound Test");
    graph_button.position(530, 25);
    graph_button.mouseClicked(toggleGraph);

    start_microphone();
}

function draw() {
    background(123, 63, 0);

    if (micStarted) {
        analyser.getByteTimeDomainData(dataArray);
        volume = calculate_volume();

        sound_log.push([millis(), volume]);
        if ((sound_log[sound_log.length - 1][0] - sound_log[0][0]) > log_length_time * 1000) {
            sound_log.shift();
        }

        if (volume > max_volume) {
            // Uncomment if you want auto-scaling
            // max_volume = volume;
            console.log("max_volume = " + max_volume);
        }

        if (showGraph) {
            draw_graph(sound_log, 100, 200, 400, 300, volume_plot_color,
                "Volume vs Time Plot", "Time (s)", "Volume (RMS)",
                "Now", "T-5", max_volume.toString(), "0");

            let frequencyData = new Float32Array(analyser.frequencyBinCount);
            analyser.getFloatFrequencyData(frequencyData);
            let max_x_title = (sampling_rate / 2).toFixed(0) + " Hz";
            draw_fft_plot(frequencyData, 600, 200, 400, 300, color(100, 200, 255), "Live Frequency Spectrum", "Frequency", "Magnitude", max_x_title, "0 Hz", "max dB", "min dB");
        }
    }
}
// jshint ignore:start
async function start_microphone() {
    const stream = await navigator.mediaDevices.getUserMedia({
        audio: true
    });
    audioContext = new(window.AudioContext || window.webkitAudioContext)();
    await audioContext.resume();
    sampling_rate = audioContext.sampleRate;

const source = audioContext.createMediaStreamSource(stream);
analyser = audioContext.createAnalyser();
analyser.fftSize = 256;

const bufferLength = analyser.frequencyBinCount;
dataArray = new Uint8Array(bufferLength);
frequencyData = new Uint8Array(bufferLength);

source.connect(analyser);
micStarted = true;
}
// jshint ignore:end

function calculate_volume() {
    let sumSquares = 0;
    for (let i = 0; i < dataArray.length; i++) {
        const val = dataArray[i] - 128;
        sumSquares += val * val;
    }
    return Math.sqrt(sumSquares / dataArray.length);
}

function toggleGraph() {
    showGraph = !showGraph;
}

function draw_graph(data, x_pos, y_pos, width, height, line_color,
    title, x_axis_title, y_axis_title,
    max_x_title, min_x_title, max_y_title, min_y_title) {

    let padding = 40;
    textAlign(CENTER, CENTER);
    textSize(12);
    strokeWeight(2);

    let xVals = data.map(d => d[0]);
    let yVals = data.map(d => d[1]);
    let minX = Math.min(...xVals);
    let maxX = Math.max(...xVals);
    let minY = Math.min(...yVals);
    let maxY = max_volume;

    // Axes
    stroke(0);
    line(x_pos + padding, y_pos + height - padding, x_pos + width - padding, y_pos + height - padding); // X
    line(x_pos + padding, y_pos + height - padding, x_pos + padding, y_pos + padding); // Y

    // Graph line
    noFill();
    stroke(line_color);
    beginShape();
    for (let i = 0; i < data.length; i++) {
        let x = map(data[i][0], minX, maxX, x_pos + padding, x_pos + width - padding);
        let y = map(data[i][1], minY, maxY, y_pos + height - padding, y_pos + padding);
        vertex(x, y);
    }
    endShape();

    // Labels
    textSize(20);
    fill(0);
    noStroke();
    text(title, x_pos + width / 2, y_pos + 30);
    text(x_axis_title, x_pos + width / 2, y_pos + height);
    push();
    translate(x_pos + padding - 30, y_pos + height / 2);
    rotate(-HALF_PI);
    text(y_axis_title, 0, 0);
    pop();

    textSize(12);
    text(min_x_title, x_pos + padding, y_pos + height - padding + 15);
    text(max_x_title, x_pos + width - padding, y_pos + height - padding + 15);
    text(max_y_title, x_pos + padding - 25, y_pos + padding);
    text(min_y_title, x_pos + padding - 25, y_pos + height - padding);
}

function draw_fft_plot(frequencyData, x_pos, y_pos, width, height, bar_color,
    title, x_axis_title, y_axis_title, max_x_title, min_x_title, max_y_title, min_y_title
) {
    let padding = 40;
    let numBars = frequencyData.length;
    let barWidth = (width - 2 * padding) / numBars;

    textAlign(CENTER, CENTER);
    textSize(12);
    strokeWeight(2);

    // Draw axes
    stroke(0);
    line(x_pos + padding, y_pos + height - padding, x_pos + width - padding, y_pos + height - padding); // X
    line(x_pos + padding, y_pos + height - padding, x_pos + padding, y_pos + padding); // Y

    // Draw bars
    noStroke();
    fill(bar_color);
    for (let i = 0; i < numBars; i++) {
        let db = frequencyData[i];
        let scaledHeight = map(db, analyser.minDecibels, analyser.maxDecibels, 0, height - 2 * padding);
        scaledHeight = max(scaledHeight, 0);
        console.log("max dB = "+analyser.maxDecibels);
        rect(
            x_pos + padding + i * barWidth,
            y_pos + height - padding - scaledHeight,
            barWidth,
            scaledHeight
        );
    }

    // Draw labels
    fill(0);
    noStroke();
    textSize(20);

    // Titles
    text(title, x_pos + width / 2, y_pos + 30);
    text(x_axis_title, x_pos + width / 2, y_pos + height - padding + 30);
    push();
    translate(x_pos + padding - 30, y_pos + height / 2);
    rotate(-HALF_PI);
    text(y_axis_title, 0, 0);
    pop();

    // Min/Max axis values
    textSize(12);
    text(min_x_title, x_pos + padding, y_pos + height - padding + 15);
    text(max_x_title, x_pos + width - padding, y_pos + height - padding + 15);
    text(min_y_title, x_pos + padding - 20, y_pos + height - padding);
    text(max_y_title, x_pos + padding - 20, y_pos + padding);
}