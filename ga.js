function nextGeneration() {
    console.log("Next Generation");
  calculateFitness();

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
  for(let bird of oldBirds){
    bird.fitness = (bird.score / sum) ;
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
  child.mutate(0.2);
  return child;
}
