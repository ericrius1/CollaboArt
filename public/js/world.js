var world = function(processing) {
  p = processing;
  var ps;
  var comm = new Comm();
  comm.listen();
  p.setup = function() {
    p.size(window.innerWidth, window.innerHeight, p.P3D);
    ps = new ParticleSystem();
  }

  p.draw = function() {
    p.background(0)
    ps.draw();
    
  }

  p.moveParticle = function(event) {
    comm.clicked(event);
  }

  p.update = function(position){
    
  }
}


$(document).ready(function() {
  canvas = document.getElementById('processing');
  processing = new Processing(canvas, world);
  $('#processing').on('mousedown', function(event) {
    processing.moveParticle(event);
  })
});