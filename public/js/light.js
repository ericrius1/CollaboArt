var Light = function() {
  this.intensity = 11;
  this.distance = 200;
  this.color = 0xff00ff;
  return new THREE.PointLight(this.color, this.intensity, this.distance);
}