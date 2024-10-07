
let canvas;

function setup() {
    canvas = createCanvas(windowWidth, windowHeight, WEBGL);
    canvas.position(0, 0); // same as setting css position
    canvas.style("z-index", -2); // put canvas in background
    // background(225); // no background = transparent

    angleMode(DEGREES);
    strokeWeight(2);
}

function windowResized() {
    // console.log("window resized");
    resizeCanvas(windowWidth, windowHeight);
}

function draw() {
    background("#042a4a");
    drawWave();
}

// Option 3: Geometry with Sine Waves
function drawWave() {
    rotateX(60);
    noFill();

    for (var i = 0; i < 50; i++) {
        var r = map(sin(frameCount / 2), -1, 1, 100, 200);
        var g = map(i, 0, 50, 100, 200);
        var b = map(cos(frameCount), -1, 1, 200, 100);
        stroke(r, g, b);
        rotate(frameCount / 20);

        beginShape()
        for(var j = 0; j < 360; j += 90) {
            var rad = i * 15;
            var x = rad * cos(j);
            var y = rad * sin(j);
            var z = sin(frameCount * 3 + i * 10) * 100;
            vertex(x, y, z);
        }
        endShape(CLOSE);
    }
}

function mouseMoved() {
    // drawThing(mouseX, mouseY);
    // drawThing(mouseX - 50, mouseY + 75);
}

function drawThing(x, y) {
    strokeWeight(0);
    fill(random(200, 255), random(200, 255), random(200, 255));
    ellipse(x, y, 30, 30);
}