var Light = function(id) {
  this.baseIntensity = 0;
  this.intensity = 0;
  this.distance = 200;
  this.position = new THREE.Vector3();
  this.position.x = -40 + Math.random() * 80;
  this.position.z = Math.random() * 100;
  this.id = id;
  this.baseHue = Math.random()
  this.hue = this.baseHue;
}