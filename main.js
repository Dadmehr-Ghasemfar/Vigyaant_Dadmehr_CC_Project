var volume;
var mic;
var audioStarted = false; // A flag to track if audio has started

function setup() {
    createCanvas(windowWidth, windowHeight);
    // Initialize mic, but don't start it yet.
    // We'll start it after a user gesture.
    mic = new p5.AudioIn();

    // Set initial background to black or some neutral color
    background(0);
    textSize(32);
    textAlign(CENTER, CENTER); // Center the text horizontally and vertically
    fill(255);
    stroke(0);
    strokeWeight(4);
    text('Click or Press a Key to Enable Mic', width / 2, height / 2);
}

function draw() {
    if (audioStarted) {
        volume = mic.getLevel();
        volume = volume * 255; // Scale to 0-255 for grayscale background
        // console.log("Volume = " + volume); // Uncomment for debugging
        background(volume); // Use volume for grayscale background

        // Display the text after audio has started
        textSize(32);
        textAlign(CENTER, CENTER);
        fill(255);
        stroke(0);
        strokeWeight(4);
        text('Sound Reactive Sketch!', width / 2, height / 2);
    } else {
        // If audio hasn't started, keep showing the instruction
        background(0); // Black background
        textSize(32);
        textAlign(CENTER, CENTER);
        fill(255);
        stroke(0);
        strokeWeight(4);
        text('Click or Press a Key to Enable Mic', width / 2, height / 2);
    }
}

// Function to handle a mouse click
function mousePressed() {
    // Check if audio hasn't started yet
    if (!audioStarted) {
        userStartAudio(); // Important: This resolves the browser's audio context suspension
        mic.start();      // Start the microphone
        audioStarted = true; // Set the flag to true
        console.log("Audio started via mouse click!");
    }
}

// Function to handle a key press
function keyPressed() {
    // Check if audio hasn't started yet
    if (!audioStarted) {
        userStartAudio(); // Important: This resolves the browser's audio context suspension
        mic.start();      // Start the microphone
        audioStarted = true; // Set the flag to true
        console.log("Audio started via key press!");
    }
}


function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}