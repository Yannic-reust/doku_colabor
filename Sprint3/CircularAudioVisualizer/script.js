let radius;
let numPoints;

let song;
let songIndex = -1;
let songs = [];

let fft;
let amplitude;

let primaryOrig;

let waveform;

let circle;

let state = "START";
let title = "";
let titleColor;

let playButton;
let stopButton;

function preload() {
  // {"Title":"","Song":loadSound("")}
  songs = [
    {
      Title: "Murder in my Mind - Kordhell",
      Song: loadSound("murderinmymind.mp3"),
    },
    { Title: "Limbo - Freddie Dredd", Song: loadSound("limbo.mp3") },
    {
      Title: "Highscore - Teminite & Panda Eyes",
      Song: loadSound("highscore.mp3"),
    },
  ];
}

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
  waveform = fft.waveform();

  numPoints = waveform.length;

  circle = new Circle(radius, numPoints);

  // Create play and stop buttons
  playButton = createButton("Play");
  playButton.position(10, 10);
  playButton.mousePressed(playMusic);

  stopButton = createButton("Stop");
  stopButton.position(70, 10);
  stopButton.mousePressed(stopMusic);
  stopButton.hide(); // Initially hide the stop button
}

function playMusic() {
  cycleSong();
  playButton.hide();
  stopButton.show();
  state = "PLAYING";
}

function stopMusic() {
  if (song) {
    song.stop();
  }
  stopButton.hide();
  playButton.show();
  state = "STOPPED";
}

function cycleSong() {
  songIndex++;
  if (songIndex >= songs.length) {
    songIndex = 0;
  }
  if (song) {
    song.stop();
  }
  song = songs[songIndex]["Song"];
  song.loop();
  title = songs[songIndex]["Title"];
  titleColor.setAlpha(255);
}

function drawTitle() {
  titleColor.setAlpha(alpha(titleColor) - 5);
  push();
  fill(titleColor);
  textSize(60);
  textAlign(CENTER, CENTER);
  text(title, 0, 0, windowWidth, windowHeight);
  pop();
}

function drawStart() {
  push();
  fill(secondary);
  textSize(60);
  textAlign(CENTER, CENTER);
  text(
    "Click to start music / switch song!",
    windowWidth / 2,
    windowHeight / 2
  );
  pop();
}

function drawPlaying() {
  waveform = fft.waveform();
  ampl = amplitude.getLevel();
  fft.analyze();
  bass = fft.getEnergy("bass");

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
  if (state == "START") {
    drawPlaying();
    drawStart();
  }
  if (state == "PLAYING") {
    drawPlaying();
  }
}
