var Light = function(id) {
  this.intensity = 0;
  this.distance = 200;
  this.position = new THREE.Vector3();
  this.id = id;
  this.color = {h: Math.random(), s: 0.8, l: 0.8}
}