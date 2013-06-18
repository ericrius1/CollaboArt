var world = function(p5) {
  var comm = new Comm();
  comm.listen();
  var x, y;
  var vx, vy;
  p5.setup = function() {
    p5.size(window.innerWidth, window.innerHeight, p5.P3D);
    x = 300;
    y = 300;
  }

  p5.draw = function() {
    p5.background(0)
    p5.ellipse(x, y, 10, 10)
  }

  p5.moveParticle = function(event) {
    comm.clicked(event);
  }

  p5.update = function(position){
    x = position.x;
    y = position.y;
  }
}


$(document).ready(function() {
  canvas = document.getElementById('processing');
  p5 = new Processing(canvas, world);
  $('#processing').on('mousedown', function(event) {
    p5.moveParticle(event);
  })
});