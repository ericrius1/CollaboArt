var Light = function(id) {
  this.baseIntensity = 0;
  this.intensity = 0;
  this.distance = 200;
  this.position = new THREE.Vector3();
  this.position.x = -60 + Math.random() * 60;
  this.id = id;
  this.baseHue = Math.random()
  this.hue = this.baseHue;
}