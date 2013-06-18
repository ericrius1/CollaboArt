var Light = function() {
  this.intensity = 0;
  this.distance = 200;
  this.color = new THREE.Color();
  var r = Math.random();
  var g = Math.random();
  var b = Math.random();
  this.color.setRGB(r, g, b);
}