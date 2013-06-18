 var Comm = function() {
   this.world = world;
   this.socket = io.connect();
 }

Comm.prototype.listen = function(){
  this.socket.on('update', function(position){
    console.log('getting update')
    p5.update(position);
  })
}

 Comm.prototype.clicked = function(event){
  this.socket.emit('clicked', {
    x: event.clientX,
    y: event.clientY
  });
 }