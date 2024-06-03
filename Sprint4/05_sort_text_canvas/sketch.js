let img;
let button;
let shouldDraw = false;

function preload() {
  img = loadImage("image.jpg");
}

function setup() {
  createCanvas(200, 200);
  img.resize(100, 100);
  noSmooth();

  //pixelDensity(1);
  // Draw the image on the canvas initially
  image(img, 0, 0, width, height);

  // Create a button and attach the triggerDraw function to its mousePressed event
  button = createButton("Process Image");
  button.position(10, 10); // Position the button on the canvas
  button.mousePressed(triggerDraw);
}

function draw() {
  if (shouldDraw) {
    loadPixels(); // Load the canvas pixels

    for (let i = 0; i < 1000; i++) {
      sortPixels();
    }

    updatePixels(); // Update the canvas with modified pixels
  }
}

function triggerDraw() {
  console.log("Button pressed");
  shouldDraw = true;
}

function sortPixels() {
  const x = floor(random(width - 1)); // Ensuring we don't go out of bounds
  const y = floor(random(height));

  const colorOne = get(x, y);
  const colorTwo = get(x + 1, y);

  //console.log(colorOne);
  const totalOne = red(colorOne) + green(colorOne) + blue(colorOne);
  const totalTwo = red(colorTwo) + green(colorTwo) + blue(colorTwo);

  if (totalOne < totalTwo) {
    set(x, y, colorTwo);
    set(x + 1, y, colorOne);
  }
}
