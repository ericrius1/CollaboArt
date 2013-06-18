 var Comm = function() {
   this.socket = io.connect();
 }

Comm.prototype.listen = function(){
  this.socket.on('update', function(position){
    world.move_light(position);
  })
}

 Comm.prototype.clicked = function(event){
  this.socket.emit('clicked', {
    x: event.clientX,
    y: event.clientY
  });
 }