var world = function(p5) {
  var x, y;
  var vx, vy;
  p5.setup = function() {
    p5.size(window.innerWidth, window.innerHeight, p5.P3D);
    p5.resetParticle();
  }

  p5.draw = function() {
    p5.background(0)
    p5.ellipse(x, y, 10, 10)

    x +=vx;
    y += vy;
  }

  p5.resetParticle = function(event) {
    console.log("shnur")
    x = y = p5.width / 2.0;

    //set new random velocity
    // b/w - and + numbers
    vx = p5.random(-0.39, 0.1);
    vy = p5.random(-0.1, 0.21); 

  }
}


$(document).ready(function() {
  canvas = document.getElementById('processing');
  processing = new Processing(canvas, world);
  $('#processing').on('mousedown', function(event) {
    processing.resetParticle(event);
  })
});