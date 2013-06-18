 var Comm = function() {
   this.socket = io.connect();
 }

 Comm.prototype.clicked = function(event){
  this.socket.emit('clicked', {
    x: event.clientX,
    y: event.clientY
  });
 }