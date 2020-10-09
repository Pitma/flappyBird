const TOTAL = 200;

let birds = [];
let oldBirds = [];
let pipes = [];
let counter = 0;
let cycles = 100;
let slider;
let scoreMax = 0;
let generation = 1;
let generationText;
let survivor;
let highScore;
let maxSum = 0;
let tempSum =0;
function setup() {
  let canvas = createCanvas(500, 600);
  canvas.parent("canvascontainer");

  slider = createSlider(1, 100, 1);
  generationText = select('#gen');
  scoreMax = select('#ahs');
  highScore = select('#hs');
  survivor = select('#surviver');

  for (let i = 0; i < TOTAL; i++) {
    birds[i] = new Bird();
  }
  survivor.html(birds.length);
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
          survivor.html(birds.length);
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
        scoreMax.html(maxSum);
      }
      if(tempSum< bird.score){
        tempSum = bird.score;
        highScore.html(tempSum);

      }
      //bird.show();
    }
    if (birds.length === 0) {
      counter = 0;
      nextGeneration();
      generationText.html(generation);
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
