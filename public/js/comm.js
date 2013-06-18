 var Comm = function() {
   this.socket = io.connect();
 }

Comm.prototype.listen = function(){
  this.socket.on('activate_light', function(id){
    world.activate_light(id);
  });
}

 Comm.prototype.clicked = function(event){
  this.socket.emit('clicked', {
    x: event.clientX,
    y: event.clientY
  });
 }

