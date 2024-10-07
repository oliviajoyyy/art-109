
let canvas;

function setup() {
    canvas = createCanvas(windowWidth, windowHeight);
    canvas.position(0, 0); // same as setting css position
    canvas.style("z-index", -2); // put canvas in background
    // background(225); // no background = transparent
}

function windowResized() {
    // console.log("window resized");
    resizeCanvas(windowWidth, windowHeight);
}

function draw() {
    
}

function mouseMoved() {
    drawThing(mouseX, mouseY);
    drawThing(mouseX - 50, mouseY + 75);
}

function drawThing(x, y) {
    strokeWeight(0);
    fill(random(200, 255), random(200, 255), random(200, 255));
    ellipse(x, y, 30, 30);
}