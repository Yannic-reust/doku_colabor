var redValue = 255;
var boxX = 10;
var boxY = 20;
var boxW = 15;
var boxH = 13;

let img;
let imgX = 10;
let imgY = 20;
let imgWidth = 200;
let imgHeight = 150;

function preload() {
  img = loadImage("./image.jpg");
  confetti = loadImage("./confetti.gif");
}

function setup() {
  createCanvas(800, 600);
  img.resize(300, 200);
}

function draw() {
  background(220);
  image(img, imgX, imgY, imgWidth, imgHeight);

  let dynamicBoxW = 50;
  let dynamicBoxH = 20;

  fill(redValue, 0, 0);
  rect(boxX, boxY, dynamicBoxW, dynamicBoxH);

  fill(255);
  textAlign(CENTER, CENTER);
  textSize(12);
  text("Box 1", boxX + dynamicBoxW / 2, boxY + dynamicBoxH / 2);

  if (
    imgX >= boxX &&
    imgX <= boxX + dynamicBoxW &&
    imgY >= boxY &&
    imgY <= boxY + dynamicBoxH
  ) {
    console.log("asd");

    //confetti
  } else {
    confetti.resize(0, 0);
    //no confetti
  }
}
