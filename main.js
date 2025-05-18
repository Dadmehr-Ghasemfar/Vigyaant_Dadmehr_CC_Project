var canvas;
let volume;
let mic;


function setup() {
    createCanvas(windowWidth, windowHeight);
    mic = new p5.AudioIn();
    mic.start();
}


function draw() {
    volume = mic.getLevel()*255;
    console.log("Volume = "+volume);
    background(volume);
    textSize(32);
    fill(255);
    stroke(0);
    strokeWeight(4);
    text('this is a javascript sketch I EDITED THIS', width / 2, height / 2);

}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}