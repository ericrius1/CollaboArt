var ParticleSystem = function(location){
  var particles = [];
  init();
  function init(){
    location = new p.PVector(300, 300);
    particles.push(new Particle(location));
  }
  function draw(){
    for(var i = 0; i < particles.length; i++){
      particles[i].draw();
    }
  }

  this.draw = draw;
}
