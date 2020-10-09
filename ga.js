function nextGeneration() {
  console.log("Next Generation");
  generation++;
  tempSum = 0;
  normalizeFitness(oldBirds);
  //calculateFitness();

  for (let i = 0; i < TOTAL; i++) {
    birds[i] = pickOne();
  }

  oldBirds = [];
}

function calculateFitness() {
  let sum = 0;
  for (let bird of oldBirds) {
    sum += bird.score;
  }
  for (let bird of oldBirds) {
    bird.fitness = bird.score / sum;
  }
}
function normalizeFitness(birds) {
  // Make score exponentially better?
  for (let i = 0; i < birds.length; i++) {
    birds[i].score = pow(birds[i].score, 4);
  }

  // Add up all the scores
  let sum = 0;
  for (let i = 0; i < birds.length; i++) {
    sum += birds[i].score;
  }
  // Divide by the sum
  for (let i = 0; i < birds.length; i++) {
    birds[i].fitness = birds[i].score / sum;
    //console.log(birds[i].fitness);
  }
}

function pickOne() {
  var index = 0;
  var r = random(1);

  while (r > 0) {
    r = r - oldBirds[index].fitness;
    index++;
  }
  index--;

  let bird = oldBirds[index];
  let child = new Bird(bird.brain);
  //child.mutate(0.2);
  return child;
}
