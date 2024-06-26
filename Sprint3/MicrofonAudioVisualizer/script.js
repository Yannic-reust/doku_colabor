let radius;
let numPoints;

let mic;
let fft;
let amplitude;

let primaryOrig;
let waveform;
let circle;

let state = "START";
let title = "Microphone Visualization";
let titleColor;
let startButton;

function setup() {
  primaryOrig = color(255, 0, 0); // Example primary color (red)
  primary = color(255, 0, 0); // Example primary color (red)
  bg = color(0, 0, 0); // Initial background color (black)
  sArr = [0, 255, 0]; // Example secondary color (green)
  secondary = color(sArr[0], sArr[1], sArr[2]);
  titleColor = color(sArr[0], sArr[1], sArr[2]);

  createCanvas(windowWidth, windowHeight);
  background(bg);
  angleMode(DEGREES);

  radius = windowHeight / 5;

  fft = new p5.FFT();
  amplitude = new p5.Amplitude(0.85);

  mic = new p5.AudioIn();

  waveform = fft.waveform();
  numPoints = waveform.length;
  circle = new Circle(radius, numPoints);

  startButton = createButton("Start Visualization");
  startButton.position(windowWidth / 2 - 50, windowHeight / 2 - 25);
  startButton.mousePressed(startVisualization);
}

function startVisualization() {
  mic.start();
  fft.setInput(mic);
  amplitude.setInput(mic);
  startButton.hide();
  state = "PLAYING";
}

function drawTitle() {
  titleColor.setAlpha(alpha(titleColor) - 5);
  push();
  fill(titleColor);
  textAlign(CENTER, CENTER);
  textSize(32);
  text(title, windowWidth / 2, windowHeight / 4);
  pop();
}

function drawStart() {
  if (state === "START") {
    push();
    fill(secondary);
    textAlign(CENTER, CENTER);
    textSize(24);
    text(
      "Click 'Start Visualization' to begin",
      windowWidth / 2,
      windowHeight / 2
    );
    pop();
  }
}

function drawPlaying() {
  waveform = fft.waveform();
  let ampl = amplitude.getLevel();
  fft.analyze();
  let bass = fft.getEnergy("bass");

  // Update background color based on amplitude
  let bgColor = lerpColor(color(0, 0, 0), primary, ampl);
  background(bgColor);

  noStroke();

  push();
  translate(windowWidth / 2, windowHeight / 2);

  // PULSING CIRCLES
  push();
  fill(lerpColor(bgColor, primary, map(bass, 0, 255, 0, 0.02549019607)));
  ellipse(0, 0, map(bass, 0, 255, 0, radius * 8));
  pop();

  push();
  fill(lerpColor(bgColor, primary, map(bass, 0, 255, 0, 0.0431372549)));
  ellipse(0, 0, map(bass, 0, 50, 0, radius * 7));
  pop();

  push();
  fill(lerpColor(bgColor, primary, map(bass, 0, 255, 0, 0.0862745098)));
  ellipse(0, 0, map(bass, 0, 255, 0, radius * 6));
  pop();

  push();
  fill(lerpColor(bgColor, primary, map(bass, 0, 255, 0, 0.1294117647)));
  ellipse(0, 0, map(bass, 0, 255, 0, radius * 5));
  pop();

  push();
  fill(lerpColor(bgColor, primary, map(bass, 0, 255, 0, 0.1725490196)));
  ellipse(0, 0, map(bass, 0, 255, 0, radius * 4));
  pop();

  circle.draw();

  pop();

  drawTitle();
}

function draw() {
  if (state === "PLAYING") {
    drawPlaying();
  } else {
    drawStart();
  }
}

class Circle {
  constructor(radius, numPoints) {
    this.radius = radius;
    this.numPoints = numPoints;
  }

  draw() {
    beginShape();
    stroke(255);
    noFill();
    for (let i = 0; i < this.numPoints; i++) {
      let angle = map(i, 0, this.numPoints, 0, 360);
      let x = this.radius * cos(angle);
      let y = this.radius * sin(angle);
      let waveValue = map(waveform[i], -1, 1, -100, 100);
      vertex(x + waveValue, y + waveValue);
    }
    endShape(CLOSE);
  }
}
