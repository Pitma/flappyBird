const TOTAL = 700;

let birds = [];
let oldBirds = [];
let pipes = [];
let counter = 0;
let cycles = 100;
let slider;
let maxSum = 0;
function setup() {
  createCanvas(700, 800);
  slider = createSlider(1, 100, 1);
  for (let i = 0; i < TOTAL; i++) {
    birds[i] = new Bird();
  }
}

function draw() {
  for (let n = 0; n < slider.value(); n++) {
    if (counter % 75 == 0) {
      pipes.push(new Pipe());
    }
    counter++;
    for (var i = pipes.length - 1; i >= 0; i--) {
      //pipes[i].show();
      pipes[i].update();

      for (let j = birds.length - 1; j >= 0; j--) {
        if (pipes[i].hits(birds[j])) {
          oldBirds.push(birds.splice(j, 1)[0]);
        }
      }

      /*   if(pipes[i].hits(bird)){
        console.log("HIT");
    } */
      if (pipes[i].offScreen()) {
        pipes.splice(i, 1);
      }
    }

    for (let i = birds.length - 1; i >= 0; i--) {
      if (birds[i].offScreen()) {
        oldBirds.push(birds.splice(i, 1)[0]);
      }
    }

    for (let bird of birds) {
      bird.think(pipes);
      bird.update();
      if (maxSum < bird.score) {
        maxSum = bird.score;
        console.log(maxSum);
      }
      //bird.show();
    }
    if (birds.length === 0) {
      counter = 0;
      nextGeneration();
      pipes = [];
    }
  }
  //All the drawing stuff
  background(0);
  for (let bird of birds) {
    bird.show();
  }
  for (let pipe of pipes) {
    pipe.show();
  }
}

/* function keyPressed() {
  if (key == " ") {
    console.log("SPACE");
    bird.up();
  } 
}*/
