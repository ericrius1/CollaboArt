var Particle = function(location) {
  this.location = location;
  this.velocity = new p.PVector(0, 0.05);
  this.acceleration = new p.PVector(p.random(-1, 1), p.random(-2, 0));
  this.lifespan = 255.0;
}

Particle.prototype.run = function(){
  this.update();
  this.display();
}

Particle.prototype.update = function() {
  this.velocity.add(this.acceleration);
  this.location.add(this.velocity);
  //this.lifespan -= 2.0;
}

Particle.prototype.display = function() {
  p.stroke(0, this.lifespan);
  p.fill(255, this.lifespan);
  p.ellipse(this.location.x, this.location.y, 8, 8);
}

Particle.prototype.isDead = function(){
  if(this.lifespan <=0.0){
    return true;
  }
  else{
    return false;
  }
}