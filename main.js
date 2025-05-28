let audioContext, analyser, dataArray;
let volume = 0;
let micStarted = false;

function setup() {
    startMic();
    createCanvas(windowWidth, windowHeight);

    textAlign(CENTER, CENTER);
    textSize(18);
}

function draw() {
    background(150);

    if (micStarted) {
        analyser.getByteTimeDomainData(dataArray);

        // Compute volume as RMS
        volume = calc_volume();

        // Draw a circle that changes with volume
        fill(100, 180, 255);
        circle(width / 2, height / 2, 10*volume + 100);
        console.log(volume);
    }
}

function calc_volume() {
    let sumSquares = 0;
    for (let i = 0; i < dataArray.length; i++) {
        const val = dataArray[i] - 128;
        sumSquares += val * val;
    }
    volume = Math.sqrt(sumSquares / dataArray.length) * 4;
    return volume;
}

async function startMic() {
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
