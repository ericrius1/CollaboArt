var world = function(p5){
  console.log("yo");
  p5.setup = function(){
    p5.size(window.innerWidth, window.innerHeight, p5.P3D);

  }
}


$(document).ready(function(){
  canvas = document.getElementById('processing');
  processing= new Processing(canvas, world);
});