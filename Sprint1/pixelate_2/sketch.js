let img;
let cells = 10;

// Load the image
function preload() {
  img = loadImage("image.jpg");
}

function setup() {
  createCanvas(400, 400);

  // Resize the image to fit the canvas
  img.resize(width, height);

  // Disable the stroke
  noStroke();
}

function draw() {
  // Map the mouse X from [0-width] to [10-80]
  cells = map((20 + mouseX) * 0.5, 0, width, 10, 80);

  // Round to the nearest 10
  cells = ceil(cells / 10) * 10;

  // Loop through the pixels X and Y
  for (let y = 0; y < img.height; y += cells) {
    for (let x = 0; x < img.width; x += cells) {
      // Get the color at (x, y)
      let c = img.get(x, y);

      fill(c);

      // Draw a rectangle at (x, y) and the size of a cell
      rect(x, y, cells, cells);
    }
  }
}
