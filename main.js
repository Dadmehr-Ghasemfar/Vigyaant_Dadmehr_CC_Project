<<<<<<< HEAD
let mic;
let volume;

function setup() {
    createCanvas(400, 400);

=======
var canvas;
let volume;
let mic;


function setup() {
    createCanvas(windowWidth, windowHeight);
>>>>>>> 201b63ecec711a77a1fde353cf70bc457732366d
    mic = new p5.AudioIn();
    mic.start();
}


function draw() {
<<<<<<< HEAD
    volume = mic.getLevel() * 255;
    console.log("volume = " + volume);
    background(220);
    circle(200, 200, volume);
}
=======
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
>>>>>>> 201b63ecec711a77a1fde353cf70bc457732366d
