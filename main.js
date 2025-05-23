let audioContext, analyser, dataArray;
let volume = 0;
let micStarted = false;

function setup() {
    startMic();
    createCanvas(400, 400);
    textAlign(CENTER, CENTER);
    textSize(18);
}

function draw() {
<<<<<<< HEAD
    volume = mic.getLevel();
    volume = volume*225;
    console.log("Volume = "+volume);
    background(volume);
    textSize(32);
    fill(255);
    stroke(0);
    strokeWeight(4);
    text('this is a javascript sketch I EDITED THIS', width / 2, height / 2);
=======
    background(240);
>>>>>>> 9ffd944ea0d42e35316ce22e662df6bb21dcc5fd

    if (!micStarted) {
        return;
    }

    analyser.getByteTimeDomainData(dataArray);

    // Compute volume as RMS
    let sumSquares = 0;
    for (let i = 0; i < dataArray.length; i++) {
        const val = dataArray[i] - 128;
        sumSquares += val * val;
    }
    volume = Math.sqrt(sumSquares / dataArray.length) * 4;

    // Draw a circle that changes with volume
    fill(100, 180, 255);
    circle(width / 2, height / 2, volume + 100);
}

async function startMic() {
    const stream = await navigator.mediaDevices.getUserMedia({
        audio: true
    });
    audioContext = new(window.AudioContext || window.webkitAudioContext)();
    const source = audioContext.createMediaStreamSource(stream);

    analyser = audioContext.createAnalyser();
    analyser.fftSize = 256;
    const bufferLength = analyser.frequencyBinCount;
    dataArray = new Uint8Array(bufferLength);

    source.connect(analyser);
    micStarted = true;
}
