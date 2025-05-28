let audioContext, analyser, dataArray;

let volume = 0;
let micStarted = false;

let sound_log = [];
const log_length = 200;

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
        if (sound_log.length > log_length) {
            sound_log.shift();
        }
        
        draw_graph(sound_log, 20, 20, 400, 300, volume_plot_color);

    }
}

function draw_graph(data, x_pos, y_pos, width, height, line_color) {
    let padding = 20;

    let xVals = data.map(d => d[0]);
    let yVals = data.map(d => d[1]);

    let minX = Math.min(...xVals);
    let maxX = Math.max(...xVals);
    let minY = Math.min(...yVals);
    let maxY = Math.max(...yVals);

    // Draw axes
    stroke(0);
    strokeWeight(2);
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
}



function calculate_volume() {
    let sumSquares = 0;
    for (let i = 0; i < dataArray.length; i++) {
        const val = dataArray[i] - 128;
        sumSquares += val * val;
    }
    volume = Math.sqrt(sumSquares / dataArray.length) * 4;
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
