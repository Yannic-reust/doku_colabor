let x = 1;
let y = 1;
let easing = 0.05;

function setup() {
  createCanvas(720, 400);
  noStroke();
}

function draw() {
  background(147, 134, 193);
  let targetX = mouseX;
  let targetY = mouseY;

  let dx = targetX - x; // distance, target x-coordinate and the x-coordinate ellipse
  let dy = targetY - y; // distance, target y-coordinate and the y-coordinate ellipse

  x += dx * easing; // x-coordinate ellipse, white easing
  y += dy * easing; // y-coordinate ellipse, white easing

  ellipse(x, y, 66, 66);
}
