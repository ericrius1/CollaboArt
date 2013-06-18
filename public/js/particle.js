var Particle = function(location){
  this.location  = location;
}

Particle.prototype.draw = function(){
  p.ellipse(this.location.x, this.location.y, 10, 10);

}