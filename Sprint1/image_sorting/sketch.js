let direction = "vertical";
let threshold = 50;
let pixelDistance = 1;

let img;
let changes;

function preload() {
  img = loadImage("./image.jpg");
}

function setup() {
  createCanvas(800, 600);
  img.resize(800, 600);
  generatePixelSort();
  //noLoop();
}

function draw() {
  image(img, 0, 0);
}

function generatePixelSort() {
  // Detect pixel changes based on the specified threshold, distance, and direction
  changes = detectPixelChanges(img, threshold, pixelDistance, direction, false);

  // Loop through detected changes and apply pixel sorting
  for (let i = 0; i < changes.length; i++) {
    if (i < changes.length - 1) {
      pixelSortTo(
        img,
        changes[i].x,
        changes[i].y,
        changes[i + 1].x,
        changes[i + 1].y,
        direction
      );
    } else {
      pixelSort(img, changes[i].x, changes[i].y, direction);
    }
  }

  // Update the pixels of the image after sorting
  img.updatePixels();
}

function detectPixelChanges(
  img,
  threshold,
  distance = 1,
  direction = "vertical",
  onlyFirst = true
) {
  let results = [];
  direction =
    direction == "horizontal" ? createVector(1, 0) : createVector(0, 1);
  let pos = createVector();

  for (let j = 0, lim = direction.x ? img.height : img.width; j < lim; j++) {
    for (let i = 0, lim = direction.x ? img.width : img.height; i < lim; i++) {
      let colBefore = getPixelValue(
        img,
        direction.x ? i - distance : j,
        direction.x ? j : i - distance
      );
      if (colBefore) {
        let col = getPixelValue(img, direction.x ? i : j, direction.x ? j : i);
        let d = dist(
          colBefore[0],
          colBefore[1],
          colBefore[2],
          col[0],
          col[1],
          col[2]
        );
        if (d > threshold) {
          results.push(createVector(direction.x ? i : j, direction.x ? j : i));
          if (onlyFirst) break;
        }
      }
    }
  }
  return results;
}

// Function to get the color value of a pixel in the image
function getPixelValue(img, x, y) {
  if (x < 0 || x > img.width - 1 || y < 0 || y > img.height - 1) return null;
  if (!img.pixels.length) img.loadPixels();
  let i = 4 * (x + y * img.width);
  let r = img.pixels[i];
  let g = img.pixels[i + 1];
  let b = img.pixels[i + 2];
  let a = img.pixels[i + 3];
  return [r, g, b, a];
}

// Function to set the color value of a pixel in the image
function setPixelValue(img, x, y, colR, colG, colB, colA = 255) {
  if (x < 0 || x > img.width - 1 || y < 0 || y > img.height - 1) return null;
  if (!img.pixels.length) img.loadPixels();
  let i = 4 * (x + y * img.width);
  img.pixels[i] = colR;
  img.pixels[i + 1] = colG;
  img.pixels[i + 2] = colB;
  img.pixels[i + 3] = colA;
}

// Function to perform pixel sorting in a specified direction
function pixelSort(img, x, y, direction = "vertical") {
  direction =
    direction == "horizontal" ? createVector(1, 0) : createVector(0, 1);
  let pix = [];
  let start = direction.x ? x : y;
  let end = direction.x ? img.width : img.height;
  for (let i = start; i < end; i++) {
    let val = getPixelValue(img, direction.x ? i : x, direction.x ? y : i);
    pix.push(val);
  }

  pix.sort(sortFunction);
  let i = 0;
  for (let p of pix) {
    setPixelValue(
      img,
      x + direction.x * i,
      y + direction.y * i,
      p[0],
      p[1],
      p[2]
    );
    i++;
  }
}

// Function to perform pixel sorting from one point to another in a specified direction
function pixelSortTo(img, x1, y1, x2, y2, direction = "vertical") {
  direction =
    direction == "horizontal" ? createVector(1, 0) : createVector(0, 1);
  let pix = [];
  let start = direction.x ? x1 : y1;
  let end = direction.x ? img.width : img.height;
  for (let i = start; i < end; i++) {
    let x = direction.x ? i : x1;
    let y = direction.x ? y1 : i;
    if (x == x2 && y == y2) break;
    let val = getPixelValue(img, x, y);
    pix.push(val);
  }

  pix.sort(sortFunction);
  let i = 0;
  for (let p of pix) {
    setPixelValue(
      img,
      x1 + direction.x * i,
      y1 + direction.y * i,
      p[0],
      p[1],
      p[2]
    );
    i++;
  }
}

// Function to define the sorting order for pixel sorting
function sortFunction(a, b) {
  return -(b[0] - a[0] + b[1] - a[2] + b[1] - a[1]);
}
