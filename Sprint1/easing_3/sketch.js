let circle = {
  x: 100,
  y: 100,
  targetX: 100,
  targetY: 100,
  easing: 0.05,
};

function setup() {
  createCanvas(720, 400);
  noStroke();
}

function draw() {
  background(147, 134, 193);

  // distance between the target position and the current position
  let dx = circle.targetX - circle.x;
  let dy = circle.targetY - circle.y;

  // Update the position of the circle towards target position
  circle.x += dx * circle.easing;
  circle.y += dy * circle.easing;

  ellipse(circle.x, circle.y, 66, 66);
}

function mouseClicked() {
  circle.targetX = mouseX;
  circle.targetY = mouseY;
}
