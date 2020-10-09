function  mutate(x) {
  if (random(1) < 0.1) {
    let offset = randomGaussian() * 0.5;
    let newx = x + offset;
    return newx;
  } else {
    return x;
  }
}

class Bird {
  constructor(brain) {
    this.y = height / 2;
    this.x = 64;
    this.radius = 16;
    this.gravity = 0.8;
    this.lift = -12;
    this.velocity = 0;
    this.score = 0;
    this.fitness = 0;

    if (brain) {
      this.brain = brain.copy();
      this.brain.mutate(mutate);
      //console.log(this.brain);
    } else {
      this.brain = new NeuralNetwork(5, 8, 2);
    }
  }
 

  up() {
    if (this.velocity >= 0) {
      this.velocity = 0;
      this.velocity += this.lift;
    }
  }

  think(pipes) {
    let closest = null;
    let closestD = Infinity;

    for (let i = 0; i < pipes.length; i++) {
      let d = pipes[i].x + pipes[i].w - this.x;

      if (d < closestD && d > 0) {
        closest = pipes[i];
        closestD = d;
      }
    }

    if (closest != null) {
      // Now create the inputs to the neural network
      let inputs = [];
      // x position of closest pipe
      inputs[0] = map(closest.x, this.x, width, 0, 1);
      // top of closest pipe opening
      inputs[1] = map(closest.top, 0, height, 0, 1);
      // bottom of closest pipe opening
      inputs[2] = map(closest.bottom, 0, height, 0, 1);
      // bird's y position
      inputs[3] = map(this.y, 0, height, 0, 1);
      // bird's y velocity
      inputs[4] = map(this.velocity, -5, 5, 0, 1);
      

      /*  let inputs = [];
       inputs[0] = this.y / height;
       inputs[1] = closest.top / height;
       inputs[2] = (closest.top + closest.gap) / height;
       inputs[3] = closest.x / width; */
      //inputs[4] = this.velocity / 30;
      //inputs[4] = map(this.velocity, -5, 5, 0, 1);;

      let output = this.brain.predict(inputs);
      if (output[0] > output[1]) {
        this.up();
      }
    }
  }

  show() {
    fill(255, 255, 255, 50);
    stroke(255);
    ellipse(this.x, this.y, this.radius * 2, this.radius * 2);
  }
  offScreen() {
    return this.y + this.radius > height || this.y - this.gap < 0;
  }
  update() {
    this.score++;

    this.velocity += this.gravity;
    this.y += this.velocity;

    /*   if (this.y > height) {
      this.y = height;
      this.velocity = 0;

      //TODO Später TOT einrichten
    }
    if (this.y <= 0) {
      this.y = 0;
      this.velocity = 0;

      //TODO Später TOT einrichten
    } */
  }
}
