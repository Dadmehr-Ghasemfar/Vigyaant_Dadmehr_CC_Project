let mic;
let volume;

function setup() {
    createCanvas(windowWidth, windowHeight);
    mic = new p5.AudioIn();
    mic.start();
}


function draw() {
    volume = mic.getLevel() * 255;
    console.log("volume = " + volume);
    background(220);
    circle(200, 200, volume);
}
