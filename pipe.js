function Pipe() {
  this.gap = 250; //random(100,185);//TODO Dynamisch machen
  this.top = random(height / 2);
  this.bottom = this.top + this.gap;
  this.x = width;
  this.w = 40;
  this.speed = 5;
  this.highLight = false;

  this.hits = function (bird) {
    if (
      bird.y - bird.radius < this.top ||
      bird.y + bird.radius > this.top + this.gap
    ) {
      if (
        bird.x + bird.radius > this.x &&
        bird.x - bird.radius < this.x + this.w
      ) {
          this.highLight = true;
        return true;
      }
    }
  };
  this.show = function () {
    fill(255);
    if (this.highLight){
        fill(255,0,0);
    }
    rect(this.x, 0, this.w, this.top);
    rect(this.x, this.top + this.gap, this.w, height);
  };

  this.update = function () {
    this.x -= this.speed;
  };

  this.offScreen = function () {
    if (this.x < -this.w) {
      return true;
    } else {
      return false;
    }
  };
}
