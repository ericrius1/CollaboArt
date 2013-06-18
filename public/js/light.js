var Light = function(id) {
  this.intensity = 0;
  this.distance = 200;
  this.position = new THREE.Vector3();
  this.id = id;
  this.color = new THREE.Color();
  var r = Math.random();
  var g = Math.random();
  var b = Math.random();
  this.color.setRGB(r, g, b);
}