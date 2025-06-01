let audioContext, analyser, dataArray;

let volume = 0;
let micStarted = false;

let sound_log = [];
const log_length_time = 5;
max_volume = 75;

function setup() {
    start_microphone();
    createCanvas(windowWidth, windowHeight);

    textAlign(CENTER, CENTER);
    textSize(18);
    volume_plot_color = color(255, 0, 0);
}

function draw() {
    background(150);

    if (micStarted) {
        analyser.getByteTimeDomainData(dataArray);
        volume = calculate_volume();

        sound_log.push([millis(), volume]);
        if ((sound_log[sound_log.length - 1][0] - sound_log[0][0]) > log_length_time * 1000) {
            sound_log.shift();
        }

        if (volume > max_volume) {
            //max_volume = volume;
            console.log("max_volume = " + max_volume);
        }

        draw_graph(sound_log, 60, 20, 400, 300, volume_plot_color, "Volume vs Time Plot", "Time (s)", "Volume (RMS)",
    "Now", "T-5", max_volume, "0");

    }
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
    let maxY = max_volume; // Or Math.max(...yVals)

    // Draw axes
    stroke(0);
    line(x_pos + padding, y_pos + height - padding, x_pos + width - padding, y_pos + height - padding); // X-axis
    line(x_pos + padding, y_pos + height - padding, x_pos + padding, y_pos + padding); // Y-axis

    // Plot line
    noFill();
    stroke(line_color);
    beginShape();
    for (let i = 0; i < data.length; i++) {
        let x = map(data[i][0], minX, maxX, x_pos + padding, x_pos + width - padding);
        let y = map(data[i][1], minY, maxY, y_pos + height - padding, y_pos + padding);
        vertex(x, y);
    }
    endShape();

    // Titles and axis labels
    textSize(20);
    fill(0);
    noStroke();
    text(title, x_pos + width / 2, y_pos + 30); // Title above the graph

    text(x_axis_title, x_pos + width / 2, y_pos + height); // X-axis title below graph
    text(y_axis_title, x_pos - 30, y_pos + height / 2); // Y-axis title left of graph

    // Axis edge labels
    textSize(12);
    text(min_x_title, x_pos + padding, y_pos + height - padding + 15);
    text(max_x_title, x_pos + width - padding, y_pos + height - padding + 15);

    text(max_y_title, x_pos + padding - 25, y_pos + padding);
    text(min_y_title, x_pos + padding - 25, y_pos + height - padding);
}


function calculate_volume() {
    let sumSquares = 0;
    for (let i = 0; i < dataArray.length; i++) {
        const val = dataArray[i] - 128;
        sumSquares += val * val;
    }
    volume = Math.sqrt(sumSquares / dataArray.length);
    return volume;
}

async function start_microphone() {
    const stream = await navigator.mediaDevices.getUserMedia({
        audio: true
    });
    audioContext = new(window.AudioContext || window.webkitAudioContext)();
    await audioContext.resume();
    const source = audioContext.createMediaStreamSource(stream);

    analyser = audioContext.createAnalyser();
    analyser.fftSize = 256;
    const bufferLength = analyser.frequencyBinCount;
    dataArray = new Uint8Array(bufferLength);

    source.connect(analyser);
    micStarted = true;
}
