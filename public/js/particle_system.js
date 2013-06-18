var ParticleSystem = function(location){
  this.particles = [];
  this.origin = new p.PVector(300, 300);
  
}

ParticleSystem.prototype.init = function(){
    this.particles.push(new Particle(this.origin));
}

ParticleSystem.prototype.run = function(){
  var numParticles = this.particles.length;
  for(var i = 0; i < numParticles; i++){
    this.particles[i].run();
  }

}
