// p5 + Web Audio + Pitchy
import {
    PitchDetector
} from "https://cdn.skypack.dev/pitchy";

let audioContext, analyser, dataArray, frequencyData, detector;
let volume = 0;
let micStarted = false;
let graph_button;
let showGraph = false;
let sound_log = [];
let peak_log = [];
let volume_plot_color;
let currentPitch = null;
let pitchNote = "";
let smoothedVolume = 0;

const log_length_time = 5;
const max_volume = 55;
const peak_history_limit = 10;
let sampling_rate;

function setup() {
    createCanvas(windowWidth, windowHeight);
    textAlign(CENTER, CENTER);
    textSize(18);

    volume_plot_color = color(255, 107, 107);

    graph_button = createButton("Sound Test");
    graph_button.position(530, 25);
    graph_button.mouseClicked(toggleGraph);

    start_microphone();
}

function draw() {
    background(102, 126, 234);

    if (micStarted) {
        analyser.getByteTimeDomainData(dataArray);
        volume = calculate_volume();

        // Smooth the volume
        smoothedVolume = smoothVolume(volume, smoothedVolume);

        // Update log
        sound_log.push([millis(), smoothedVolume]);
        if ((sound_log[sound_log.length - 1][0] - sound_log[0][0]) > log_length_time * 1000) {
            sound_log.shift();
        }

        // Pitch detection
        const [pitch, clarity] = detector.findPitch(dataArray);
        if (clarity > 0.95) {
            currentPitch = pitch;
            pitchNote = hzToNoteName(pitch);
        }

        fill(0);
        textSize(32);
        if (currentPitch) {
            text(`Pitch: ${pitchNote} (${currentPitch.toFixed(2)} Hz)`, width / 2, 80);
        }

        // Peak detection
        let peaks = findLocalPeaks(sound_log, 5);
        if (peaks.length > 0) {
            peak_log = peak_log.concat(peaks);
            if (peak_log.length > peak_history_limit) {
                peak_log = peak_log.slice(-peak_history_limit);
            }
        }

        if (showGraph) {
            draw_graph(sound_log, 100, 200, 400, 300, volume_plot_color,
                "Volume vs Time Plot", "Time (ms)", "Volume (RMS)",
                "Now", "T-5", max_volume.toString(), "0", peak_log);
        }
    }
}

async function start_microphone() {
    const stream = await navigator.mediaDevices.getUserMedia({
        audio: true
    });
    audioContext = new(window.AudioContext || window.webkitAudioContext)();
    await audioContext.resume();

    sampling_rate = audioContext.sampleRate;

    const source = audioContext.createMediaStreamSource(stream);
    analyser = audioContext.createAnalyser();
    analyser.fftSize = 2048;

    const bufferLength = analyser.fftSize;
    dataArray = new Float32Array(bufferLength);
    frequencyData = new Uint8Array(analyser.frequencyBinCount);

    source.connect(analyser);
    detector = PitchDetector.forFloat32Array(sampling_rate);
    micStarted = true;
}

function calculate_volume() {
    let sumSquares = 0;
    for (let i = 0; i < dataArray.length; i++) {
        sumSquares += dataArray[i] * dataArray[i];
    }
    return Math.sqrt(sumSquares / dataArray.length);
}

function smoothVolume(currentVal, prevVal, alpha = 0.2) {
    return alpha * currentVal + (1 - alpha) * prevVal;
}

function findLocalPeaks(data, threshold = 5) {
    const peaks = [];
    for (let i = 1; i < data.length - 1; i++) {
        if (data[i][1] > data[i - 1][1] && data[i][1] > data[i + 1][1] && data[i][1] > threshold) {
            peaks.push(data[i]);
        }
    }
    return peaks;
}

function hzToNoteName(freq) {
    const noteNames = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
    const A4 = 440;
    const noteNumber = 12 * (Math.log2(freq / A4)) + 69;
    const rounded = Math.round(noteNumber);
    const name = noteNames[rounded % 12];
    const octave = Math.floor(rounded / 12) - 1;
    return name + octave;
}

function toggleGraph() {
    showGraph = !showGraph;
}

function draw_graph(data, x_pos, y_pos, width, height, line_color,
    title, x_axis_title, y_axis_title,
    max_x_title, min_x_title, max_y_title, min_y_title,
    peaks = []) {

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

    stroke(0);
    line(x_pos + padding, y_pos + height - padding, x_pos + width - padding, y_pos + height - padding);
    line(x_pos + padding, y_pos + height - padding, x_pos + padding, y_pos + padding);

    noFill();
    stroke(line_color);
    beginShape();
    for (let i = 0; i < data.length; i++) {
        let x = map(data[i][0], minX, maxX, x_pos + padding, x_pos + width - padding);
        let y = map(data[i][1], minY, maxY, y_pos + height - padding, y_pos + padding);
        vertex(x, y);
    }
    endShape();

    // Draw peak points
    fill(255, 0, 0);
    noStroke();
    for (let i = 0; i < peaks.length; i++) {
        let x = map(peaks[i][0], minX, maxX, x_pos + padding, x_pos + width - padding);
        let y = map(peaks[i][1], minY, maxY, y_pos + height - padding, y_pos + padding);
        ellipse(x, y, 8, 8);
    }

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
