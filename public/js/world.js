var world = function(p5){
  console.log("yo");
  p5.setup = function(){
    p5.size(window.innerWidth, window.innerHeight, p5.P3D);
  }

  p5.draw = function(){
    p5.background(0)
  }
}


$(document).ready(function(){
  canvas = document.getElementById('processing');
  processing= new Processing(canvas, world);
});