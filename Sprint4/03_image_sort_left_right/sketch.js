let img;

function preload() {
  img = loadImage("image.jpg");
}

function setup() {
  createCanvas(500, 500);

  img.resize(100, 100);

  noSmooth();
}

function draw() {
  img.loadPixels();

  for (let i = 0; i < 1000; i++) {
    sortPixels();
  }

  img.updatePixels();

  image(img, 0, 0, width, height);
}

function sortPixels() {
  console.log("sorting");
  const x = random(img.width - 1); // Ensuring we don't go out of bounds
  const y = random(img.height);

  const colorOne = img.get(x, y);
  const colorTwo = img.get(x + 1, y); // Compare with the next pixel to the right

  const totalOne = red(colorOne) + green(colorOne) + blue(colorOne);
  const totalTwo = red(colorTwo) + green(colorTwo) + blue(colorTwo);

  if (totalOne < totalTwo) {
    img.set(x, y, colorTwo);
    img.set(x + 1, y, colorOne);
  }
}
