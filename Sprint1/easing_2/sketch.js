let rectWidth = 50;
let targetWidth = 50;
let easing = 0.01;

function setup() {
  createCanvas(720, 400);
  noStroke();
}

function draw() {
  background(147, 134, 193);

  // Calculate the distance between the target width and the current width of the rectangle
  let dw = targetWidth - rectWidth;

  // Update the width of the rectangle towards the target width using easing
  rectWidth += dw * easing;

  // Draw the rectangle with its updated width
  rectMode(CENTER);
  fill(255);
  rect(width / 2, height / 2, rectWidth, 50);
}

// Update the target width of the rectangle based on mouse movements
function mouseMoved() {
  targetWidth = map(mouseX, 0, width, 20, 200); // Map mouse x-coordinate to a target
}
