var canvas;

function setup() {
    createCanvas(windowWidth, windowHeight);
}

function draw() {
    background(150);
    textSize(32);
    fill(255);
    stroke(0);
    strokeWeight(4);
    text('this is a javascript sketch', width / 2, height / 2);

}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}
