let liste = ["mouse.", "sausage.", "bird."];
let liste2 = ["getting wood", "waiting", "getting the water"];
let liste3 = [" ", "  ", "   ", "    ", "     ", "       ", "        "];
let liste4 = ["love", "adore", "desire", "hate"];
let liste5 = [
  "dread it creates in you.",
  "nothing particular",
  "our friends.",
  "the people.",
];
function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  let rand1_1 = floor(random(3));
  let rand1_2 = floor(random(3));
  let rand1_3 = floor(random(3));
  let rand2 = floor(random(3));
  let rand3 = floor(random(6));
  let rand4 = floor(random(4));
  let rand5 = floor(random(4));
  let x = sin(frameCount * 0.05) + random(100, 300);
  frameRate(0.5);
  background(232, 240, 254);
  fill(10, 10, 10);
  textSize(24);
  textFont("monospace");
  textAlign(LEFT);
  text(
    "You are a " +
      liste[rand1_1] +
      "\n" +
      liste3[rand3] +
      "Your speciality is " +
      liste2[rand2] +
      " for the fire. " +
      "\n" +
      "You " +
      liste4[rand4] +
      " this job because of " +
      liste5[rand5],
    20,
    20,
    windowWidth,
    windowHeight
  );
  textAlign(CENTER);
  text(
    "You are a " +
      liste[rand1_2] +
      "\n" +
      liste3[rand3] +
      "Your speciality is " +
      liste2[rand2] +
      " for the fire. " +
      "\n" +
      "You " +
      liste4[rand4] +
      " this job because of " +
      liste5[rand5],
    0,
    windowHeight / 2 - windowHeight / 4 / 2 + 36,
    windowWidth,
    windowHeight / 4
  );
  textAlign(RIGHT);
  text(
    "You are a " +
      liste[rand1_3] +
      "\n" +
      liste3[rand3] +
      "Your speciality is " +
      liste2[rand2] +
      " for the fire. " +
      "\n" +
      "You " +
      liste4[rand4] +
      " this job because of " +
      liste5[rand5],
    0,
    (windowHeight / 4) * 3 + windowHeight / 4 / 2,

    windowWidth - 20,
    windowHeight / 4
  );
}
