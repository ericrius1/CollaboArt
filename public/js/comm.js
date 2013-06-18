 var Comm = function() {
   this.socket = io.connect();
 }

Comm.prototype.listen = function(){
  this.socket.on('update', function(position){
    world.move_light(position);
  })

  this.socket.on('initialize', function(lights){
    world.add_lights(lights);
  });
}

 Comm.prototype.clicked = function(event){
  this.socket.emit('clicked', {
    x: event.clientX,
    y: event.clientY
  });
 }

 Comm.prototype.addLight = function(light){
  this.socket.emit('add_light', light);
 }