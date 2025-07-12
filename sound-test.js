//Audio related variables
let audioContext, analyser, dataArray;
let volume = 0;
let micStarted = false;
<<<<<<< HEAD
//Visualization Related
let graph_button;
let showGraph = false;
let sound_log = [];
let volume_plot_color;
//Configurgation For The Graph
const log_length_time = 5;//How many seconds of volume history to keep
const max_volume = 55;//
let frequencyData;
let playBTN;
=======
let testButton;
let showGraph = false;
let sound_log = [];
let volume_plot_color;

const log_length_time = 5;
const max_volume = 40;
let peak_log = [];

let frequencyData;
let sampling_rate;

>>>>>>> 17a6e6e331215c8ba436112703bb70077ee6cfcb
function setup() {
  createCanvas(windowWidth, windowHeight);
  textAlign(CENTER, CENTER);
  textSize(18);

<<<<<<< HEAD
    volume_plot_color = color(255, 107, 107);
    
    playBTN = document.getElementById("playBTN");

    start_microphone();
=======
  volume_plot_color = color(255, 107, 107);

  // Create and position the test button
  testButton = createButton("Test Sound");
  testButton.position(width/2 - 50, height/2 - 25);
  testButton.size(100, 50);
  testButton.mousePressed(startTest);
  testButton.style('font-size', '16px');
>>>>>>> 17a6e6e331215c8ba436112703bb70077ee6cfcb
}

function draw() {
  background(102, 126, 234);

<<<<<<< HEAD
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
            draw_fft_plot(frequencyData, 600, 200, 400, 300, color(255, 107, 107), "Live Frequency Spectrum", "Frequency", "Magnitude", max_x_title, "0 Hz", "max dB", "min dB");
        }
=======
  if (!micStarted) {
    fill(255);
    text("Click 'Test Sound' to begin", width / 2, height / 2 - 60);
    return;
  }

  if (showGraph) {
    analyser.getByteTimeDomainData(dataArray);
    volume = calculate_volume();
    smoothedVolume = alpha * volume + (1 - alpha) * smoothedVolume;

    sound_log.push([millis(), smoothedVolume]);
    if ((sound_log[sound_log.length - 1][0] - sound_log[0][0]) > log_length_time * 1000) {
      sound_log.shift();
>>>>>>> 17a6e6e331215c8ba436112703bb70077ee6cfcb
    }

    let new_peaks = findLocalMaxima(sound_log, 5, 100);
    if (new_peaks.length > 0) {
      peak_log = peak_log.concat(new_peaks);
    }

    for (let i = peak_log.length - 1; i >= 0; i--) {
      if (millis() - peak_log[i][0] > log_length_time * 1000) {
        peak_log.splice(i, 1);
      }
    }

    let avgPeakIntervalMs = computeAveragePeakInterval(peak_log);

    draw_graph(
      sound_log,
      100, 200, 400, 300,
      volume_plot_color,
      "Volume vs Time Plot",
      "Time (s)",
      "Volume (RMS)",
      "Now", "T-5", max_volume.toString(), "0",
      peak_log,
      avgPeakIntervalMs
    );

    let frequencyData = new Float32Array(analyser.frequencyBinCount);
    analyser.getFloatFrequencyData(frequencyData);
    let max_x_title = (sampling_rate / 2).toFixed(0) + " Hz";
    draw_fft_plot(
      frequencyData,
      600, 200, 400, 300,
      color(255, 107, 107),
      "Live Frequency Spectrum",
      "Frequency", "Magnitude",
      max_x_title, "0 Hz", "max dB", "min dB"
    );
  }
}
<<<<<<< HEAD
// jshint ignore:start
async function start_microphone() {
    const stream = await navigator.mediaDevices.getUserMedia({
        audio: true
    });
    audioContext = new(window.AudioContext || window.webkitAudioContext)();
=======

async function startTest() {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
>>>>>>> 17a6e6e331215c8ba436112703bb70077ee6cfcb
    await audioContext.resume();
    sampling_rate = audioContext.sampleRate;

const source = audioContext.createMediaStreamSource(stream);
analyser = audioContext.createAnalyser();
analyser.fftSize = 256;

const bufferLength = analyser.frequencyBinCount;
dataArray = new Uint8Array(bufferLength);
frequencyData = new Uint8Array(bufferLength);

<<<<<<< HEAD
source.connect(analyser);
micStarted = true;
=======
    source.connect(analyser);
    micStarted = true;
    showGraph = true;
    testButton.hide();
  } catch (err) {
    console.error("Error accessing microphone:", err);
    alert("Could not access microphone. Please ensure you've granted permission.");
  }
>>>>>>> 17a6e6e331215c8ba436112703bb70077ee6cfcb
}

function calculate_volume() {
  let sumSquares = 0;
  for (let i = 0; i < dataArray.length; i++) {
    const val = dataArray[i] - 128;
    sumSquares += val * val;
  }
  return Math.sqrt(sumSquares / dataArray.length);
}

<<<<<<< HEAD
function max_vol(){
    const rows = sound_log.length;
    var max5svolume = 0;
    var max5stime = 0;
    for(var timestamp = 0; timestamp < rows; timestamp++){
        if(sound_log[timestamp][1] >= max5svolume){
            max5stime = sound_log[timestamp][0];
            max5svolume = sound_log[timestamp][1];
        }
    }
    return { 
        maxvolume: max5svolume,
        maxtime: max5stime 
    };
}

function toggleGraph() {
    showGraph = !showGraph;
=======
function findLocalMaxima(data, threshold = 4, minSeparation = 100) {
  const rawPeaks = [];

  for (let i = 1; i < data.length - 1; i++) {
    if (
      data[i][1] > data[i - 1][1] &&
      data[i][1] > data[i + 1][1] &&
      data[i][1] > threshold
    ) {
      rawPeaks.push(data[i]);
    }
  }

  const filteredPeaks = [];
  let lastPeakTime = -Infinity;

  for (let i = 0; i < rawPeaks.length; i++) {
    let [time, val] = rawPeaks[i];
    if (time - lastPeakTime >= minSeparation) {
      filteredPeaks.push([time, val]);
      lastPeakTime = time;
    }
  }

  return filteredPeaks;
}

function computeAveragePeakInterval(peaks) {
  if (peaks.length < 2) return 0;
  return (log_length_time / (peaks.length - 1));
>>>>>>> 17a6e6e331215c8ba436112703bb70077ee6cfcb
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
    line(x_pos + padding, y_pos + height - padding, x_pos + width - padding, y_pos + height - padding); // X-axis
    line(x_pos + padding, y_pos + height - padding, x_pos + padding, y_pos + padding); // Y-axis

<<<<<<< HEAD
    // Graph line
=======
    // Volume plot
>>>>>>> 17a6e6e331215c8ba436112703bb70077ee6cfcb
    noFill();
    stroke(line_color);
    beginShape();
    for (let i = 0; i < data.length; i++) {
        let x = map(data[i][0], minX, maxX, x_pos + padding, x_pos + width - padding);
        let y = map(data[i][1], minY, maxY, y_pos + height - padding, y_pos + padding);
        vertex(x, y);
    }
    endShape();

<<<<<<< HEAD
=======
    // Peak dots
    fill(255, 0, 0);
    noStroke();
    for (let i = 0; i < peaks.length; i++) {
        let x = map(peaks[i][0], minX, maxX, x_pos + padding, x_pos + width - padding);
        let y = map(peaks[i][1], minY, maxY, y_pos + height - padding, y_pos + padding);
        ellipse(x, y, 8, 8);
    }

>>>>>>> 17a6e6e331215c8ba436112703bb70077ee6cfcb
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

    // Axis tick labels
    textSize(12);
    text(min_x_title, x_pos + padding, y_pos + height - padding + 15);
    text(max_x_title, x_pos + width - padding, y_pos + height - padding + 15);
    text(max_y_title, x_pos + padding - 25, y_pos + padding);
    text(min_y_title, x_pos + padding - 25, y_pos + height - padding);
    
    const {maxvolume, maxtime} = max_vol();
    console.log(maxvolume);
    fill(0, 0, 0); 
    noStroke(); 
    ellipse(maxvolume, maxtime, 40, 40); 
    fill(255, 0, 0); 
    textSize(12); text(`${(maxvolume).toFixed(1)}%`, maxX + 8, maxY - 8);

<<<<<<< HEAD
=======
    if (peaks.length > 1) {
        fill(255);
        textSize(14);
        let seconds = (avgInterval / 1000).toFixed(2);
        text(`Avg Peak Interval: ${seconds}s`, x_pos + width / 2, y_pos + height + 40);
    }
>>>>>>> 17a6e6e331215c8ba436112703bb70077ee6cfcb
}

function draw_fft_plot(frequencyData, x_pos, y_pos, width, height, bar_color,
    title, x_axis_title, y_axis_title, max_x_title, min_x_title, max_y_title, min_y_title) {

    let padding = 40;
    let numBars = frequencyData.length;
    let barWidth = (width - 2 * padding) / numBars;

    textAlign(CENTER, CENTER);
    textSize(12);
    strokeWeight(2);

<<<<<<< HEAD
    // Draw axes
    stroke(0);
    line(x_pos + padding, y_pos + height - padding, x_pos + width - padding, y_pos + height - padding); // X
    line(x_pos + padding, y_pos + height - padding, x_pos + padding, y_pos + padding); // Y

    // Draw bars
=======
    // Axes
    stroke(0);
    line(x_pos + padding, y_pos + height - padding, x_pos + width - padding, y_pos + height - padding); // X-axis
    line(x_pos + padding, y_pos + height - padding, x_pos + padding, y_pos + padding); // Y-axis

    // Bars
>>>>>>> 17a6e6e331215c8ba436112703bb70077ee6cfcb
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

<<<<<<< HEAD
    // Draw labels
    fill(0);
    noStroke();
    textSize(20);

    // Titles
=======
    // Labels
    fill(0);
    noStroke();
    textSize(20);
>>>>>>> 17a6e6e331215c8ba436112703bb70077ee6cfcb
    text(title, x_pos + width / 2, y_pos + 30);
    text(x_axis_title, x_pos + width / 2, y_pos + height - padding + 30);

    push();
    translate(x_pos + padding - 30, y_pos + height / 2);
    rotate(-HALF_PI);
    text(y_axis_title, 0, 0);
    pop();

<<<<<<< HEAD
    // Min/Max axis values
=======
    // Axis tick labels
>>>>>>> 17a6e6e331215c8ba436112703bb70077ee6cfcb
    textSize(12);
    text(min_x_title, x_pos + padding, y_pos + height - padding + 15);
    text(max_x_title, x_pos + width - padding, y_pos + height - padding + 15);
    text(min_y_title, x_pos + padding - 20, y_pos + height - padding);
    text(max_y_title, x_pos + padding - 20, y_pos + padding);
}

<<<<<<< HEAD
=======
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  if (testButton) {
    testButton.position(width/2 - 50, height/2 - 25);
  }
}
>>>>>>> 17a6e6e331215c8ba436112703bb70077ee6cfcb
